"use strict";

var reflux      = require('reflux');
var faker       = require('faker');

var saveAction = reflux.createAction();

var objectsStore = reflux.createStore({
   init() {
       this.objects = {};
       for (var i = 0; i < 256; i++) {
           this.objects[i] = {
               name: faker.name.findName(),
               avatar: faker.internet.avatar(),
               bio: faker.hacker.phrase(),
               account: faker.finance.account(),
               count: faker.helpers.randomNumber(100),
               status: faker.helpers.randomNumber(3),
               enabled: faker.helpers.randomNumber(1) == 1,
               id:  i
           };
       }

       this.listenTo(saveAction, () => {
           this.trigger.apply(this, this.objects)
       });

       this.trigger.apply(this, this.objects)
   }
});

module.exports = {
    saveAction: saveAction,
    objectsStore: objectsStore
}