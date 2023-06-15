const router = require("express").Router();
const user = require("./user.route");
const login = require("./login.route");
const blog = require("./blog.route");

router.use("/login", login);
router.use("/users", user);

router.use("/blogs", blog);

module.exports = router;
