const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controller');
const { verifyToken } = require("../../middlewares/globle");

router.post('/',verifyToken,brandController.addBrand);
router.get('/',verifyToken,brandController.getAllBrand);

module.exports = router;
