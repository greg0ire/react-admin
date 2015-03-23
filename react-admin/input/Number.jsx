var Input = require('./Input.jsx')

export default Input.create({
    updateValue (event) {
        this.setValue(this.parseInt(event.target.value));
    }
});
