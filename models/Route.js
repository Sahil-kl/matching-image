const mongoose = require("mongoose");

var uniqueValidator = require('mongoose-unique-validator');


let RouteSchema = new mongoose.Schema({
    method: { type: String, required: true },
    url: { type: String, required: true },
    module: { type: String, required: true },
    operation: { type: String, required: true },
    isDeleted: { type: Boolean, defaults: false }
}, { timestamps: true, collection: "permissions" });

RouteSchema.plugin(uniqueValidator);


RouteSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

RouteSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

let Route = mongoose.model("Route", RouteSchema)
module.exports = Route