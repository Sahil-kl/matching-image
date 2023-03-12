
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var FormFieldSchema = new mongoose.Schema({
    field_name: { type: String, required: true },
    field_type: { type: String, required: true },
    is_madatory: { type: Boolean, required: true },
    form_module_section_id: {
        type: mongoose.Types.ObjectId,
        refs: 'form_modules_sections',
        required: true
    },
    options: { type: JSON, required: false },

}, { timestamps: true, collection: "form_fields" });

FormFieldSchema.plugin(uniqueValidator);


let FormField = mongoose.model("FormField", FormFieldSchema)
module.exports = FormField