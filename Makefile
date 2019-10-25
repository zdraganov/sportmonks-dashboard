local:
	make -j 2 server frontend
.PHONY: local

server:
	npm start --prefix ./server
.PHONY: server

frontend:
	npm start --prefix ./frontend
.PHONY: frontend
