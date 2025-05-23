const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Feedback = require("../models/feedback-model");
const emailTransport = require("../config/config").emailTransport;
const emailFrom = require("../config/config").emailFrom;
const Company = require("../models/company-model");

async function getCompanyData() {
  const getCompanyData = await Company.find({});
  return getCompanyData[0];
}

/// Send Feedback 
const sendFeedback = async (req, res, next) => {

  /// Get Data
  const { title, feedback } = req.body
  const { name, email, phone, message, pageFrom } = feedback
  const userData = {
    agent: req.headers["user-agent"],
    reffer: req.headers["referer"],
  };

  /// Get emailsTo
  let emailsTo = undefined
  const company = await getCompanyData();
  if (!company) {
    console.log('emailTo не найден')
  } else {
    emailsTo = company.emailsForOrders.join();
  }

  //// Save to DB
  const dateandtime = Date.parse(new Date());
  feedback.date = dateandtime;
  feedback.userData = userData;

  const feedbackToDB = new Feedback(feedback);
  const feedbackToDBSaved = await feedbackToDB.save();
  if (!feedbackToDBSaved) {
    return res.send({ success: false, message: `Saving Error` });
  } 
  res.send({
    success: true,
    message: `Спасибо за обращение!`,
  });

  //// sendMail
  if (!emailsTo) return 
  
  let html = "";
  if (message) {
    html = `<p>Имя: ${name}</p> 
            <p>Email: ${email}</p> 
            <p>Телефон: ${phone}</p>
            <p>Сообщение: ${message}</p>
            <p>Страница: ${pageFrom}</p>`;
            
  } else {
    html = `<p>Имя: ${name}</p> 
            <p>Email: ${email}</p> 
            <p>Телефон: ${phone}</p>
            <p>Страница: ${pageFrom}</p>`;
  }
  let mailOptionsManager = {
      from: emailFrom, // sender address
      to: emailsTo, // list of receivers
      subject: title, // Subject line
      html: html, // html body
  };
  let transporter = nodemailer.createTransport(emailTransport);
  let sendMail = transporter.sendMail(mailOptionsManager);

  console.log("sendMail ", sendMail);

}

/// Get Feedbacks 
const getFeedbacks = async (req, res, next) => {
  const token = await getToken(req.headers);
  if (!token) {
    return res.status(401).json({ message: "Ошибка авторизации" });
  }
  try {
    const feedbacks = await Feedback.find({}).sort({ _id: -1 });
    if (!feedbacks) {
      return res.status(400).json({message: `Ничего не найдено`})
    }
    return res.json({ success: true, feedbacks: feedbacks });
  } catch (e) {
    console.log(e)
    res.status(400).json({ message: "Access Error" });
  }
}

/// Get One Feedback 
const getOneFeedback = async (req, res, next) => {
  const token = await getToken(req.headers);
  if (!token) {
    return res.status(401).json({ message: "Ошибка авторизации" });
  }
  try {
    const feedback = await Feedback.findById(req.params.id);
    console.log('feedback ', feedback)
    if (!feedback) {
      return res.status(400).json({message: `Ничего не найдено`})
    }
    return res.json({ success: true, feedback: feedback });
  } catch (e) {
    console.log(e)
    res.status(400).json({ message: "Access Error" });
  }
}

/// Delete Feedback 
const deleteFeedback = async (req, res, next) => {

  const token = await getToken(req.headers);
  if (!token) {
    return res.status(401).json({ message: "Ошибка авторизации" });
  }

  try {
    const feedbacks = req.body;
    console.log('delete feedbacks', feedbacks)
    for (let i = 0; i < feedbacks.length; i++) {
      const element = feedbacks[i];
      const deleted = await Feedback.deleteOne({ _id: element })
      console.log('deleted', deleted)
      if (!deleted) {
        res.sendStatus(500);
      }
    }
  
    res.json({
      success: true,
      message: "Feedbacks deleted",
    });

  } catch (e) {
    console.log(e)
    res.status(400).json({ message: "Access Error" });
  }

}

const getToken = function (headers) {
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

module.exports = {
  sendFeedback,
  getFeedbacks,
  getOneFeedback,
  deleteFeedback
};
