const express = require('express');
const router = express.Router();
const multer = require('multer');
const moveFile = require('move-file');
const fs = require('fs-extra');
const About = require('../models/about-model');

//const aboutFolderPath = '/var/www/birds/www/static/uploads/about/';
const aboutFolderPath = '/Users/viktorkusnir/apps/birds/static/uploads/about/';

//var async = require("async");


/// Get About ////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/about-data/', (req, res) => {
    try {
    //var token = getToken(req.headers);
    var token = '99999';
    let lots = []
  
    if (token) {
      About.find({}, (err, about) => {
        if (err) {
          res.sendStatus(500)
        } else {
          // console.log('about ', about)
          res.send( {
            success: true, 
            about: about[0],
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


/// Create New About  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/add-about', (req, res) => {
  
  const newData = req.body;
  console.log('newData ', newData)

  About.find({}, (err, abouts) => {
    if (err) {
      res.sendStatus(500)
    } else {

      const about = new About(newData)
    
      about.save((err, data) => {
        if (err) {
          console.log(err)
          res.send({
            success: false,
            message: `about not saved! Maybe duplicate title error...`
          })
        } else {

          res.send({
            success: true,
            message: `about with ID_${data._id} saved successfully!`,
            postNum: data.post_num
          })
        }
      })
      
    }
  }).sort({ _id: -1 })

})

/// Edit About ////////////////////////////////////////////////////////////////////////////////////////////////////////////


router.put('/about/:id', (req, res) => {

  console.log('edit: '+JSON.stringify(req.body));

  About.findById(req.params.id, (err, about) => {
    if (err) {
      console.log(err)
    } else {
      if (req.body.indexText) {
        about.indexText = req.body.indexText
      }
      if (req.body.aboutText) {
        about.aboutText = req.body.aboutText
      }
      if (req.body.indexImage) {
        about.indexImage = req.body.indexImage
      }
      if (req.body.aboutTopPhrase) {
        about.aboutTopPhrase = req.body.aboutTopPhrase
      }

      about.save((err, data) => {
        if (err) {
          console.log(err)
          res.send({
            success: false,
            message: `About not saved!`
          })
        } else {
          res.send({
            success: true,
            message: `About with ID_${data._id} saved saved!`,
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
    cb(null, aboutFolderPath)
  },
  filename: function (req, file, cb) {
    var filenameHandled = file.originalname.replace(/['" #]+/g, '_');
    cb(null, filenameHandled)
  }
})
 
var upload = multer({ storage: storage })

router.post('/about-image-upload/:id', upload.array('files', 12), (req, res, next) => {
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


/// Delete About ////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.delete('/delete-about/:id', (req, res) => {

  About.remove({ _id: req.params.id }, err => {
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