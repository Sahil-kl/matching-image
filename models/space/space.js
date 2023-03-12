
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var SpaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    layout_id: {
        type: mongoose.Types.ObjectId,
        refs: 'layouts',
        required: true
    },
    venue_id: {
        type: mongoose.Types.ObjectId,
        refs: 'venues',
        required: true
    },
    adult_fr_name: { type: String, required: false, default: null },

}, { timestamps: true, collection: "spaces" });

SpaceSchema.plugin(uniqueValidator);

SpaceSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

SpaceSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const Space = mongoose.model("Space", SpaceSchema)
module.exports = Space