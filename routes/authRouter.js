const Router = require("express")
const router = new Router()
const controller = require("../controller/authController")
const {check} = require("express-validator")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/registration",[
    check("username","имя пользователя не может быть пустым").notEmpty().custom(value => !/\s/.test(value)),
    check("password","пароль должен состоять меньше 4 символов больше 8 символов").isLength({min:4,max:8})
],controller.registration)
router.post("/login",controller.login)
router.get("/users",authMiddleware,controller.getUsers)

module.exports = router;