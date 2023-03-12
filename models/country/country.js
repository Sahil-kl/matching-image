
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var CountrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    phone_code: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "countries" });

CountrySchema.plugin(uniqueValidator);

CountrySchema.pre('find', function () {
    this.where({ isDeleted: false });
});

CountrySchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

module.exports = mongoose.model("Country", CountrySchema)