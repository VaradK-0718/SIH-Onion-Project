FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM python:3.11-slim AS app
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1
WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements-deploy.txt ./
RUN pip install --no-cache-dir -r requirements-deploy.txt

COPY backend ./backend
COPY ml/inference.py ./ml/inference.py
COPY ml/preprocessing/image_quality.py ./ml/preprocessing/image_quality.py
COPY data/apmc_market_prices.json ./data/apmc_market_prices.json
COPY reports/model_evaluation.json ./reports/model_evaluation.json
COPY --from=frontend-build /app/dist ./dist

EXPOSE 8000
CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
