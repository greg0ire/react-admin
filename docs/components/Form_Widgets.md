Form Widgets
============

The project comes with a set of widget with auto-mapping to the related data structure. Each widget must have a ``form`` field and a ``property`` field defined, the widget also accept a ``label`` and a ``roles`` field. The latter can be used to hide or show a field from the form, please refer to the [Roles documentation](Roles.md). 

```jsx
<ReactAdmin.BooleanSelect 
    form={this} 
    property="object.superAdmin" 
    label="Is Super Admin" 
    roles={["SUPER_ADMIN"]}>
    <option value="1">Yes</option>
    <option value="0">No</option>
</ReactAdmin.BooleanSelect>
```

The property field defined the value of the input and ``object`` must be defined in the ``state`` variables.


Text
----

``ReactAdmin.TextInput``: Render a ``input`` field to edit a text value.

```jsx
<ReactAdmin.TextInput form={this} property="object.field" />
```

``ReactAdmin.TextAreaInput``: Render a ``textarea`` field to edit a text value.

```jsx
<ReactAdmin.TextAreaInput form={this} property="object.field" />
```

``ReactAdmin.Password``: Render a ``password`` field to edit a text value.

```jsx
<ReactAdmin.Password form={this} property="object.field" />
```

``ReactAdmin.Number``: Render an ``input`` field to edit a number.

```jsx
<ReactAdmin.Number form={this} property="object.field" />
```

``ReactAdmin.Boolean``: Render a ``input`` field to edit a boolean value.

```jsx
<ReactAdmin.Boolean form={this} property="object.field" />
```

Radio
-----
   
``ReactAdmin.Radio``: Render an ``input radio`` field to set a string value 

```jsx
<ReactAdmin.Radio form={this} value="the value" label="1 is a value" property="object.field" />
<ReactAdmin.Radio form={this} value="another value" label="2 is another one" property="object.field" />
```

``ReactAdmin.NumberRadio``: Render an ``input radio`` field to set a number 

```jsx
<ReactAdmin.NumberRadio form={this} value={1} label="1 is a value" property="object.field" />
<ReactAdmin.NumberRadio form={this} value={2} label="2 is another one" property="object.field" />
```

``ReactAdmin.BooleanRadio``: Render an ``input radio`` field to set a boolean 

```jsx
<ReactAdmin.BooleanRadio form={this} value={0} label="yes" property="object.field" />
<ReactAdmin.BooleanRadio form={this} value={1} label="no" property="object.field" />
```

Select
------

``ReactAdmin.Select``: Render a ``select`` to choice a value from a provider list.

```jsx
<ReactAdmin.Select form={this} property="object.field" label="Status">
    <option value="0">New</option>
    <option value="1">Draft</option>
    <option value="2">Completed</option>
    <option value="3">Validated</option>
</ReactAdmin.Select>
```

``ReactAdmin.NumberSelect``: Render a ``select`` to choice a number from a provider list.

```jsx
<ReactAdmin.NumberSelect form={this} property="object.field" label="Status">
    <option value="0">New</option>
    <option value="1">Draft</option>
    <option value="2">Completed</option>
    <option value="3">Validated</option>
</ReactAdmin.NumberSelect>
```


``ReactAdmin.BooleanSelect``: Render a ``select`` to choice a boolean form a provided list.

```jsx
<ReactAdmin.BooleanSelect form={this} property="object.field" label="Status">
    <option value="0">New</option>
    <option value="1">Draft</option>
</ReactAdmin.BooleanSelect>
```

ReactBootstrap Mixin
--------------------

// TODO

Create a custom field
---------------------
// TODO