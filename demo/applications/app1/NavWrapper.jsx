'use strict';

var React = require('react');
var B = require('react-bootstrap');
var Router = require('react-router');
var RB = require('react-router-bootstrap');
var ReactAdmin = require('react-admin');
var Reflux = require('reflux');

var List = require('./List.jsx');

export default (Component, ctx) => {
    return React.createClass({
        displayName: 'App1 - ' + ctx,
        render() {
            return <B.Row>
                <B.Navbar brand="Demo" fluid>
                    <B.Nav navbar right>
                        <RB.NavItemLink bsSize='small' to="app1.list">List</RB.NavItemLink>
                        <RB.NavItemLink bsSize='small' to="app1.create">Create</RB.NavItemLink>
                    </B.Nav>
                </B.Navbar>

                <Component />
            </B.Row>
        }
    })
}