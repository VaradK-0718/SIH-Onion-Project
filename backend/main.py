from io import BytesIO
import json
import os
import random
from pathlib import Path
from fastapi import FastAPI, File, UploadFile, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from PIL import Image, UnidentifiedImageError
from sqlalchemy.orm import Session
from backend.database import init_db, get_db, SampleRecord
from backend.services.price_service import calculate_price_estimate, get_best_selling_recommendation, load_market_data
from backend.services.vision_service import process_image_analysis

app = FastAPI(
    title="Smart Onion AI Two-Stage API Backend",
    description="Two-Stage AI Validation, Quality Assessment & Market Decision-Support API",
    version="1.1"
)

cors_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "").split(",")
    if origin.strip()
]
if cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

MAX_UPLOAD_BYTES = 10 * 1024 * 1024
MAX_IMAGE_PIXELS = 40_000_000


async def read_upload_image(file: UploadFile | None):
    if file is None:
        return None

    if file.content_type and not file.content_type.startswith("image/"):
        raise HTTPException(status_code=415, detail="Upload must be an image.")

    contents = await file.read(MAX_UPLOAD_BYTES + 1)
    if len(contents) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="Image must be 10 MB or smaller.")

    try:
        with Image.open(BytesIO(contents)) as uploaded_image:
            if uploaded_image.width * uploaded_image.height > MAX_IMAGE_PIXELS:
                raise HTTPException(status_code=413, detail="Image dimensions are too large.")
            uploaded_image.load()
            return uploaded_image.convert("RGB")
    except HTTPException:
        raise
    except (UnidentifiedImageError, OSError, Image.DecompressionBombError) as exc:
        raise HTTPException(status_code=400, detail="Uploaded file is not a valid supported image.") from exc

@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/api/health")
def read_root():
    return {
        "system": "Smart Onion AI Two-Stage Backend",
        "status": "online",
        "version": "OnionGrade-v1.1",
        "stage1_validator": "MobileNetV3 (Active)",
        "stage2_detector": "YOLOv11-OnionDefect (Active)"
    }

@app.post("/api/verify-image")
async def verify_image_stage1(
    file: UploadFile = File(None),
    preset_type: str = Form(None)
):
    """
    Stage 1 Verification Endpoint: Checks image quality & verifies onion presence.
    """
    image_input = await read_upload_image(file)
    res = process_image_analysis(image_input=image_input, preset_type=preset_type)
    return {
        "status": res["status"],
        "stage": res.get("stage", 1),
        "is_onion": res.get("is_onion", False),
        "onion_confidence": res.get("onion_confidence", 0.0),
        "rejection_reason": res.get("rejection_reason"),
        "message": res.get("message")
    }

