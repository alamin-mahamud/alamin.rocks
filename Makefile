.PHONY: help all backend build stop clean logs test lint

# Default target
help:
	@echo "Available commands:"
	@echo "  all          - Start all services (frontend, admin, backend, db, redis)"
	@echo "  backend      - Start backend services (backend, db, redis)"
	@echo "  build        - Build all Docker images"
	@echo "  stop         - Stop all running containers"
	@echo "  clean        - Stop and remove all containers, networks, and volumes"
	@echo "  logs         - Show logs for all services"
	@echo "  test         - Run backend tests"
	@echo "  lint         - Run linting for all projects"

# Docker Compose commands
all:
	docker compose --profile all up --build

backend:
	docker compose --profile backend up --build

build:
	docker compose build

stop:
	docker compose down

clean:
	docker compose down -v --remove-orphans
	docker system prune -f

logs:
	docker compose logs -f

# Testing and linting
test:
	cd backend && pytest

lint:
	cd backend && ruff check .
	cd frontend && npm run lint
	cd admin && npm run lint