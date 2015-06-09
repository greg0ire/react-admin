.PHONY: demo test install build

default: build

test:
	gulp
	npm test

install:
	npm install -g bower
	npm install -fg styledocco
	npm install
	bower install

build:
	gulp

demo:
	gulp demo

