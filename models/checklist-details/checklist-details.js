
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var ChecklistDetailsSchema = new mongoose.Schema({
    checklist_question_id: { type: mongoose.Types.ObjectId, ref: 'venue_checklist_questions', required: true },
    venue_checklist_id: { type: mongoose.Types.ObjectId, ref: 'venue_checklists', required: true },
    comment: { type: String, required: false, default: null },
    is_checked: { type: Boolean, required: true },
    checked_at: { type: Date, required: false, default: null },
}, { timestamps: true, collection: "checklist_details" });

ChecklistDetailsSchema.plugin(uniqueValidator);

ChecklistDetailsSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

ChecklistDetailsSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const ChecklistDetails = mongoose.model("ChecklistDetails", ChecklistDetailsSchema)
module.exports = ChecklistDetails