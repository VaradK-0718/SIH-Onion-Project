# Deployment

The app can be deployed as one Docker web service: FastAPI serves both the React
build and `/api` routes from the same origin. This avoids browser CORS and
localhost configuration issues.

## Deploy on Render

1. Push this project to a GitHub repository.
2. In Render, select **New + → Blueprint** and connect the repository.
3. Render reads `render.yaml`, builds the Docker image, and creates a persistent
   disk for SQLite. Wait for the service health check to pass.
4. Open the service URL. The UI should load at `/`; `/api/health` should return
   the backend online status.

The blueprint uses Render's paid `starter` web service plan because persistent
disks are required to retain SQLite data across deploys. Keep one service
instance when using SQLite. For horizontal scaling, move to a shared database.

## Deploy elsewhere with Docker

Build and start the container:

```sh
docker build -t oniongrade .
docker run --rm -p 8000:8000 \
  -e DATABASE_URL=sqlite:////data/oniongrade.db \
  -v oniongrade-data:/data \
  oniongrade
```

For a public production service, persist `/data` and terminate HTTPS at the
hosting platform or reverse proxy. If the frontend is hosted on another origin,
set `CORS_ORIGINS` to a comma-separated list of exact trusted origins.

## Runtime notes

- `requirements-deploy.txt` contains the packages needed by the current API
  inference path. It intentionally avoids installing training frameworks and
  model-training dependencies.
- `DATABASE_URL` defaults to a local SQLite file for development. Production
  hosting should point it at persistent storage.
- Uploaded images are limited to 10 MB and 40 megapixels.
- The current inference implementation still uses preset/default scoring;
  image upload is used for image-quality checks but does not perform
  image-specific onion detection or quality grading.
