
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var LayoutPartitionSchema = new mongoose.Schema({
    part_number: { type: Number, required: true },
    layout_id: {
        type: mongoose.Types.ObjectId,
        refs: 'layouts',
        required: true
    },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, collection: "layout_partitions" });

LayoutPartitionSchema.plugin(uniqueValidator);

LayoutPartitionSchema.pre('find', function () {
    this.where({ isDeleted: false });
});

LayoutPartitionSchema.pre('findOne', function () {
    this.where({ isDeleted: false });
});

const LayoutPartition = mongoose.model("LayoutPartition", LayoutPartitionSchema)
module.exports = LayoutPartition