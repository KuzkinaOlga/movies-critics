const router = require("express").Router();
const blogControllers = require("../controllers/blogControllers");

router.post("/", blogControllers.addOne);
router.get("/", blogControllers.browse);

module.exports = router;
