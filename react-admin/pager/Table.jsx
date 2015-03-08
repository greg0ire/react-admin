'use strict';

var React = require('react');
var B = require('react-bootstrap');
var Router = require('react-router');
var RB = require('react-router-bootstrap');

var Card = {
  List: require('../card/List'),
  Icon: require('../card/Icon'),
  Information: require('../card/Information'),
  Notification: require('../card/Notification')
}

var _ = require('lodash');
var Url = require('url');

var BaseTable = {
  mixins: [Router.State],

  propTypes: {
    index: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    per_page: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      className: "col-sm-12 col-md-12 main",
      per_page: 32
    }
  },

  getInitialState: function() {
    return {
      page: 1,
      per_page: this.props.per_page,
      next: null,
      previous: null,
      elements: []
    };
  },

  componentDidMount: function() {
    this.refreshGrid();
  },

  getFilters: function(extras) {
    var filters = {
      page: 1,
      per_page: 32
    }

    filters = _.assign(filters, this.getQuery())
    filters = _.assign(filters, extras || {})

    filters.page = parseInt(filters.page, 10);
    filters.per_page = parseInt(filters.per_page, 10);

    return filters;
  },

  getPage: function(inc) {
    var page = this.getFilters().page + inc;

    if (page < 1) page = 1;

    return page;
  },

  renderRow: function(element) {
     // this method should be overwritten to create your own rendering element
    return <Card.List>
        <Card.Information >
            The information card
        </Card.Information>

        <Card.Icon type="circle-thin" />

        A message you can use

        <Card.Notification>
          The notification card
        </Card.Notification>
      </Card.List>
  },

  render: function() {
    return (
      <div className={this.props.className}>
        <B.Row>
          {_.map(this.state.elements, this.renderRow, this)}
        </B.Row>

        <B.Pager>
          <li className="previous"><Router.Link to={this.props.index} query={{page: this.getPage(-1)}} onClick={this.refreshGrid.bind(this, {page:this.getPage(-1)})} >&larr; Previous Page</Router.Link></li>
          <li className="next"><Router.Link to={this.props.index} query={{page: this.getPage(1)}} onClick={this.refreshGrid.bind(this, {page:this.getPage(1)})} >Next Page &rarr;</Router.Link></li>
        </B.Pager>
      </div>
    );
  }
};

module.exports = {
  create: function() {
    var klass = _.merge({}, BaseTable);

    _.forEach(arguments, function(def) {
      klass = _.merge(klass, def);
    })

    return React.createClass(klass);
  }
};
