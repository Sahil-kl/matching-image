
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var PositionSchema = new mongoose.Schema({
    position_name: { type: String, required: true },
    job_type_id: {
        type: mongoose.Types.ObjectId,
        refs: 'job_types',
        required: true
    },
    company_id: {
        type: mongoose.Types.ObjectId,
        ref: 'companies',
        required: true
    }
}, { timestamps: true, collection: "positions" });

PositionSchema.plugin(uniqueValidator);

PositionSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

PositionSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

module.exports = mongoose.model("Positions", PositionSchema)