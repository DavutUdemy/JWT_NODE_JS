const express = require("express");
const router = express.Router();
const {getAccessToRoute} = require('../middlewares/authorization/auth')
const{
    register,
    login,
    logout
}
=require("../controllers/auth")
router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);


module.exports = router;