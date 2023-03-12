
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var CompanySchema = new mongoose.Schema({
    company_name: { type: String, required: true },
    main_office_address: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    md_name: { type: String, required: false, default: null },
    md_email: { type: String, required: true },
    trade_license_number: { type: String, required: true },
    logo: { type: String, required: false, default: null },
    latitude: { type: String, required: false, default: null },
    latitude: { type: String, required: false, default: null },
    user_id: {
        type: mongoose.Types.ObjectId,
        refs: 'users',
        required: true
    },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "companies" });

CompanySchema.plugin(uniqueValidator);

CompanySchema.pre('find', function () {
    this.where({ isDeleted: false });
});

CompanySchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const Company = mongoose.model("Company", CompanySchema)
module.exports = Company