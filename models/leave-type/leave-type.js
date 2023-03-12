
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var LeavetypeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "leave_types" });

LeavetypeSchema.plugin(uniqueValidator);

LeavetypeSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

LeavetypeSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

module.exports = mongoose.model("Leave-type", LeavetypeSchema)