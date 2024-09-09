const adminController = require("../controller/admin.controller")

const router = require("express").Router()

router

    .get("/getcarousel", adminController.getAllCarousel)
    .post("/addcarousel", adminController.addCarousel)
    .put("/update-carousel/:id", adminController.updateCarousel)
    .delete("/delete-carousel/:id", adminController.deleteCarousel)

module.exports = router