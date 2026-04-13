const { register, login, protectAuth, isAuth, updateProfile, logout } = require("../controllers/user.controller");
const { upload } = require("../methods/multer");

const authRouter = require("express").Router();
authRouter.route("/register").post(register)
authRouter.route("/login").post(login)
authRouter.route("/is_auth").get(protectAuth,isAuth)
authRouter.route("/update-profile").post(protectAuth,upload.single("image"),updateProfile)
authRouter.route("/logout").get(protectAuth,logout)
module.exports = {
    authRouter
}
