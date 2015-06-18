var React = require('react');
var B = require('react-bootstrap');
var Router = require('react-router');

var Card = {
    List: require('../card/List.jsx'),
    Icon: require('../card/Icon.jsx'),
    Information: require('../card/Information.jsx'),
    Notification: require('../card/Notification.jsx')
};

var Create = require('../utils/Create');

var _ = require('lodash');
var Url = require('url');

var BaseTable = {
    propTypes: {
        index: React.PropTypes.string.isRequired,
        className: React.PropTypes.string,
        per_page: React.PropTypes.number,
        show_filters: React.PropTypes.bool
    },
    contextTypes: {
      router: React.PropTypes.func
    },

    getDefaultProps () {
        return {
            className: "col-sm-12 col-md-12 main",
            per_page: 32,
            show_filters: true
        }
    },

    getInitialState () {
        return {
            page: 1,
            per_page: this.props.per_page,
            next: null,
            previous: null,
            elements: [],
            filters: []
        };
    },

    componentDidMount () {
        this.refreshGrid();
    },

    refreshGrid() {
        console.log("You need to implement the refreshGrid method");
    },

    getFilters (extras) {
        var filters = {
            page: 1,
            per_page: 32
        };

        filters = _.assign(filters, 'filters' in this.state ? this.state.filters : {});
        filters = _.assign(filters, this.context.router.getCurrentQuery());
        filters = _.assign(filters, extras || {});

        filters.page = parseInt(filters.page, 10);
        filters.per_page = parseInt(filters.per_page, 10);

        return filters;
    },

    getPage (inc) {
        var page = this.getFilters().page + inc;

        if (page < 1) {
            page = 1;
        }

        return page;
    },

    renderRow (element) {
        // this method should be overwritten to create your own rendering element
        return <Card.List>
            <Card.Information >
                The information card
            </Card.Information>

            <Card.Icon type="circle-thin" />

            You should overwrite the <code>renderRow</code> method to create your own card/row.
            You can also refer to the <a href="https://github.com/rande/react-admin/blob/master/docs/components/Card.md" target="_blank">related documentation</a>.

            <Card.Notification>
                The notification card
            </Card.Notification>
        </Card.List>
    },

    renderFilters () {
        return <B.Row>
            <div className="col-sm-12">
                You should overwrite the <code>renderFilters</code> method to add your filters or return null if
                done is required. <br />You can also refer to the <a href="https://github.com/rande/react-admin/blob/master/docs/components/Filters.md" target="_blank">related documentation</a>.
            </div>
        </B.Row>
    },

    render () {
        var filters = null;

        if (this.props.show_filters) {
            filters = this.renderFilters()
        }

        return (
            <div className={this.props.className}>
                {filters}

                <B.Row>
                    {_.map(this.state.elements, this.renderRow, this)}
                </B.Row>

                <B.Pager>
                    <li className="previous">
                        <Router.Link to={this.props.index} query={{page: this.getPage(-1)}} onClick={this.refreshGrid.bind(this, {page: this.getPage(-1)})} >&larr; Previous Page</Router.Link>
                    </li>
                    <li className="next">
                        <Router.Link to={this.props.index} query={{page: this.getPage(1)}} onClick={this.refreshGrid.bind(this, {page: this.getPage(1)})} >Next Page &rarr;</Router.Link>
                    </li>
                </B.Pager>
            </div>
        );
    }
};


export function create() {
    return Create(BaseTable, arguments);
}