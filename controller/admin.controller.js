const asyncHanlder = require("express-async-handler")
const { checkEmpty } = require("../utils/cheackEmpty")
const Technology = require("../model/Technology")
const Social = require("../model/Social")
const Carousel = require("../model/Carousel")
const cloudinary = require("../utils/cloudinaryconfig")
const upload = require("../utils/uploads")
// const upload = require("../utils/uploads")

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


exports.getAllCarousel = asyncHanlder(async (req, res) => {
    const result = await Carousel.find()
    res.status(200).json({ message: "blog fetch success", result })
})

exports.addCarousel = asyncHanlder(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "upload Error", error: err.message });
        }

        const { caption } = req.body;
        const { isError, error } = checkEmpty({ caption });
        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Hero Image Is Required" });
        }

        const { secure_url } = await cloudinary.uploader.upload(req.file.path);
        const result = await Carousel.create({ ...req.body, hero: secure_url });
        res.json({ message: "Carousel Add Success", result });
    });
});




exports.updateCarousel = asyncHanlder(async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            return res.status(400).json({ message: "multer error" })
        }
        const { id } = req.params
        if (req.file) {
            const result = await Carousel.findById(id)
            await cloudinary.uploader.destroy(path.basename(result.hero))
            const { secure_url } = await cloudinary.uploader.uplo(req.file.path)
            await Carousel.findByIdAndUpdate(id, { caption: req.body.caption, hero: secure_url })
            res.json({ message: "Carousel update success" })
        } else {
            await Carousel.findByIdAndUpdate(id, { caption: req.body.caption })
            res.json({ message: "Carousel update success" })
        }

    })
})


exports.deleteCarousel = asyncHanlder(async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Carousel.findById(id);

        if (!result) {
            return res.status(404).json({ message: 'Carousel not found' });
        }

        // Extract the public_id from the Cloudinary URL
        const publicId = result.hero.split('/').pop().split('.')[0];

        // Delete the image from Cloudinary
        const cloudinaryResult = await cloudinary.uploader.destroy(publicId);

        if (cloudinaryResult.result !== 'ok') {
            return res.status(400).json({ message: 'Cloudinary deletion failed' });
        }

        // Delete the carousel from the database
        await result.deleteOne();

        res.json({ message: 'Carousel deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});