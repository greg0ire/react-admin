"use strict";

var reflux = require('reflux');
var faker = require('faker');

export function saveAction(obj) {
    if (!("id" in obj)) {
        obj.id = objectsStore.objects.size;

        console.log("Save action:", obj.id);

        addToStore(obj);
    }

    // nothing else to do
}

export var addToStore = reflux.createAction();

export var objectsStore = reflux.createStore({
    init() {
        this.objects = new Map();
        for (var i = 0; i < 256; i++) {
            this.objects.set(i, {
                name: faker.name.findName(),
                avatar: faker.internet.avatar(),
                bio: faker.hacker.phrase(),
                account: faker.finance.account(),
                count: faker.helpers.randomNumber(100),
                status: faker.helpers.randomNumber(3),
                enabled: faker.helpers.randomNumber(1) == 1,
                superAdmin: faker.helpers.randomNumber(1) == 1,
                id: i
            });
        }

        this.listenTo(addToStore, (obj) => {
            this.objects.set(obj.id, obj);

            this.trigger.apply(this, this.objects)
        });

        this.trigger.apply(this, this.objects)
    }
});