
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var FormModulesSectionSchema = new mongoose.Schema({
    section_name: { type: String, required: true },
    module_id: {
        type: mongoose.Types.ObjectId,
        refs: 'form_modules',
        required: true
    },
}, { timestamps: true, collection: "form_modules_sections" });

FormModulesSectionSchema.plugin(uniqueValidator);


let FormModulesSection = mongoose.model("FormModulesSection", FormModulesSectionSchema)
module.exports = FormModulesSection