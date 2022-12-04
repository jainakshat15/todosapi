const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    googleId:{
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    category:{
        type: String,
        default: "NA"
    }
    
},{timestamps: true})

const Todo = mongoose.model("Todo",TodoSchema);

module.exports = Todo;