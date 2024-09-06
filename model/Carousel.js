
const mongoose = require("mongoose")

const carouselSchema = new mongoose.Schema({
    name: {
        type: String
    },
    link: {
        type: String
    },

}, { timestamps: true })

module.exports = mongoose.model("carousel", carouselSchema)