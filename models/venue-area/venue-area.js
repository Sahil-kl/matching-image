
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var VenueAreaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "venue_areas" });

VenueAreaSchema.plugin(uniqueValidator);

VenueAreaSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

VenueAreaSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const VenueArea = mongoose.model("VenueArea", VenueAreaSchema)
module.exports = VenueArea