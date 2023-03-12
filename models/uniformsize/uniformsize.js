
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var UniformsizeSchema = new mongoose.Schema({
    size: { type: String, required: true },
    size_image: { type: String, required: true },
    type: { type: String, required: true },
    is_active: { type: Boolean, default: false },
    company_id: {
        type: mongoose.Types.ObjectId,
        refs: 'companies',
        required: true
    },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "uniformsizes" });

UniformsizeSchema.plugin(uniqueValidator);

UniformsizeSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

UniformsizeSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

module.exports = mongoose.model("Uniformsize", UniformsizeSchema)