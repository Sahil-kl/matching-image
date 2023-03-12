const mongoose = require("mongoose");

var uniqueValidator = require('mongoose-unique-validator');


var UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true, index: true },
    last_name: { type: String, required: false, index: true },
    email: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: false, default: null },
    // academy_id: { type: mongoose.Types.ObjectId, ref: 'academies', required: false },
    company_id: { type: mongoose.Types.ObjectId, ref: 'companies', required: false, default: null },
    role: { type: String, required: false, default: null },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "users" });

UserSchema.plugin(uniqueValidator);


UserSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

UserSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});


const User = mongoose.model("User", UserSchema)
module.exports = User