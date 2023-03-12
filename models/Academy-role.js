const mongoose = require("mongoose");

var uniqueValidator = require('mongoose-unique-validator');


let AcademyRoleSchema = new mongoose.Schema({
    academy_id: { type: mongoose.Types.ObjectId, ref: 'academies', required: true },
    user_id: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    role: { type: String, required: true },
    is_blocked: { type: Boolean, default: false },
    is_default: { type: Boolean, default: true },
    isDeleted: { type: Boolean, defaults: false }
}, { timestamps: true, collection: "academy_roles" });

AcademyRoleSchema.plugin(uniqueValidator);


AcademyRoleSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

AcademyRoleSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

let AcademyRole = mongoose.model("AcademyRole", AcademyRoleSchema)
module.exports = AcademyRole