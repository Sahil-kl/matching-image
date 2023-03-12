
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var SurfaceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "surfaces" });

SurfaceSchema.plugin(uniqueValidator);

SurfaceSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

SurfaceSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const Surface = mongoose.model("Surface", SurfaceSchema)
module.exports = Surface