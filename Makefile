build-prod:
	cd frontend && $(MAKE) build

run-prod:
	docker-compose -f docker-compose.yml up -d

stop: 
	docker-compose down