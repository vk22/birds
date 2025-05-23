const express = require('express');
const router = express.Router();
const multer = require('multer');
const moveFile = require('move-file');
const fs = require('fs-extra');
const Category = require('../models/category-model');
const categoryControllers = require('../controllers/categoryControllers'); 
const appFolderUploads = require("../config/config").appFolderUploads['localhost'];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appFolderUploads)
  },
  filename: function (req, file, cb) {
    var filenameHandled = file.originalname.replace(/['" #]+/g, '_');
    cb(null, filenameHandled)
  }
})
 
const upload = multer({ storage: storage })


/// Create New Category  
router.post('/add-new-category', categoryControllers.addNewCategory)

/// Get All Category 
router.get('/lot-categories/', categoryControllers.getCategories)

/// Get One Category
router.get('/admin-get-category/:id', categoryControllers.getCategoryOne)

/// Edit Category
router.put('/category/:id', categoryControllers.editCategory)

/// File Upload 
router.post('/category-image-upload/:id', upload.array('files', 12), categoryControllers.uploadCategoryFiles)

/// Delete Category 
router.delete('/delete-categories/:id', categoryControllers.deleteCategory)


module.exports = router;