
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var StateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    state_code: { type: String, required: true },
    country_id: {
        type: mongoose.Types.ObjectId,
        refs: 'countries',
        required: true
    },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "states" });

StateSchema.plugin(uniqueValidator);

StateSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

StateSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

module.exports = mongoose.model("State", StateSchema)