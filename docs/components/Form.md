Form
====

A form is a default ``ReactJS`` component. A form component should defined some default functions. Those functions are not linked to ``react-admin`` but required by ``ReactJS`` it self.


getInitialState
---------------

The method should return the default value used by React while the form is initialized.

```js
getInitialState() {
    // define default values
    return {
        object: {
            name: "loading node ..."
        },
        errors: {}
    };
},
```

The ``object`` key is not mandatory and can be named with any name you like. However the ``errors`` keys is used by the different inputs to render errors. 


componentDidMount & componentWillReceiveProps
---------------------------------------------

This methods will be used to load the data related to the form when the application or the component is ready. 

```js
componentDidMount() {
    this.loadData();
},

componentWillReceiveProps() {
    this.loadData();
},

loadData() {

    this.setState({
        object: {} // code to load the object 
    });
},

```

render
------

Like any ReactJS component, the render method is mandatory. The method must return a set of element to render. React-Admin provides a set of widget used to update the object ``property`` provided related to the ``form`` attribute. You can access to the complete list of widgets from the [related documentations](Form_Widgets.md).

```js
render() {
    if (!this.state.object) {
        return <ReactAdmin.ResourceNotFound reference={this.getParams().id}  />
    }
        
    return (
        <div className="col-sm-12 col-md-12 main">
            <h2 className="sub-header">Edit {this.state.object.name} </h2>

            <ReactAdmin.TextInput form={this} property="object.name" label="Name" help="The name"/>

            <ReactAdmin.TextAreaInput form={this} property="object.bio" label="Biography" />

            <B.Button bsStyle="primary" onClick={this.submit}>Save</B.Button>
        </div>
    );
}
```

submit
------

The ``submit`` is a convenient name, but again name it as you want. Just make sure the ``save`` button is bound to the correct callback. The ``submit`` action is the place where you can put front validation and server communication to validate the data on a remote service. 

```js
submit() {
    // local validation
    var errors = {};
    if (this.state.object.name.length == 0) {
        errors['object.name'] = ["Name cannot be emtpy"];
    }
    
    // post the data to the remote server
    //  do the work ;)

    if (Object.keys(errors).length > 0) {
        ReactAdmin.Status.Action('danger', "Errors occurs while saving", 4000);
    } else {
        ReactAdmin.Status.Action('success', "The object has been saved", 2000);

        ReactAdmin.Notification.Action(NotificationElement, {
            name: this.state.object.name,
            action: "Save",
            id: this.state.object.id
        });
    }

    this.setState({
        'errors': errors
    });
},
```

refreshView
-----------

It is the only required method, it is used to refresh the form view. It is call by input when the related object is updated.

```js
refreshView() {
    this.setState({
        object: this.state.object
    });
},
```

This might look weird at first, but it forces React to refresh the view.
