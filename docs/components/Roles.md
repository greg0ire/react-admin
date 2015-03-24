Roles
=====

Roles allows to control how elements will be displayed to the end user. The implementation is based on Reflux, so you can call actions ``ReactAdmin.Roles.Add`` or ``ReactAdmin.Roles.Replace`` to add new role for the current application. This pattern allow to enable action without reloading the ReactJS application to enable options for a specific user.


Adding new roles
----------------

    ```js
    var ReactAdmin = require('react-admin');
        
    ReactAdmin.Roles.Add(["EDITOR", "VISITOR", "SUPER_ADMIN"]);
    ```
    
Replace roles
-------------

    ```js
    var ReactAdmin = require('react-admin');
        
    ReactAdmin.Roles.Replace(["EDITOR", "SUPER_ADMIN"]);
    ```

JSX Usage
---------

You can use the component ``ReactAdmin.Roles.Has`` to render the element if the user has the specified roles.

    <ReactAdmin.Roles.Has roles={["EDITOR"]}>
        <div>Only user with EDITOR role can view this message </div>
    </ReactAdmin.Roles.Has>

JSX does not allow to render multiple root element, so if you want to render a set of components, you can either use one ``ReactAdmin.Roles.Has`` per element or specified the parent element to be generate:

    <ReactAdmin.Roles.Has roles={["SUPER_ADMIN"]} element="div" className="foobar" style={{border: '1px solid black', padding: '5px', margin: '5px'}}>
        <span>Only user with SUPER_ADMIN role </span>
        <span>can view this message</span>
    </ReactAdmin.Roles.Has>

