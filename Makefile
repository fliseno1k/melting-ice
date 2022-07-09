
# Production make commands
build-prod:
	cd nginx && $(MAKE) build
	cd backend && $(MAKE) build

run-prod:
	docker-compose -f docker-compose.yml up -d


# Development make commands
build-dev: 
	cd backend && $(MAKE) build

run-dev: 
	docker-compose -f docker-compose.yml up -d


# Common make commands
stop: 
	docker-compose down