
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var JobTypesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company_id: {
        type: mongoose.Types.ObjectId,
        ref: 'companies',
        required: true
    },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "job_types" });

JobTypesSchema.plugin(uniqueValidator);

JobTypesSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

JobTypesSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

module.exports = mongoose.model("JobTypes", JobTypesSchema)