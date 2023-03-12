
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var LocalitySchema = new mongoose.Schema({
    locality_name: { type: String, required: true },
    state_id: {
        type: mongoose.Types.ObjectId,
        refs: 'states',
        required: true
    },
    country_id: {
        type: mongoose.Types.ObjectId,
        refs: 'countries',
        required: true
    },
    company_id: {
        type: mongoose.Types.ObjectId,
        refs: 'companies',
        required: true
    },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "localities" });

LocalitySchema.plugin(uniqueValidator);

LocalitySchema.pre('find', function () {
    this.where({ isDeleted: false });
});

LocalitySchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

module.exports = mongoose.model("Locality", LocalitySchema)