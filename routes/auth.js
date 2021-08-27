const express = require("express");
const router = express.Router();
const {getAccessToRoute} = require('../middlewares/authorization/auth')
const profileImageUpload = require("../middlewares/libraries/profileImageUpload");

const{
    register,
    login,
    logout,
    imageUpload
}
=require("../controllers/auth")
router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.post("/upload",getAccessToRoute,profileImageUpload.single("profile_image"),imageUpload)


module.exports = router;