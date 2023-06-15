const router = require("express").Router();
const userControllers = require("../controllers/userControllers");
const { verifyPassword } = require("../utils/auth");

router.post("/", userControllers.getUserByMailToNext, verifyPassword);

module.exports = router;
