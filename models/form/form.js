
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var FormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "forms" });

FormSchema.plugin(uniqueValidator);
/*
FormSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

FormSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});
*/

module.exports = mongoose.model("Form", FormSchema)