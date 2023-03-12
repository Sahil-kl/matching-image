
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var MenuSchema = new mongoose.Schema({
    menu_title: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, required: true },
    category_id: {
        type: mongoose.Types.ObjectId,
        refs: 'menu_groups',
        required: true
    },
    menu_parent_id: {
        type: mongoose.Types.ObjectId,
        refs: 'menus',
        required: false
    },
    is_active: { type: Boolean, default: false },
    is_quick_link: { type: Boolean, default: false },
    order_no: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "menus" });

MenuSchema.plugin(uniqueValidator);

MenuSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

MenuSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

module.exports = mongoose.model("Menu", MenuSchema)