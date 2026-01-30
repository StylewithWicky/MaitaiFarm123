## Purpose

This file gives concise, actionable guidance to AI coding agents working in this repository. Focus on patterns, run/dev commands, and the key files to consult when making changes.

## Architecture (big picture)

- **Backend**: FastAPI app defined in `backend/main.py`. Routers live under `backend/app/routes/` (e.g., `auth.py`, `farmers.py`, `product.py`). Models are in `backend/app/models/`. The DB engine and `Base` are created in `backend/app/database/connection.py` and tables are created at startup via `Base.metadata.create_all(bind=engine)` in `backend/main.py`.
- **Config**: Runtime settings use `backend/app/config.py` (Pydantic settings) and expect a `.env` file at the repo root (keys: `DATABASE_URL`, `SECRET_KEY`, `ALGORITHM`, `ACCESS_TOKEN_EXPIRE_MINUTES`).
- **Services & Utils**: Business logic lives in `backend/app/service/` (e.g., `mpesa_service.py`, `product_service.py`). Shared helpers and auth utilities are in `backend/app/utils/` (e.g., `security.py`).
- **Frontend**: React + Vite app under `frontend/` with source in `frontend/src/`. Admin pages are in `frontend/src/admin/`. Components are in `frontend/src/components/` (e.g., `auth/LoginForm.jsx`).

## How to run (developer workflows)

- Backend (dev): create a `.env` with `DATABASE_URL` and `SECRET_KEY` and then run with uvicorn from the repo root:

```bash
uvicorn backend.main:app --reload --port 8000
```

- Frontend (dev): from `frontend/` run:

```bash
npm install
npm run dev
```

- Build frontend for production:

```bash
cd frontend
npm run build
```

Notes:
- The backend uses `Base.metadata.create_all(...)` (no migration tool present). The DB connection is configured in `backend/app/database/connection.py` which reads `DATABASE_URL` from `.env`.
- CORS in `backend/main.py` currently sets `allow_origins` to `["\"]` — adjust to the required frontend origin(s) during development/production.

## Project-specific conventions & patterns

- Router pattern: each file in `backend/app/routes/` exposes a FastAPI router and is included in `backend/main.py` via `app.include_router(...)`. Check `backend/app/routes/auth.py` for auth patterns.
- Models: SQLAlchemy declarative models live under `backend/app/models/`. The project relies on the shared `Base` from `backend/app/database/connection.py`.
- Settings: `backend/app/config.py` uses Pydantic settings via `BaseSettings`; prefer reading configuration keys from `masettings` when writing code that needs runtime config.
- Services: Business logic that calls external APIs (e.g., M-Pesa) is placed in `backend/app/service/`; use these services from routes rather than embedding external calls directly in route handlers.
- Dependency injection: database sessions are created via `SessionLocal` in `backend/app/database/connection.py` and should be exposed via dependency helpers in `backend/app/database/deps.py` (consult that file when adding DB access).

## Integration points & external dependencies

- Database: configured by `DATABASE_URL` env var; SQLAlchemy engine is used (no migration framework found).
- External payments: `backend/app/service/mpesa_service.py` contains payment integration logic — treat it as a critical integration point and avoid breaking backwards compatibility without tests.
- Frontend libraries of note: `axios` (network calls), `formik` + `yup` (forms/validation), `framer-motion`, `react-router-dom`.

## Files to check before editing

- Backend entry & wiring: `backend/main.py`
- DB connection: `backend/app/database/connection.py`
- Runtime settings: `backend/app/config.py`
- Routes: `backend/app/routes/` (auth, farmers, product)
- Services: `backend/app/service/` (mpesa_service.py, product_service.py)
- Frontend entry & scripts: `frontend/package.json`, `frontend/src/` (components/admin/)

## Example edits and recommended approach

- Adding an API route: add a new router file under `backend/app/routes/`, expose `router` and include it in `backend/main.py`.
- Adding DB models: add model to `backend/app/models/`, import it where needed; tables are created on startup by `create_all`.
- Frontend API call: use `axios` from `frontend/src/components/*`, keep form validation with `formik` + `yup` consistent with existing components like `auth/LoginForm.jsx`.

## Tests & CI

- There are no discoverable test suites or CI configs in the repository. Before adding tests, follow the project's conventions in code layout and services separation.

---
If any section is unclear or you'd like more examples (e.g., a template router, service, or encrypted secret usage), tell me which part to expand.
