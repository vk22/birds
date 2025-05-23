const express = require('express');
const router = express.Router();
const multer = require('multer');
const moveFile = require('move-file');
const fs = require('fs-extra');
const Promo = require('../models/promo-model');
const Lot = require('../models/lot-model');
//const promoFolderPath = '/var/www/birds/www/static/uploads/promo/';
// const promoFolderPath = '/Users/viktorkusnir/birds/static/uploads/promo/';
const promoFolderPath = require("../config/config").promoFolderPath;

//var async = require("async");



/// Get All Promos ////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/promos/', (req, res) => {
    try {
    //var token = getToken(req.headers);
    var token = '99999';
    let lots = []
  
    if (token) {
      Promo.find({}, (err, promos) => {
        if (err) {
          res.sendStatus(500)
        } else {
          res.send( {
            success: true, 
            promos: promos
          })
        }
      }).sort({ _id: -1 })
  
      } else {
        return res.status(403).send({success: false, msg: 'Unauthorized'});
      }
  
      } catch (err) {
        next(err);
      }
  
  })


/// Create New Promo  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/add-promo', (req, res) => {

  function uniqueIDGenerate(){
    function chr4(){
      return Math.random().toString(16).slice(-4);
    }
    return chr4() + chr4() +
      '-' + chr4() +
      '-' + chr4() +
      '-' + chr4() +
      '-' + chr4() + chr4() + chr4();
  }
  var uniqueID = uniqueIDGenerate();

  const dateandtime = Date.parse(new Date());
  
  //// Получаем номер последнего тура

  var lastPromoID;
  var newPromo = req.body;

  Promo.find({}, 'id', (err, promos) => {
    if (err) {
      res.sendStatus(500)
    } else {

      console.log('promos: '+promos);

      if (promos == '') {
        lastPromoID = 0;
      } else {
        var lastPromoIDArr = [];
        promos.forEach(function(el) {
          lastPromoIDArr.push(el.id)
        });
        lastPromoID = lastPromoIDArr[0];
      }

      newPromo.id = lastPromoID+1;
      const promo = new Promo(newPromo)
      

      promo.save((err, data) => {
        if (err) {
          console.log(err)
          res.send({
            success: false,
            promo: data._id,
            message: `Promo not saved! Maybe duplicate title error...`
          })
        } else {

          const promoFolder = promoFolderPath+data.id
          fs.mkdirSync(promoFolder, { recursive: true });

          res.send({
            success: true,
            message: `Promo with ID_${data._id} saved successfully!`,
            promoID: data.id
          })
        }
      })
      
    }
  }).sort({ _id: -1 })

})


router.put('/promo/:id', (req, res) => {

  console.log('edit: '+JSON.stringify(req.body));

  Promo.findById(req.params.id, (err, promo) => {
    if (err) {
      console.log(err)
    } else {
      if (req.body.title) {
        promo.title = req.body.title
      }

      promo.no_terms = req.body.no_terms
      
      if (req.body.date_start) {
        promo.date_start = req.body.date_start
      }

      if (req.body.date_end) {
        promo.date_end = req.body.date_end
      }
      
      if (req.body.description) {
        promo.description = req.body.description
      }

      if (req.body.cover) {
        promo.cover = req.body.cover
      }

      if (req.body.checkedRent) {
        promo.checkedRent = req.body.checkedRent
      }

      if (req.body.checkedProjects) {
        promo.checkedProjects = req.body.checkedProjects
      }
      
      if (req.body.link) {
        promo.link = req.body.link
      }

      promo.updated = new Date()

      promo.save((err, data) => {
        if (err) {
          console.log(err)
          res.send({
            success: false,
            message: `Promo not saved!`
          })
        } else {
          res.send({
            success: true,
            message: `Promo with ID_${data._id} saved saved!`,
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
    var promoID = req.params.id;
    console.log('destination ', promoFolderPath+promoID)
    cb(null, promoFolderPath+promoID)
  },
  filename: function (req, file, cb) {
    var filenameHandled = file.originalname.replace(/['" #]+/g, '_');
    cb(null, filenameHandled)
  }
})
 
var upload = multer({ storage: storage })

router.post('/files-promo-upload/:id', upload.array('files', 12), (req, res, next) => {
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

/// Get One Promo ////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/promo/:id', (req, res) => {

  //console.log("Cookies: ", req.cookies)
  //var token = getToken(req.headers);
  console.log ('req.params.id: '+req.params.id);
  var token = '99999';
  if (token) {
    Promo.findById(req.params.id, (err, promo) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({success: true, promo: promo})
      }
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized'});
  }
})


/// Get One Promo Admin////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/admin-get-promo/:id', (req, res) => {

  //console.log("Cookies: ", req.cookies)
  //var token = getToken(req.headers);
  console.log ('req.params.id: '+req.params.id);
  var token = '99999';
  if (token) {
    Promo.findById(req.params.id, (err, promo) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({success: true, promo: promo})
      }
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized'});
  }
})



/// Delete Promo ////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.delete('/delete-promo/:id', (req, res) => {


  Promo.findById(req.params.id, (err, promo) => {
    if (err) {
      console.log(err)
    } else {
      console.log('removed: '+promo.post_num) 
      const folder = promoFolderPath+promo.post_num;
      fs.remove(folder).then(() => {
        //done
        console.log('removed done') 
      }).catch(err => {
        console.error(err)
      })

    }
  })

  Promo.remove({ _id: req.params.id }, err => {
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