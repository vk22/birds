const PDFDocument = require("./pdfkit-tables");
const fs = require("fs");
const Email = require("email-templates");
const nodemailer = require("nodemailer");
const emailTransport = require("../config/config").emailTransport;
//const emailTransport = require('../config/config').emailTransportGmail
const emailTo = require("../config/config").emailTo;
const emailFrom = require("../config/config").emailFrom;
const Interes = require("../models/interes-model");
const appFolderUploads = require("../config/config").appFolderUploads["localhost"];
const companyControllers = require("./companyControllers");


function uniqueIDGenerate() {
  function chr4() {
    return Math.random().toString(16).slice(-4);
  }
  return chr4() + chr4();
}

const createPDF = async (data, hostname) => {

  // Create a document
  const doc = new PDFDocument();
  const orderLots = data.lots;
  const orderTitle1 = `От имени УК «BIRDS» благодарим Ваc за интерес к нашим объектам.`;
  const orderTitle2 = `Ниже Вы можете ознакомиться со списком лотов для выбора подходящего варианта аренды.`;
  const orderFilename = `birds-lots-offer-${uniqueIDGenerate()}.pdf`;
  const fullFilePath = `${appFolderUploads}pdf/${orderFilename}`;
  const outputFilePath = `/uploads/pdf/${orderFilename}`;

  doc.pipe(fs.createWriteStream(fullFilePath));

  // Embed a font, set the font size, and render some text
  let tableRows1 = [];
  let tableRows2 = [];
  let tableRows3 = [];
  let table1 = {};
  let table2 = {};
  let table3 = {};

  /// Get phone, email 
  const getCompanyInfoData = await companyControllers.getCompanyInfo();
  const companyPhone = getCompanyInfoData.phone;
  const companyEmail = getCompanyInfoData.emailTo;

  orderLots.forEach((item, index) => {

    //console.log('item ', item)

    const own_entrance = item.own_entrance ? "Да" : "Нет";

    if (index <= 15) {
      tableRows1.push([
        item.type,
        item.project_title,
        item.floor_number,
        own_entrance,
        item.square,
        item.price,
      ]);
    } else if (index > 15 && index <= 30) {
      tableRows2.push([
        item.type,
        item.project_title,
        item.floor_number,
        own_entrance,
        item.square,
        item.price,
      ]);
    } else {
      tableRows3.push([
        item.type,
        item.project_title,
        item.floor_number,
        own_entrance,
        item.square,
        item.price,
      ]);
    }
  });

  if (tableRows1.length) {
    table1 = {
      headers: [
        //'Лот',
        "Тип",
        "Проект",
        "Этаж",
        "Отдельный вход",
        //'С отделкой',
        "Площадь, м2",
        "Арендный платеж,\nруб./мес.",
      ],
      rows: tableRows1,
    };
  }

  if (tableRows2.length) {
    table2 = {
      headers: [
        //'Лот',
        "Тип",
        "Проект",
        "Этаж",
        "Отдельный вход",
        //'С отделкой',
        "Площадь, м2",
        "Арендный платеж,\nруб./мес.",
      ],
      rows: tableRows2,
    };
  }

  if (tableRows3.length) {
    table3 = {
      headers: [
        //'Лот',
        "Тип",
        "Проект",
        "Этаж",
        "Отдельный вход",
        //'С отделкой',
        "Площадь, м2",
        "Арендный платеж,\nруб./мес.",
      ],
      rows: tableRows3,
    };
  }

  doc.font(__dirname + "/fonts/Calibri.ttf").fontSize(9);

  doc.image(__dirname + "/img/header.png", 0, 35, { width: 612 });

  doc.text(orderTitle1, 35, 150, {
    align: "left",
    width: 540,
  });

  doc.text(orderTitle2, 35, 160, {
    align: "left",
    width: 540,
  });

  doc.table(table1, 35, 225, {
    width: 540,
    prepareHeader: () =>
      doc.font(__dirname + "/fonts/Calibri-Bold.ttf").fontSize(7),
    prepareRow: (row, i) =>
      doc.font(__dirname + "/fonts/Calibri.ttf").fontSize(7),
  });

  doc.text(
    `По вопросам бронирования выбранных лотов и финализации условий аренды Вы можете связаться с менеджером по телефону ${companyPhone}`,
    35,
    doc.page.height - 100,
    {
      align: "left",
      width: 550,
    }
  );

  doc
    .moveDown()
    .text(`или по почте ${companyEmail}`, 35, doc.page.height - 90, {
      align: "left",
      lineBreak: false,
    });

  // doc.on('pageAdded', () => doc.text("Page Title"));

  if (tableRows2.length) {
    doc.addPage();

    doc.image(__dirname + "/img/header.png", 0, 35, { width: 612 });

    doc.table(table2, 35, 155, {
      width: 540,
      prepareHeader: () =>
        doc.font(__dirname + "/fonts/Calibri-Bold.ttf").fontSize(7),
      prepareRow: (row, i) =>
        doc.font(__dirname + "/fonts/Calibri.ttf").fontSize(7),
    });

    doc.text(
      `По вопросам бронирования выбранных лотов и финализации условий аренды Вы можете связаться с менеджером по телефону ${companyPhone}`,
      35,
      doc.page.height - 100,
      {
        align: "left",
        width: 550,
      }
    );

    doc
      .moveDown()
      .text(`или по почте ${companyEmail}`, 35, doc.page.height - 90, {
        align: "left",
        lineBreak: false,
      });
  }

  if (tableRows3.length) {
    doc.addPage();

    doc.image(__dirname + "/img/header.png", 0, 35, { width: 612 });

    doc.table(table3, 35, 155, {
      width: 540,
      prepareHeader: () =>
        doc.font(__dirname + "/fonts/Calibri-Bold.ttf").fontSize(7),
      prepareRow: (row, i) =>
        doc.font(__dirname + "/fonts/Calibri.ttf").fontSize(7),
    });

    doc.text(
      `По вопросам бронирования выбранных лотов и финализации условий аренды Вы можете связаться с менеджером по телефону ${companyPhone}`,
      35,
      doc.page.height - 100,
      {
        align: "left",
        width: 550,
      }
    );

    doc
      .moveDown()
      .text(`или по почте ${companyEmail}`, 35, doc.page.height - 90, {
        align: "left",
        lineBreak: false,
      });
  }

  doc.end();

  const outputData = { filename: orderFilename, filePath: outputFilePath, fullPath: fullFilePath }

  return outputData;
};

