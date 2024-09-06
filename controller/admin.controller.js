const asyncHanlder = require("express-async-handler")
const { checkEmpty } = require("../utils/cheackEmpty")
const Technology = require("../model/Technology")
const Social = require("../model/Social")
const Carousel = require("../model/Carousel")

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


//add carousel
exports.getAllCarousel = asyncHanlder(async (req, res) => {
    const result = await Carousel.find()
    res.status(200).json({ message: "blog fetch success", result })
})
exports.addCarousel = asyncHanlder(async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            res.status(400).json({ message: "multer error" })
        }
        await Carousel.create({ ...req.body, hero: req.file.filename })
        res.status(201).json({ message: "blog create succes" })
    })
})
exports.updateCarousel = asyncHanlder(async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            return res.status(400).json({ message: "multer error" })
        }
        const { id } = req.params
        if (req.body.remove) {

            fs.unlinkSync(path.join(__dirname, "..", "uploads", req.body.remove))
            await Carousel.findByIdAndUpdate(id, ({ ...req.body, hero: req.file.filename }))

            res.status(200).json({ message: "blog update success" })
        } else {

            await Carousel.findByIdAndUpdate(id, req.body)
            res.status(200).json({ message: "blog update success" })

        }

    })
})
exports.deleteCarousel = asyncHanlder(async (req, res) => {
    const { id } = req.params
    const result = await Carousel.findById(id)
    fs.unlinkSync(path.join(__dirname, "..", "uploads", result.hero))
    await Carousel.findByIdAndDelete(id)
    res.status(200).json({ message: "blog delete success" })
})