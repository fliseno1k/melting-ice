build-prod:
	cd backend && $(MAKE) build

run-prod:
	docker-compose -f docker-compose.yml up -d

stop: 
	docker-compose down

SSH_STRING:=root@193.104.57.106

ssh:
	ssh ${SSH_STRING}

copy-files:
	scp -r ./* ${SSH_STRING}:/root/