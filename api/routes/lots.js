const express = require('express');
const router = express.Router();
const multer = require('multer');
const lotsControllers = require('../controllers/lotsControllers'); 
const lotFolderPath = require("../config/config").lotFolderPath;
const storageLot = multer.diskStorage({
  destination: function (req, file, cb) {
    const destination = lotFolderPath + req.params.id;
    cb(null, destination)
  },
  filename: function (req, file, cb) {
    const filenameHandled = file.originalname.replace(/['" #]+/g, '_');
    cb(null, filenameHandled)
  }
})
const upload = multer({ storage: storageLot })


/// Create New Lot 
router.post('/add-lot/', lotsControllers.addNewLot); 

/// Create Fakes Lot 
router.post('/add-fake-lots/', lotsControllers.createFakeLots); 

/// Get All Lots 
router.get('/lots/', lotsControllers.getLots); 

//// Edit Lot
router.put('/lot/:id', lotsControllers.editLot)

/// Delete Lots
router.delete('/delete-lots/', lotsControllers.deleteLots)

//// Remove Lot Files
router.post('/delete-lot-files/', lotsControllers.deleteLotFiles)

/// Lot Upload 
router.post('/files-lot-upload/:id', upload.array('files', 12), lotsControllers.uploadLotFiles) 

/// Get One Lot Admin
router.get('/admin-get-one-lot/:id', lotsControllers.getOneLot)



module.exports = router;