const express = require("express");
const router = express.Router();
const PDFDocument = require("../controllers/pdfkit-tables");
const fs = require("fs");
const Email = require("email-templates");
const nodemailer = require("nodemailer");
const emailTransport = require("../config/config").emailTransport;
//const emailTransport = require('../config/config').emailTransportGmail
const emailTo = require("../config/config").emailTo;
const emailFrom = require("../config/config").emailFrom;
const Interes = require("../models/interes-model");
const Project = require("../models/project-model");
const pdfControllers = require("../controllers/pdfControllers");
const appFolderUploads =
  require("../config/config").appFolderUploads["localhost"];

function uniqueIDGenerate() {
  function chr4() {
    return Math.random().toString(16).slice(-4);
  }
  return chr4() + chr4();
}

router.post("/send-project-pdf", (req, res) => {
  //console.log('send-pdf ', req.body)

  // Create a document
  const doc = new PDFDocument();

  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage

  var orderEmail = req.body.email;
  var orderProject = req.body.project;
  var projectPDF;
  var projectPDFpath;
  var projectName;
  // console.log('send-project-pdf ', orderEmail, orderProject)
  var orderSubject = "";
  var orderTitle1 =
    "От имени УК «Birds» благодарим Ваc за интерес к нашим объектам.";
  var orderTitle2 = "Ниже Вы можете ознакомиться с выбранным Проектом.";
  // var orderFilename = 'birds-lots-offer-' + uniqueIDGenerate();
  // var orderType = req.body.type;
  var companyPhone = "8 800 444 06 64";
  var companyEmail = "rent@birds.moscow";

  Project.findById(orderProject._id, (err, project) => {
    if (err) {
      res.sendStatus(500);
    } else {
      projectPDF = projectFolderPath + "/" + project.id + "/" + project.pdf[0];
      projectPDFpath = project.pdf[0];
      projectTitle = project.title;
      orderSubject = "Презентация проекта «" + projectTitle + "» от УК «Birds»";
      sendPDF();
    }
  });

  function sendPDF() {
    let transporter = nodemailer.createTransport(emailTransport);

    // console.log('orderEmail ', orderEmail);

    //var html = '<div style="max-width:600px"><p><img style="width:100%" src="cid:mail-header"></p><p>'+orderTitle1+'<br>'+orderTitle2+'<br><br>По вопросам бронирования выбранных лотов и финализации условий аренды<br>Вы можете связаться с менеджером по телефону +7 (495) 790 78 88<br>или по почте <a href="mailto:rent@birds.moscow">rent@birds.moscow</a></p></div>'

    var html = `<table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; width: 100%; background-color: #fff;">
                  <tr>
                    <td style="font-family: sans-serif; font-size: 14px; color: #000; vertical-align: top; display: block; margin: 0 auto; max-width: 600px; padding: 40px; padding-right: 0; width: 600px; border: 1px solid #ebebeb;">
                    <table>
                          <tr>
                              <td><img style="width:100%; padding-bottom: 20px; " src="cid:mail-header"></td>
                          </tr>
                          <tr>
                              <td style="padding-right: 40px;">
                                  <table>
                                      <tr>
                                          <td style="">
                                              <p style="font-family:Helvetica;font-size:14px;line-height:24px;color:#757575">
                                              ${orderTitle1}<br>${orderTitle2}
                                              </p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="padding-bottom:20px;"></td>
                                      </tr>
                                      <tr>
                                          <td style="padding-bottom:15px;border-top:1px solid #e6e6e6"></td>
                                      </tr>
                                      <tr>
                                          <td>
                                              <p style="font-family:Helvetica;font-size:14px;line-height:24px;color:#757575">
                                              По вопросам наличия интересующих Вас помещений, бронирования и финализации условий аренды<br>
                                              Вы можете связаться с менеджером по телефону ${companyPhone}<br>или по почте <a style="color: #e06808;" href="mailto:${companyEmail}">${companyEmail}</a></p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                          
                      </table>
                    </td>
                  </tr>
                </table>`;

    var message = {
      from: emailFrom,
      to: orderEmail,
      subject: orderSubject,
      text: orderSubject,
      html: html,
      attachments: [
        {
          filename: projectPDFpath,
          path: projectPDF,
        },
        {
          filename: "mail-header.png",
          path: __dirname + "/img/mail-header.png",
          cid: "mail-header",
        },
      ],
    };

    setTimeout(() => {
      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log("err".err);
        } else {
          console.log("info.envelope ", info.envelope);
          console.log("info.messageId", info.messageId);
        }
      });

      //console.log('sendMailResponse ', sendMailResponse);

      res.send({
        success: true,
        message: "Презентация отправлена!",
        //link: __dirname + '/pdf/siding.pdf'
      });
    }, 500);

    const newInteres = {
      email: orderEmail,
      order: [orderProject.title],
      date: new Date().toISOString(),
    };

    const interesData = new Interes(newInteres);

    interesData.save((err, data) => {
      if (err) {
        console.log(err);
      } else {
      }
    });
  }
});


/// Send PDF
router.post("/send-pdf", pdfControllers.sendPDF);

/// Print PDF
router.post("/print-pdf", pdfControllers.printPDF);


router.post("/get-interes/", (req, res) => {
  try {
    var token = "99999";

    if (token) {
      Interes.find({}, (err, interes) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.send({ success: true, interes: interes });
        }
      }).sort({ _id: -1 });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized" });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/get-interes/:id", (req, res) => {
  try {
    var token = "99999";

    const orderID = req.params.id;

    if (token) {
      Interes.findById(orderID, (err, interes) => {
        if (err) {
          res.sendStatus(500);
        } else {
          res.send({ success: true, interes: interes });
        }
      }).sort({ _id: -1 });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/delete-interes", (req, res) => {
  var interes = req.body;
  console.log("delete interes", interes);
  var deleteArr = [];

  interes.forEach((orderID, index) => {
    Interes.deleteOne({ _id: orderID }, (err) => {
      if (err) {
        res.sendStatus(500);
      } else {
        // res.sendStatus(200)

        deleteArr.push(1);
        if (deleteArr.length === interes.length) {
          res.json({
            success: true,
            message: "interes deleted",
          });
        }
      }
    });
  });
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
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
