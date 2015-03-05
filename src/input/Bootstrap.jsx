'use strict';

/**
 *  This code is an extract of the Input file from react-bootstrap project
 *  It is use to create valid coumpound component with the same layout that a
 *  React-Bootstrap input.
 **/

var React = require('react');
var classSet = require("react/addons").classSet;

var ReactBootstrap = {
  getChecked: function () {
    return false;
  },

  isCheckboxOrRadio: function () {
    return false;
  },

  isFile: function () {
    return false;
  },

  renderInputGroup: function (children) {
    var addonBefore = this.props.addonBefore ? (
      React.createElement("span", {className: "input-group-addon", key: "addonBefore"},
        this.props.addonBefore
      )
    ) : null;

    var addonAfter = this.props.addonAfter ? (
      React.createElement("span", {className: "input-group-addon", key: "addonAfter"},
        this.props.addonAfter
      )
    ) : null;

    var buttonBefore = this.props.buttonBefore ? (
      React.createElement("span", {className: "input-group-btn"},
        this.props.buttonBefore
      )
    ) : null;

    var buttonAfter = this.props.buttonAfter ? (
      React.createElement("span", {className: "input-group-btn"},
        this.props.buttonAfter
      )
    ) : null;

    return addonBefore || addonAfter || buttonBefore || buttonAfter ? (
      React.createElement("div", {className: "input-group", key: "input-group"},
        addonBefore,
        buttonBefore,
        children,
        addonAfter,
        buttonAfter
      )
    ) : children;
  },

  renderIcon: function () {
    var classes = {
      'glyphicon': true,
      'form-control-feedback': true,
      'glyphicon-ok': this.props.bsStyle === 'success',
      'glyphicon-warning-sign': this.props.bsStyle === 'warning',
      'glyphicon-remove': this.props.bsStyle === 'error'
    };

    return this.props.hasFeedback ? (
      React.createElement("span", {className: classSet(classes), key: "icon"})
    ) : null;
  },

  renderHelp: function () {
    return this.props.help ? (
      React.createElement("span", {className: "help-block", key: "help"},
        this.getHelp()
      )
    ) : null;
  },

  renderCheckboxandRadioWrapper: function (children) {
    var classes = {
      'checkbox': this.props.type === 'checkbox',
      'radio': this.props.type === 'radio'
    };

    return (
      React.createElement("div", {className: classSet(classes), key: "checkboxRadioWrapper"},
        children
      )
    );
  },

  renderWrapper: function (children) {
    return this.props.wrapperClassName ? (
      React.createElement("div", {className: this.props.wrapperClassName, key: "wrapper"},
        children
      )
    ) : children;
  },

  renderLabel: function (children) {
    var classes = {
      'control-label': !this.isCheckboxOrRadio()
    };
    classes[this.props.labelClassName] = this.props.labelClassName;

    return this.props.label ? (
      React.createElement("label", {htmlFor: this.props.id, className: classSet(classes), key: "label"},
        children,
        this.props.label
      )
    ) : children;
  },

  renderFormGroup: function (children) {
    var classes = {
      'form-group': true,
      'has-feedback': this.props.hasFeedback,
      'has-success': this.props.bsStyle === 'success',
      'has-warning': this.props.bsStyle === 'warning',
      'has-error': this.props.bsStyle === 'error' || this.getErrors().length > 0
    };
    classes[this.props.groupClassName] = this.props.groupClassName;

    return (
      React.createElement("div", {className: classSet(classes)},
        children
      )
    );
  },

  renderInput: function (input) {
    return this.renderFormGroup([
      this.renderLabel(),
      this.renderWrapper([
        this.renderInputGroup(input),
        this.renderIcon(),
        this.renderHelp()
      ])
    ]);
  }
};

module.exports = ReactBootstrap;
