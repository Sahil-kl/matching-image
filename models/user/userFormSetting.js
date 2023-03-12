
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var UserFormSettingSchema = new mongoose.Schema({
    company_id: {
        type: mongoose.Types.ObjectId,
        ref: 'companies',
        required: true
    }, module_id: {
        type: mongoose.Types.ObjectId,
        refs: 'form_modules',
        required: true
    }, section_id: {
        type: mongoose.Types.ObjectId,
        refs: 'form_modules_sections',
        required: true
    }, field_id: {
        type: mongoose.Types.ObjectId,
        ref: 'companies',
        required: true
    },
    field_type: {
        type: String,
        required: true
    },
    field_name: {
        type: String,
        required: true
    },
    is_madatory: {
        type: Boolean,
        required: true
    },
    options: {
        type: Array
    }
}, { timestamps: true, collection: "user_form_settings" });

UserFormSettingSchema.plugin(uniqueValidator);


let UserSetting = mongoose.model("UserFormSetting", UserFormSettingSchema)
module.exports = UserSetting