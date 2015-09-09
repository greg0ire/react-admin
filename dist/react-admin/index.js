"use strict";

var SelectInput = require("./input/Select");
var RadioInput = require("./input/Radio");
var TextInput = require("./input/Text");

// http://formatjs.io/guides/runtime-environments/#polyfill-node

var areIntlLocalesSupported = require('intl-locales-supported');

var localesMyAppSupports = ["en"];

if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!areIntlLocalesSupported(localesMyAppSupports)) {
        // `Intl` exists, but it doesn't have the data we need, so load the
        // polyfill and replace the constructors with need with the polyfill's.
        require('intl');
        Intl.NumberFormat = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
} else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl');
}

module.exports = {
    // card used in list
    IconCard: require("./card/Icon"),
    InformationCard: require("./card/Information"),
    NotificationCard: require("./card/Notification"),

    // input used in form
    createInput: require("./input/Input").create,
    BootstrapInput: require("./input/ReactBootstrap"),

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

    ResourceNotFound: require("./form/ResourceNotFound"),

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
        List: require("./card/List"),
        Actions: require("./card/Actions"),
        Content: require("./card/Content"),
        Title: require("./card/Title")
    },

    // Sidebar
    Sidebar: {
        Component: require("./store/Sidebar").Component,
        ToggleAction: require("./store/Sidebar").ToggleAction,
        Store: require("./store/Sidebar").Store
    },

    // Clock
    Clock: {
        Component: require("./store/Clock").Component
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
    },

    // Roles
    Roles: {
        Add: require("./store/Roles").Add,
        Replace: require("./store/Roles").Replace,
        Store: require("./store/Roles").Store,
        Has: require("./store/Roles").Has
    }
};