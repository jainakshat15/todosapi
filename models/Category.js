const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CatSchema = new Schema({
    googleId:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
},{timestamps: true})

const Cat = mongoose.model("Category",CatSchema);

module.exports = Cat;