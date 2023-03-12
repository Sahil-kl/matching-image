
const mongoose = require("mongoose");

var ImageVerificationSchema = new mongoose.Schema({
    original: { type: String, require: true },
    auth_part: { type: String, require: true },
    user_part: { type: String, require: true },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "image_verifications" });


ImageVerificationSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

ImageVerificationSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

let ImageVerification = mongoose.model("ImageVerification", ImageVerificationSchema)
module.exports = ImageVerification