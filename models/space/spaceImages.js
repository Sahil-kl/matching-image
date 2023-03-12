
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var SpaceImageSchema = new mongoose.Schema({
    file: { type: String, required: true },
    space_id: {
        type: mongoose.Types.ObjectId,
        refs: 'spaces',
        required: true
    },
}, { timestamps: true, collection: "space_images" });

SpaceImageSchema.plugin(uniqueValidator);

SpaceImageSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

SpaceImageSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const SpaceImage = mongoose.model("SpaceImage", SpaceImageSchema)
module.exports = SpaceImage