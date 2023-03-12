
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var SchoolGroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "school_groups" });

SchoolGroupSchema.plugin(uniqueValidator);

SchoolGroupSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

SchoolGroupSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const SchoolGroup = mongoose.model("SchoolGroup", SchoolGroupSchema)
module.exports = SchoolGroup