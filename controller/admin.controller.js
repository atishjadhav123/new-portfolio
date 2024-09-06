const asyncHanlder = require("express-async-handler")
const { checkEmpty } = require("../utils/cheackEmpty")
const Technology = require("../model/Technology")
const Social = require("../model/Social")

exports.addTechnology = asyncHanlder(async (req, res) => {

    const { name, category } = req.body
    const { isError, error } = checkEmpty({ name, category })
    if (isError) {
        return res.json(400).json({ message: "All Filed Required", error })
    }
    await Technology.create({ name, category })
    res.json({ message: "Technology Create Success" })
})

exports.getTechnology = asyncHanlder(async (req, res) => {
    const result = await Technology.find()
    res.json({ message: "Technology Fetch Success", result })
})
exports.updateTechnology = asyncHanlder(async (req, res) => {
    const { id } = req.params
    await Technology.findByIdAndUpdate(id, req.body)
    res.json({ message: "Technology Update Success" })
})
exports.deleteTechnology = asyncHanlder(async (req, res) => {
    const { id } = req.params
    await Technology.findByIdAndDelete(id)
    res.json({ message: "Technology Delete Success" })

})

//addSocial
exports.addSocial = asyncHanlder(async (req, res) => {

    const { name, link } = req.body
    const { isError, error } = checkEmpty({ name, link })
    if (isError) {
        return res.json(400).json({ message: "All Filed Required", error })
    }
    await Social.create({ name, link })
    res.json({ message: "Social Create Success" })
})
//getSocial
exports.getSocial = asyncHanlder(async (req, res) => {
    const result = await Social.find()
    res.json({ message: "Social Fetch Success", result })
})
//updateSocial
exports.updateSocial = asyncHanlder(async (req, res) => {
    const { id } = req.params
    await Social.findByIdAndUpdate(id, req.body)
    res.json({ message: "Social Update Success" })
})
//delteSocial
exports.deleteSocial = asyncHanlder(async (req, res) => {
    const { id } = req.params
    await Social.findByIdAndDelete(id)
    res.json({ message: "Social Delete Success" })

})