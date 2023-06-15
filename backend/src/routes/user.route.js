const router = require("express").Router();
const userControllers = require("../controllers/userControllers");

router.get("/", userControllers.browse);
router.post("/", userControllers.addOne);
router.put("/:id", userControllers.edit);
router.delete("/:id", userControllers.destroy);

module.exports = router;
