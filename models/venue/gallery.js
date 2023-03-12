const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const AWS = require('aws-sdk')
require('dotenv').config()
var VenueGallerySchema = new mongoose.Schema({
    file: {
        field: 'file',
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    venue_id: {
        type: mongoose.Types.ObjectId,
        refs: 'venues',
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        refs: 'users',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, collection: "venue_galleries" });

VenueGallerySchema.plugin(uniqueValidator);

VenueGallerySchema.pre('find', function () {
    this.where({ isDeleted: false });
    //     let data = this.getUpdate()
    //     AWS.config = new AWS.Config({
    //         accessKeyId: process.env.AWS_S3_KEY,
    //         secretAccessKey: process.env.AWS_S3_SECRET,
    //         region: process.env.AWS_REGION,
    //         signatureVersion: "v4",
    //     });

    //     let signedUrl = '';

    //     const s3 = new AWS.S3();
    //     if (data.file) {
    //         signedUrl = s3.getSignedUrl("getObject", {
    //             Key: data.file,
    //             Bucket: process.env.AWS_BUCKET,
    //             Expires: 9999,
    //         });
    //     }

    //     data.file = signedUrl
});

VenueGallerySchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const VenueGallery = mongoose.model("VenueGallery", VenueGallerySchema)
module.exports = VenueGallery