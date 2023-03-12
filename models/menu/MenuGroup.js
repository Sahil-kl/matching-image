
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var MenuGroupSchema = new mongoose.Schema({
    category_name: { type: String, required: true },
    category_slug: { type: String, required: true },
    category_icon: { type: String, required: true },
    is_active: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "menu_groups" });

MenuGroupSchema.plugin(uniqueValidator);

MenuGroupSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

MenuGroupSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

module.exports = mongoose.model("MenuGroup", MenuGroupSchema)