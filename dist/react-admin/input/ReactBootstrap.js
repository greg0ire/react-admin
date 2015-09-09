/**
 *  This code is an extract of the Input file from react-bootstrap project
 *  It is use to create valid coumpound component with the same layout that a
 *  React-Bootstrap input.
 **/

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var React = require('react');
var classNames = require('classnames');

exports['default'] = {
    getChecked: function getChecked() {
        return false;
    },

    isCheckboxOrRadio: function isCheckboxOrRadio() {
        return false;
    },

    isFile: function isFile() {
        return false;
    },

    renderInputGroup: function renderInputGroup(children) {
        var addonBefore = this.props.addonBefore ? React.createElement("span", { className: "input-group-addon", key: "addonBefore" }, this.props.addonBefore) : null;

        var addonAfter = this.props.addonAfter ? React.createElement("span", { className: "input-group-addon", key: "addonAfter" }, this.props.addonAfter) : null;

        var buttonBefore = this.props.buttonBefore ? React.createElement("span", { className: "input-group-btn" }, this.props.buttonBefore) : null;

        var buttonAfter = this.props.buttonAfter ? React.createElement("span", { className: "input-group-btn" }, this.props.buttonAfter) : null;

        return addonBefore || addonAfter || buttonBefore || buttonAfter ? React.createElement("div", { className: "input-group", key: "input-group" }, addonBefore, buttonBefore, children, addonAfter, buttonAfter) : children;
    },

    renderIcon: function renderIcon() {
        var classes = {
            'glyphicon': true,
            'form-control-feedback': true,
            'glyphicon-ok': this.props.bsStyle === 'success',
            'glyphicon-warning-sign': this.props.bsStyle === 'warning',
            'glyphicon-remove': this.props.bsStyle === 'error'
        };

        return this.props.hasFeedback ? React.createElement("span", { className: classNames(classes), key: "icon" }) : null;
    },

    renderHelp: function renderHelp() {
        return this.props.help ? React.createElement("span", { className: "help-block", key: "help" }, this.getHelp()) : null;
    },

    renderCheckboxandRadioWrapper: function renderCheckboxandRadioWrapper(children) {
        var classes = {
            'checkbox': this.props.type === 'checkbox',
            'radio': this.props.type === 'radio'
        };

        return React.createElement("div", { className: classNames(classes), key: "checkboxRadioWrapper" }, children);
    },

    renderWrapper: function renderWrapper(children) {
        return this.props.wrapperClassName ? React.createElement("div", { className: this.props.wrapperClassName, key: "wrapper" }, children) : children;
    },

    renderLabel: function renderLabel(children) {
        var classes = {
            'control-label': !this.isCheckboxOrRadio()
        };
        classes[this.props.labelClassName] = this.props.labelClassName;

        return this.props.label ? React.createElement("label", { htmlFor: this.props.id, className: classNames(classes), key: "label" }, children, this.props.label) : children;
    },

    renderFormGroup: function renderFormGroup(children) {
        var classes = {
            'form-group': true,
            'has-feedback': this.props.hasFeedback,
            'has-success': this.props.bsStyle === 'success',
            'has-warning': this.props.bsStyle === 'warning',
            'has-error': this.props.bsStyle === 'error' || this.getErrors().length > 0
        };
        classes[this.props.groupClassName] = this.props.groupClassName;

        return React.createElement("div", { className: classNames(classes) }, children);
    },

    renderInput: function renderInput(input) {
        return this.renderFormGroup([this.renderLabel(), this.renderWrapper([this.renderInputGroup(input), this.renderIcon(), this.renderHelp()])]);
    }
};
module.exports = exports['default'];