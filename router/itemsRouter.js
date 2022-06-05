const express = require("express");
const {
	createItems,
	getItems,
	getSingleItems,
	searchItems,
	updateItems,
	deleteItems,
	getSingleAllItems,
} = require("../controller/itemController");
const verify = require("../utils/verified");
const { image } = require('../utils/multer');
const router = express.Router();

router.route("/:id/post").post(image, createItems);
router.route("/:id/:item").patch(updateItems);
router.route("/:id/:item").delete(deleteItems);
router.route("/all").get(getItems);
router.route("/search").get(searchItems);
router.route("/:id/:item").get(getSingleItems);
router.route("/:id").get(getSingleAllItems);

module.exports = router;
