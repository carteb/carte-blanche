all: dist

PORT := 8080

deps:
	npm install
	npm install -g webpack

dist:
	webpack --progress -p --config webpack.config.prod.js

dev:
	webpack --progress -cd

hot:
	webpack-dev-server --progress --port $(PORT)

lint:
	./node_modules/.bin/eslint src --ext js,jsx

lintfix:
	./node_modules/.bin/eslint src --ext js,jsx --fix

.PHONY: dist deps
