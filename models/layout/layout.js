
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var LayoutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    length: { type: Number, required: true },
    height: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "layouts" });

LayoutSchema.plugin(uniqueValidator);

LayoutSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

LayoutSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const Layout = mongoose.model("Layout", LayoutSchema)
module.exports = Layout