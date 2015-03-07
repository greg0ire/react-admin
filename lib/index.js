"use strict";

var SelectInput = require("./input/Select");
var RadioInput = require("./input/Radio");
var TextInput = require("./input/Text");

module.exports = {
    // card used in list
    IconCard: require("./card/Icon"),
    InformationCard: require("./card/Information"),
    NotificationCard: require("./card/Notification"),

    // input used in form
    createInput: require("./input/Input").create,
    BootstrapInput: require("./input/Bootstrap"),

    NumberInput: require("./input/Number"),
    BooleanInput: require("./input/Boolean"),

    TextInput: TextInput.Text,
    TextAreaInput: TextInput.TextArea,
    PasswordInput: TextInput.Password,
    DoublePasswordInput: TextInput.DoublePassword,

    NumberSelect: SelectInput.NumberSelect,
    Select: SelectInput.Select,
    BooleanSelect: SelectInput.BooleanSelect,

    NumberRadio: RadioInput.NumberRadio,
    BooleanRadio: RadioInput.BooleanRadio,
    Radio: RadioInput.Radio,

    // Table
    createTable: require("./pager/Table").create,

    // Helpers
    stubRouterContext: require("./utils/stubRouterContext"),

    Container: require("./utils/Container"),
    ReadValue: require("./utils/Property").ReadValue,
    WriteValue: require("./utils/Property").WriteValue,

    EndPoint: require("./rest/EndPoint"),

    Card: {
        Icon: require("./card/Icon"),
        Information: require("./card/Information"),
        Notification: require("./card/Notification"),
        List: require("./card/List")
    },

    // Status
    Status: {
        Action: require("./store/Status").Action,
        Component: require("./store/Status").Component,
        Store: require("./store/Status").Store
    },

    // Notification
    Notification: {
        Action: require("./store/Notification").Action,
        Component: require("./store/Notification").Component,
        Store: require("./store/Notification").Store
    }
};