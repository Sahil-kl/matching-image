
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var VenueChecklistQuestionsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    checklist_type: { type: String, enum: ['Opening', 'Closing'], required: true },
    checklist_category: { type: String, enum: ['Normal'], required: true },
    is_active: { type: String, required: false, default: true },
    company_id: { type: mongoose.Types.ObjectId, ref: 'companies', required: true },
}, { timestamps: true, collection: "venue_checklist_questions" });

VenueChecklistQuestionsSchema.plugin(uniqueValidator);

VenueChecklistQuestionsSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

VenueChecklistQuestionsSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

module.exports = mongoose.model("VenueChecklistQuestions", VenueChecklistQuestionsSchema)