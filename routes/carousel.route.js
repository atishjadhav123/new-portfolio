const adminController = require("../controller/admin.controller")

const router = require("express").Router()

router

    .post("/addcarousel", adminController.getAllCarousel)
    .get("/getcarousel", adminController.addCarousel)
    .put("/update-carousel/:id", adminController.updateCarousel)
    .delete("/delete-carousel/:id", adminController.deleteCarousel)

module.exports = router