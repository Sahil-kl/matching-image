
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var DocumentSchema = new mongoose.Schema({
    document_name: { type: String, required: true },
    document_type: { type: String, enum: ['sla', 'company', 'nop', 'compliance'], required: true },
    is_acdemy_doc: { type: Boolean, required: true },
    is_user_doc: { type: Boolean, required: true },
    is_required: { type: Boolean, required: true },
    has_issue_date: { type: Boolean, required: true },
    has_expiry_date: { type: Boolean, required: true },
    company_id: {
        type: mongoose.Types.ObjectId,
        refs: 'companies',
        required: true
    },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "documents" });

DocumentSchema.plugin(uniqueValidator);

DocumentSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

DocumentSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const Document = mongoose.model("Document", DocumentSchema)
module.exports = Document






