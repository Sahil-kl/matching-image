
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var VenueChecklistSchema = new mongoose.Schema({
    venue_id: { type: mongoose.Types.ObjectId, ref: 'venues', required: true },
    company_id: { type: mongoose.Types.ObjectId, ref: 'companies', required: true },
    file: { type: Date, required: false, default: null },
    checklist_session: { type: String, enum: ['AM', 'PM'], required: true },
    checklist_type: { type: String, enum: ['Opening', 'Closing'], required: true },
    remarks: { type: String, required: false, default: null },
    is_submitted: { type: Boolean, require: false, default: false },
    created_by: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    updated_by: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    submitted_by: { type: mongoose.Types.ObjectId, ref: 'users', required: false, default: null },
    submitted_at: { type: Date, required: false, default: null },
}, { timestamps: true, collection: "venue_checklists" });

VenueChecklistSchema.plugin(uniqueValidator);

VenueChecklistSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

VenueChecklistSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const VenueChecklist = mongoose.model("VenueChecklist", VenueChecklistSchema)
module.exports = VenueChecklist