
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var AcademyDocumentSchema = new mongoose.Schema({
    document_id: {
        type: mongoose.Types.ObjectId,
        refs: 'documents',
        required: true
    },
    academy_id: {
        type: mongoose.Types.ObjectId,
        refs: 'academies',
        required: true
    },
    file: { type: String, required: true },
    issue_date: { type: Date, required: false, default: null },
    expiry_date: { type: Date, required: false, default: null },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "user_documents" });

AcademyDocumentSchema.plugin(uniqueValidator);

AcademyDocumentSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

AcademyDocumentSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const AcademyDocument = mongoose.model("AcademyDocument", AcademyDocumentSchema)
module.exports = AcademyDocument






