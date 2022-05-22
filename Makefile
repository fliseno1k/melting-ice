build-prod:
	cd frontend && $(MAKE) build
	cd nginx && $(MAKE) build
	cd backend && $(MAKE) build

run-prod:
	docker-compose -f docker-compose.yml up -d

stop: 
	docker-compose down