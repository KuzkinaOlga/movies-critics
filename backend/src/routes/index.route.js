const router = require("express").Router();
const user = require("./user.route");
const login = require("./login.route");

router.use("/login", login);
router.use("/users", user);

module.exports = router;