const sendPDF = async (req, res, next) => {

  /// createPDF
  const data = req.body
  const filePDF = await createPDF(data);

  const orderLots = data.lots;  
  const orderEmail = data.email; 
  const orderSubject = 'Предложение по аренде помещений от УК «BIRDS»'
  const orderTitle1 = 'От имени УК «BIRDS» благодарим Ваc за интерес к нашим объектам.'
  const orderTitle2 = 'Ниже Вы можете ознакомиться со списком лотов для выбора подходящего варианта аренды.';  
  const orderFilename = 'birds-lots-offer-' + uniqueIDGenerate();
  const getCompanyInfoData = await getCompanyInfo();
  const companyPhone = getCompanyInfoData.phone;
  const companyEmail = getCompanyInfoData.emailTo;

  let transporter = nodemailer.createTransport(emailTransport);

  const html = `<table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; width: 100%; background-color: #fff;">
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
                                            <p style="font-family:Helvetica;font-size:14px;line-height:24px;color:#757575">По вопросам бронирования выбранных лотов и финализации условий аренды<br>Вы можете связаться с менеджером по телефону ${companyPhone}<br>или по почте <a style="color: #e06808;" href="mailto:${companyEmail}">${companyEmail}</a></p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                    </table>
                  </td>
                </tr>
              </table>`;

  const message = {
    from: emailFrom,
    to: orderEmail,
    subject: orderSubject,
    text: orderSubject,
    html: html,
    attachments: [
      {
        filename: filePDF.filename,
        path: filePDF.fullPath,
      },
      {
        filename: "mail-header.png",
        path: __dirname + "/img/mail-header.png",
        cid: "mail-header",
      },
    ],
  };

  setTimeout(() => {
    try {
      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log("err".err);
        } else {
          console.log("info.envelope ", info.envelope);
          console.log("info.messageId", info.messageId);
        }
      });
      //console.log('sendMailResponse ', sendMailResponse);
      return true
    } catch (err) {
      console.log(err)
    }
  }, 500);

  const newInteres = {
    email: orderEmail,
    order: orderLots,
    date: new Date().toISOString(),
  };
  const interesData = new Interes(newInteres);
  interesData.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
};

const printPDF = async (req, res) => {
  
  /// createPDF
  const pdfFile = await createPDF(req.body);

  if (pdfFile) {
    res.send({
      success: true,
      message: "Pdf готов!",
      file: pdfFile.filePath,
    });
  } else {
    res.send({
      success: false,
      message: "Pdf ошибка!"
    });
  }

}

module.exports = {
  createPDF,
  sendPDF,
  printPDF
};
