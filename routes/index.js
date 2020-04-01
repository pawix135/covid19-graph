var express = require("express");
var router = express.Router();

const indexController = require("../controller/indexController");

/* GET home page. */
router.get("/", indexController.home);
router.get("/getdata", indexController.getData);
router.get("/getcountires", indexController.updateCountries);

module.exports = router;
