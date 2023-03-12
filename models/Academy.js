const mongoose = require("mongoose");

var uniqueValidator = require('mongoose-unique-validator');

var AcademySchema = new mongoose.Schema({
    trading_name: {
        type: String,
        required: true
    },
    ded_trade_name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false,
        default: ""
    },
    aproved_activities: {
        type: Array,
        required: false,
        default: null
    },
    sub_categories: {
        type: Array,
        required: false,
        default: null
    },
    start_date: {
        type: Date,
        required: false,
        default: null,
    },
    address: {
        type: String,
        required: false
    },
    main_office_area: {
        type: String,
        required: true
    },
    operating_areas: {
        type: Array,
        required: true
    },
    contact_phone: {
        type: String,
        required: false,
        default: ""
    },
    locality: {
        type: String,
        required: false,
        default: null
    },
    owner_md: {
        type: String
    },
    manager: {
        type: String,
        required: false,
        default: null
    },
    technical_director: {
        type: String,
        required: false,
        default: null
    },
    head_coach: {
        type: String,
        required: false,
        default: null
    },
    website: {
        type: String,
        required: false,
        default: null
    },
    facebook: {
        type: String,
        required: false,
        default: null
    },
    instagram: {
        type: String,
        required: false,
        default: null
    },
    twitter: {
        type: String,
        required: false,
        default: null
    },
    tiktok: {
        type: String,
        required: false,
        default: null
    },
    is_fm_access: {
        type: Boolean,
        required: false,
        default: false
    },
    is_operation_enabled: {
        type: String,
        required: false,
        default: false
    },
    instagram: {
        type: String,
        required: false,
        default: null
    },
    academy_admin: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    company_id: {
        type: mongoose.Types.ObjectId,
        ref: 'companies',
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, collection: "academies" });

AcademySchema.plugin(uniqueValidator);


AcademySchema.pre('find', function () {
    this.where({ isDeleted: false });
});

AcademySchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

let Academy = mongoose.model("Academy", AcademySchema)
module.exports = Academy