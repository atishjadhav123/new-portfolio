const adminController = require("../controller/admin.controller")

const router = require("express").Router()

router

    .post("/addsocial", adminController.addSocial)
    .get("/getsocial", adminController.getSocial)
    .put("/update-social/:id", adminController.updateSocial)
    .delete("/delete-social/:id", adminController.deleteSocial)

module.exports = router