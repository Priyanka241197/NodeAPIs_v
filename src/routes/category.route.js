const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller')
const multer = require('multer');
const { uploadFile } = require("../../middlewares/upload-middleware")
let upload = multer({ storage: uploadFile.storage})
const { verifyToken } = require("../../middlewares/globle");

router.post('/',verifyToken,upload.any('file'),categoryController.addCategory);
router.get('/',verifyToken,categoryController.getAllCategory);
router.put('/',verifyToken,upload.any('file'),categoryController.updateCategory);
router.post('/delete',verifyToken,categoryController.deleteCategory);


module.exports = router;
