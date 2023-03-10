const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/dashboardController");
const authController = require("../controller/authController");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");


router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname, "public")));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
    storage:storage
})

router.post('/importStudent',upload.single('file'),dashboardController.importStudent);
router.get("/exportStudent", dashboardController.exportStudent);

module.exports = router;
