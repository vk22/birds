const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Subscribes = require('../models/subscribers-model');



/// Create New Subscribes  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/add-new-subscribes', (req, res) => {

  
  var newEmail = req.body;

  console.log('newEmail ', newEmail)

  Subscribes.find({}, 'email', (err, subscribes) => {
    if (err) {
      res.sendStatus(500)
    } else {

      if (subscribes != undefined) {

        const email = new Subscribes(newEmail)
      
        email.save((err, data) => {
          if (err) {
            console.log(err)
            res.send({
              success: false,
              message: `Email not saved! Maybe duplicate title error...`
            })
          } else {
            res.send({
              success: true,
              message: `Email with ID_${data._id} saved successfully!`,
            })
          }
        })

      } else {
        res.send({
          success: false,
          message: `Email exist.`
        })
      }
        
    }
  }).sort({ _id: -1 })

})




/// Get All Subscribes ////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/get-subscribes/', (req, res) => {
  try {

  var token = '99999';

  if (token) {
    Subscribes.find({}, 'email updated', (err, subscribes) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({success: true, subscribes: subscribes})
      }
    }).sort({ _id: -1 })

    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized'});
    }

    } catch (err) {
      next(err);
    }

})


/// User Feedback  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/send-email/', (req, res) => {

  console.log ('req.body: '+JSON.stringify(req.body));  

    //// уведомление о новом заказе менеджеру

    // let transporter = nodemailer.createTransport({
    //   service: "Gmail",
    //   auth: {
    //     user: "v.kushnir22@gmail.com",
    //     pass: "juventustorino"
    //   }
    // });

    let transporter = nodemailer.createTransport({
        sendmail: true,
        newline: 'unix',
        path: '/usr/sbin/sendmail'
    });  

    const feedbackName = req.body.name;
    const feedbackEmail = req.body.email;
    const feedbackMessage = req.body.message;
  
    let mailOptionsManager = {
      from: '"FQueens" <noreply@barkas22.ru>', // sender address
      to: 'v.kushnir22@gmail.com', // list of receivers
      subject: "Письмо с сайта", // Subject line
      html: `<p>Имя: ${feedbackName}</p> 
              <p>Email: ${feedbackEmail}</p> 
              <p>Сообщение: ${feedbackMessage}</p>` // html body
    };
  
    let infoManager = transporter.sendMail(mailOptionsManager)

    console.log('infoManager ', infoManager)

    res.send({
      success: true,
      message: `Спасибо за обращение!`,
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