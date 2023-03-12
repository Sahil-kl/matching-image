
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var FormModuleSchema = new mongoose.Schema({
    module_name: { type: String, required: true },
}, { timestamps: true, collection: "form_modules" });

FormModuleSchema.plugin(uniqueValidator);


let FormModule = mongoose.model("FormModule", FormModuleSchema)
module.exports = FormModule