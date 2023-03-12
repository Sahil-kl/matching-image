
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var UserDetailSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    }, field_name: {
        type: String,
        required: true,
    }, field_value: {
        type: String,
        required: true,
    }
}, { timestamps: true, collection: "user_details" });

UserDetailSchema.plugin(uniqueValidator);


let UserDetail = mongoose.model("UserDetail", UserDetailSchema)
module.exports = UserDetail