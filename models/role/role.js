
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var RoleSchema = new mongoose.Schema({

    name: { 
        type: String,
        required: true,
    },
    permissions: [{ 
        type: mongoose.Types.ObjectId, 
        ref: 'routes' 
    }]
}, 
{ 
    timestamps: true,
    collection: "roles"
});

RoleSchema.plugin(uniqueValidator);

let Role = mongoose.model("Role", RoleSchema)
module.exports = Role