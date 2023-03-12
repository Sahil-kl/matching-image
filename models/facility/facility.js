
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var FacilitySchema = new mongoose.Schema({
    venue_id: {
        type: mongoose.Types.ObjectId,
        refs: 'venues',
        required: true
    },
    space_id: {
        type: mongoose.Types.ObjectId,
        refs: 'spaces',
        required: true
    },
    surface_id: {
        type: mongoose.Types.ObjectId,
        refs: 'surfaces',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    hourly_rate: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: false,
        default: null
    },
    width: {
        type: Number,
        required: false,
        default: null
    },
    maximum_player_limit: {
        type: Number,
        required: true
    },
    activities: {
        type: [mongoose.Types.ObjectId],
        refs: 'activities',
        required: true
    },
    layout_partitions: {
        type: [mongoose.Types.ObjectId],
        refs: 'layout_partitions',
        required: true
    },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "facilities" });

FacilitySchema.plugin(uniqueValidator);

FacilitySchema.pre('find', function () {
    this.where({ isDeleted: false });
});

FacilitySchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const Facility = mongoose.model("Facility", FacilitySchema)
module.exports = Facility