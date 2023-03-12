
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var AmenitySchema = new mongoose.Schema({
    amenity_name: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    company_id: {
        type: mongoose.Types.ObjectId,
        ref: 'companies',
        required: true
    },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "amenities" });

AmenitySchema.plugin(uniqueValidator);

AmenitySchema.pre('find', function () {
    this.where({ isDeleted: false });
});

AmenitySchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

module.exports = mongoose.model("Amenity", AmenitySchema)