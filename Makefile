.PHONY: demo test install build

default: build

test:
	npm test

install:
	npm install

build:
	gulp build

demo:
	# make the current module available will building the demo
	rm -rf node_module/react-admin
	mkdir -p node_modules/react-admin node_modules/react-admin/node_modules
	cp -rf package.json lib node_modules/react-admin
	cp -rf node_modules/superagent node_modules/react-admin/node_modules
	# build the demo
	gulp demo

