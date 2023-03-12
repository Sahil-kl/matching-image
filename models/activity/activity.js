
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var ActivitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    icon: { type: String, required: false, default: null },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "activities" });

ActivitySchema.plugin(uniqueValidator);

ActivitySchema.pre('find', function () {
    this.where({ isDeleted: false });
});

ActivitySchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const Activity = mongoose.model("Activity", ActivitySchema)
module.exports = Activity