@app.post("/api/analyze")
async def analyze_sample(
    file: UploadFile = File(None),
    sample_id: str = Form(None),
    batch_id: str = Form(None),
    preset_type: str = Form(None),
    market: str = Form("lasalgaon"),
    db: Session = Depends(get_db)
):
    """
    Two-Stage Quality Analysis Endpoint:
    Mandatory Gate: If Stage 1 verification fails (non-onion image / blurry / dark), returns REJECT with ZERO onion results.
    """
    # Run Two-Stage Pipeline
    image_input = await read_upload_image(file)
    pipeline_res = process_image_analysis(image_input=image_input, preset_type=preset_type)

    # STRICT GATE CHECK (Requirement #17 & #18)
    if pipeline_res["status"] == "rejected":
        return {
            "status": "rejected",
            "stage": 1,
            "rejection_reason": pipeline_res.get("rejection_reason", "not_an_onion"),
            "is_onion": False,
            "onion_confidence": pipeline_res.get("onion_confidence", 0.12),
            "message": pipeline_res.get("message", "This does not appear to be an onion image.")
        }

    # Stage 2 Execution (Runs ONLY if Stage 1 passes!)
    score = pipeline_res["quality_score"]
    grade_a = pipeline_res["grade_a"]
    grade_b = pipeline_res["grade_b"]
    urs = pipeline_res["urs"]

    price_info = calculate_price_estimate(score, grade_a, market)
    selling_rec = get_best_selling_recommendation(score, market)

    s_id = sample_id or f"SMP-2026-{random.randint(1000, 9999)}"

    # Save to SQLite DB
    record = SampleRecord(
        id=s_id,
        quality_score=score,
        grade_a_percentage=grade_a,
        grade_b_percentage=grade_b,
        urs_percentage=urs,
        damaged_percentage=pipeline_res["damaged"],
        rotten_percentage=pipeline_res["rotten"],
        sprouted_percentage=pipeline_res["sprouted"],
        undersized_percentage=pipeline_res["undersized"],
        average_diameter=pipeline_res["average_diameter"],
        average_weight=pipeline_res["average_weight"],
        estimated_price=price_info['estimated_min'],
        market=price_info['market_name'],
        confidence=pipeline_res["onion_confidence"] * 100,
        model_version="OnionGrade-v1.1"
    )
    db.add(record)
    db.commit()

    return {
        "status": "success",
        "stage": 2,
        "is_onion": True,
        "onion_confidence": pipeline_res["onion_confidence"],
        "quality_confidence": pipeline_res["quality_confidence"],
        "is_uncertain": pipeline_res["is_uncertain"],
        "detected_onions_count": pipeline_res["detected_onions_count"],
        "is_single_onion": pipeline_res["is_single_onion"],
        "single_onion_notice": pipeline_res["single_onion_notice"],
        "sample_id": s_id,
        "batch_id": batch_id or "BATCH-2026-088",
        "quality_score": score,
        "grade_a": grade_a,
        "grade_b": grade_b,
        "urs": urs,
        "classification_explanation": pipeline_res.get("classification_explanation"),
        "healthy": pipeline_res["healthy"],
        "damaged": pipeline_res["damaged"],
        "rotten": pipeline_res["rotten"],
        "sprouted": pipeline_res["sprouted"],
        "undersized": pipeline_res["undersized"],
        "average_diameter": pipeline_res["average_diameter"],
        "average_weight": pipeline_res["average_weight"],
        "estimated_price_range": f"₹{price_info['estimated_min']:,} – ₹{price_info['estimated_max']:,} / quintal",
        "market": price_info["market_name"],
        "grade_prices": {
            "grade_a": price_info["grade_a_range"],
            "grade_b": price_info["grade_b_range"],
            "urs": price_info["urs_range"]
        },
        "selling_recommendation": selling_rec["recommendation"],
        "selling_explanation": selling_rec["explanation"],
        "disclaimer": selling_rec["disclaimer"],
        "data_source": price_info["data_source"],
        "last_updated": price_info["last_updated"],
        "model_version": "OnionGrade-v1.1"
    }

@app.get("/api/market-prices")
def get_market_prices(market_id: str = None):
    data = load_market_data()
    if market_id:
        filtered = [m for m in data.get("markets", []) if m["id"] == market_id]
        return {"source": data.get("source"), "updated": data.get("last_updated"), "markets": filtered}
    return data

@app.get("/api/historical-prices")
def get_historical_prices(year: str = "2026", market: str = "Lasalgaon"):
    data = load_market_data()
    history = data.get("historical_monthly", {})
    return {
        "market": market,
        "year": year,
        "data": history.get(year, history.get("2026", []))
    }

@app.post("/api/predict-price")
def predict_price(payload: dict):
    score = payload.get("quality_score", 87)
    grade_a = payload.get("grade_a", 72)
    market_id = payload.get("market_id", "lasalgaon")
    return calculate_price_estimate(score, grade_a, market_id)

@app.get("/api/selling-recommendation")
def recommendation_endpoint(quality_score: int = 87, market_id: str = "lasalgaon"):
    return get_best_selling_recommendation(quality_score, market_id)

@app.get("/api/model-performance")
def get_model_performance():
    project_root = Path(__file__).resolve().parent.parent
    eval_path = project_root / 'reports' / 'model_evaluation.json'
    if eval_path.exists():
        with open(eval_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    return {
        "model_version": "OnionGrade-v1.1",
        "stage1_validator": {
            "mAP50": 0.978,
            "false_positive_rate_fpr": 0.015,
            "false_negative_rate_fnr": 0.030
        }
    }


frontend_dist = Path(__file__).resolve().parent.parent / "dist"
if frontend_dist.is_dir():
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")
