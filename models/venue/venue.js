const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var VenueSchema = new mongoose.Schema({
    venue_name: {
        type: String,
        required: true
    },
    venue_code: {
        type: String,
        required: true
    },
    adult_fr_name: {
        type: String,
        required: true
    },
    school_group: {
        type: String,
        required: false,
        default: null
    },
    relationship_manager: {
        type: String,
        required: true
    },
    relationship_manager_contact: {
        type: String,
        required: false,
        default: null
    },
    facility_supervisor: {
        type: String,
        required: false,
        default: null
    },
    facility_supervisor_contact: {
        type: String,
        required: false,
        default: null
    },
    area: {
        type: String,
        required: false,
        default: null
    },
    address: {
        type: String,
        required: false,
        default: null
    },
    main_locality: {
        type: String,
        required: false,
        default: null
    },
    localities: {
        type: String,
        required: false,
        default: null
    },
    landmark: {
        type: String,
        required: false,
        default: null
    },
    lat: {
        type: Number,
        required: false,
        default: null
    },
    long: {
        type: Number,
        required: false,
        default: null
    },
    fso_contact_name: {
        type: String,
        required: true
    },
    fso_contact_email: {
        type: String,
        required: true
    },
    fso_password: {
        type: String,
        required: true
    },
    fso_contact_number: {
        type: String,
        required: false,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, collection: "venues" });

VenueSchema.plugin(uniqueValidator);

// VenueSchema.pre('find', function () {
//     this.where({ isDeleted: false });
// });

// VenueSchema.pre('findOne', function () {
//     this.where({ isDeleted: false });
// });

const Venue = mongoose.model("Venue", VenueSchema)
module.exports  = Venue