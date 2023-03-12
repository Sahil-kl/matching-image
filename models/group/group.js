
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    roles: [{
        type: mongoose.Types.ObjectId,
        ref: 'roles'
    }],
    isActive: { type: Boolean, defaults: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "groups" });

GroupSchema.plugin(uniqueValidator);

// GroupSchema.pre('find', function () {
//     this.where({ isDeleted: false });
// });

// GroupSchema.pre('findOne', function () {
//     this.where({ isDeleted: false });
// });

const Group = mongoose.model("Group", GroupSchema)
module.exports = Group