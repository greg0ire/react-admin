.PHONY: demo test install build

default: build

test:
	npm test

install:
	npm install

build:
	gulp

demo:
	gulp demo

