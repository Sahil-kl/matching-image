
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var UserDocumentSchema = new mongoose.Schema({
    document_id: {
        type: mongoose.Types.ObjectId,
        refs: 'documents',
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        refs: 'users',
        required: true
    },
    file: { type: String, required: true },
    issue_date: { type: Date, required: false, default: null },
    expiry_date: { type: Date, required: false, default: null },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "user_documents" });

UserDocumentSchema.plugin(uniqueValidator);

UserDocumentSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

UserDocumentSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const UserDocument = mongoose.model("UserDocument", UserDocumentSchema)
module.exports = UserDocument






