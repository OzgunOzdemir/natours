const express = require("express");
const userRouter = require("../controllers/userController");
const authRouter = require("../controllers/authController");
const router = express.Router();

router.post('/signup', authRouter.signup)

router.route("/").get(userRouter.getAllUsers).post(userRouter.createUser);

router.route("/:id").get(userRouter.getUser).patch(userRouter.updateUser).delete(userRouter.deleteUser);

module.exports = router;
