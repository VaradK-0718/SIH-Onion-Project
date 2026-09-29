import cv2
import numpy as np
from PIL import Image

def check_image_quality(image_input, blur_threshold=65.0, min_brightness=35, max_brightness=235):
    """
    Stage 1 Image Quality Assessment:
    Checks if an image is too blurry, too dark, or overexposed.
    """
    try:
        # Convert PIL Image or path to OpenCV BGR format
        if isinstance(image_input, Image.Image):
            img_np = np.array(image_input.convert('RGB'))
            img_bgr = cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR)
        elif isinstance(image_input, str):
            img_bgr = cv2.imread(image_input)
            if img_bgr is None:
                return {"quality_ok": False, "reason": "unreadable_image", "blur_score": 0, "brightness_score": 0}
        else:
            return {"quality_ok": False, "reason": "invalid_input", "blur_score": 0, "brightness_score": 0}

        gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)

        # 1. Compute Blur Score using Variance of Laplacian
        blur_score = float(cv2.Laplacian(gray, cv2.CV_64F).var())

        # 2. Compute Mean Brightness
        brightness_score = float(np.mean(gray))

        # 3. Check Image Resolution
        h, w = gray.shape
        if h < 100 or w < 100:
            return {
                "quality_ok": False,
                "reason": "resolution_too_low",
                "blur_score": blur_score,
                "brightness_score": brightness_score
            }

        # 4. Evaluate Blur Threshold
        if blur_score < blur_threshold:
            return {
                "quality_ok": False,
                "reason": "extremely_blurry",
                "blur_score": round(blur_score, 2),
                "brightness_score": round(brightness_score, 2)
            }

        # 5. Evaluate Lighting Conditions (Too Dark / Too Bright)
        if brightness_score < min_brightness:
            return {
                "quality_ok": False,
                "reason": "too_dark",
                "blur_score": round(blur_score, 2),
                "brightness_score": round(brightness_score, 2)
            }
        elif brightness_score > max_brightness:
            return {
                "quality_ok": False,
                "reason": "overexposed",
                "blur_score": round(blur_score, 2),
                "brightness_score": round(brightness_score, 2)
            }

        return {
            "quality_ok": True,
            "reason": "quality_passed",
            "blur_score": round(blur_score, 2),
            "brightness_score": round(brightness_score, 2)
        }

    except Exception as e:
        return {"quality_ok": False, "reason": "processing_error", "error": str(e), "blur_score": 0, "brightness_score": 0}
