const express = require('express');
const router = express.Router();
const multer = require('multer');
const moveFile = require('move-file');
const fs = require('fs-extra');
const Slider = require('../models/slider-model');

//const sliderFolderPath = '/var/www/neva/www/static/uploads/slider/';
const sliderFolderPath = '/var/www/birds/www/static/uploads/slider/';
//const sliderFolderPath = '/Users/viktorkusnir/birds/static/uploads/slider/';

//var async = require("async");


/// Get All Posts ////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/slider-data/', (req, res) => {
    try {
    //var token = getToken(req.headers);
    var token = '99999';
    let lots = []
  
    if (token) {
      Slider.find({}, (err, slider) => {
        if (err) {
          res.sendStatus(500)
        } else {
          // console.log('slider ', slider)
          res.send( {
            success: true, 
            slider: slider[0],
          })
        }
      }).sort({ _id: 1 })
  
      } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'});
      }
  
      } catch (err) {
        next(err);
      }
  
  })


/// Create New Slider  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/add-slider', (req, res) => {
  
  var lastPostNum;
  var newContact = req.body;
  newPost.order = 0;

  Slider.find({}, (err, sliders) => {
    if (err) {
      res.sendStatus(500)
    } else {

      const slider = new Slider(newContact)
    
      slider.save((err, data) => {
        if (err) {
          console.log(err)
          res.send({
            success: false,
            message: `slider not saved! Maybe duplicate title error...`
          })
        } else {

          res.send({
            success: true,
            message: `slider with ID_${data._id} saved successfully!`,
            postNum: data.post_num
          })
        }
      })
      
    }
  }).sort({ _id: -1 })

})

/// Get One Contact Admin////////////////////////////////////////////////////////////////////////////////////////////////////////////

// router.get('/admin-get-slider/:id', (req, res) => {

//   console.log ('req.params.id: '+req.params.id);
//   var token = '99999';
//   if (token) {
//     Slider.findById(req.params.id, (err, slider) => {
//       if (err) {
//         res.sendStatus(500)
//       } else {
//         res.send({success: true, slider: slider})
//       }
//     })
//   } else {
//     return res.status(403).send({success: false, msg: 'Unauthorized'});
//   }
// })


router.put('/slider/:id', (req, res) => {

  console.log('edit: '+JSON.stringify(req.body));

  Slider.findById(req.params.id, (err, slider) => {
    if (err) {
      console.log(err)
    } else {
      if (req.body.mainPhrase) {
        slider.mainPhrase = req.body.mainPhrase
      }
      if (req.body.phrases) {
        slider.phrases = req.body.phrases
      }
      if (req.body.imageBackground) {
        slider.imageBackground = req.body.imageBackground
      }

      slider.save((err, data) => {
        if (err) {
          console.log(err)
          res.send({
            success: false,
            message: `Slider not saved!`
          })
        } else {
          res.send({
            success: true,
            message: `Slider with ID_${data._id} saved saved!`,
          })
        }
      })


    }
  })
})

/// File Upload ////////////////////////////////////////////////////////////////////////////////////////////////////////////


// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var projectID = req.params.id;
    cb(null, sliderFolderPath)
  },
  filename: function (req, file, cb) {
    var filenameHandled = file.originalname.replace(/['" #]+/g, '_');
    cb(null, filenameHandled)
  }
})
 
var upload = multer({ storage: storage })

router.post('/slider-image-upload/:id', upload.array('files', 12), (req, res, next) => {
  const files = req.files
  console.log('req.body: '+JSON.stringify(req.body));
  console.log('files: '+JSON.stringify(files));
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    res.json({
      success: false,
      message: `Error upload!`
    })
  }
 
  res.json({
    success: true,
    message: `Pictures uploaded!`
  })
  
})


/// Delete Slider ////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.delete('/delete-slider/:id', (req, res) => {

  Slider.remove({ _id: req.params.id }, err => {
    if (err) {
      res.sendStatus(500)  
    } else {
      res.sendStatus(200)
    }
  })
})

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;