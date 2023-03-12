
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var DepartmentSchema = new mongoose.Schema({
    department_name: { type: String, required: true },
    academy_id: { type: String, required: true },
    lead_position_id: {
        type: mongoose.Types.ObjectId,
        ref: 'positions',
        required: true
    },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    po_box: { type: String, required: false },
    email: { type: String, required: false },
    logo: { type: String, required: false },
    company_id: {
        type: mongoose.Types.ObjectId,
        ref: 'companies',
        required: true
    }
}, { timestamps: true, collection: "departments" });

DepartmentSchema.plugin(uniqueValidator);

DepartmentSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

DepartmentSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

module.exports = mongoose.model("Departments", DepartmentSchema)