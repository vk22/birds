const nodemailer = require("nodemailer");
const Order = require("../models/order-model");
const emailTransport = require("../config/config").emailTransport;
const emailFrom = require("../config/config").emailFrom;
const Company = require("../models/company-model");

async function getCompanyData() {
  const getCompanyData = await Company.find({});
  console.log('getCompanyData ', getCompanyData)
  return getCompanyData[0];
}

const addNewOrder = async (req, res) => {

  const token = await getToken(req.headers);
  if (!token) {
    return res.status(400).json({ message: "Ошибка авторизации" });
  }

  const userData = {
    agent: req.headers["user-agent"],
    reffer: req.headers["referer"],
  };
  const newOrder = req.body;
  newOrder.date = new Date().toISOString();
  newOrder.userData = userData;
  newOrder.order.forEach((lot) => delete lot._id);
  let currentNum = 1
  const lastOrder = await Order.find().limit(1).sort({ _id: -1 })
  console.log('lastOrder ', lastOrder)
  if (lastOrder.length && lastOrder[0].num) { 
    const lastNum = lastOrder[0].num
    console.log('есть номер ', lastNum)
    newOrder.num = lastNum + 1 
  } 
  else {
    newOrder.num = currentNum
  }
  const orderData = new Order(newOrder);
  try {
    const savedOrder = await orderData.save()
    console.log('savedOrder ', savedOrder.num)
    
    if (!savedOrder) {
      console.log(err);
      res.send({
        success: false,
        message: `Maybe error...`,
      });
    } else {
      res.send({
        success: true,
        message: `Спасибо за обращение!`,
      });
    }

    const company = await getCompanyData();
    if (company) {
      console.log('company ', company)
      const emailTo = company.emailsForOrders.join();
      sendOrderToEmail(savedOrder, emailTo);  
    } else {
      console.log('emailTo не найден')
    }

  } catch (err) {
    console.log(err)
  }


};

function sendOrderToEmail(order, email) {
  console.log("order ", order);
  const subject = "Новый заказ";
  const ordersList = [].concat(order);
  const orderEmail = email;

  let transporter = nodemailer.createTransport(emailTransport);
  let html = "";

  ordersList.forEach((order) => {
    var orderLots = "";

    order.order.forEach((lot) => {
      const oneLot = `
      <div style="display: inline-block;width: 250px;border: 1px solid #ebebeb;background: #f7f7f7;padding: 20px;margin-right: 20px; margin-bottom: 20px;">   
        <p>Проект: ${lot.project_title}</p>
        <p>Тип: ${lot.type}</p> 
        <p>Номер: ${lot.number}</p> 
        <p>Этаж: ${lot.floor}</p> 
        <p>Площадь: ${lot.square}</p> 
        <p>Цена: ${lot.price}</p> 
        <p>guid: ${lot.guid}</p>
        </div>
        `;

      orderLots += oneLot;
    });

    const orderHtml = `
        <p>Заказ: №${order.num} ================================================================================================================</p> 
        <div style="display: inline-block;width: 880px;border: 1px solid #ebebeb;padding: 20px;margin-bottom: 20px;">
        <p>Дата/время: ${order.date}</p> 
        <p>Имя: ${order.name}</p> 
        <p>Email: ${order.email}</p> 
        <p>Телефон: ${order.phone}</p>
        </div>
        <p>Лоты:</p>
        ${orderLots}
        <br><br>`;
    html += orderHtml;
  });

  let mailOptionsManager = {
    from: emailFrom, // sender address
    to: orderEmail, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  };

  let sendMailResult = transporter.sendMail(mailOptionsManager);
  console.log(' sendMailResult', sendMailResult)

  return {
    success: true,
    message: "Письмо отправлено!",
  };
}

const getOrders = async (req, res) => {

  const token = await getToken(req.headers);
  if (!token) {
    return res.status(400).json({ message: "Ошибка авторизации" });
  }

  try {
    Order.find({}, (err, orders) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send({ success: true, orders: orders });
      }
    }).sort({ _id: -1 });
  } catch (err) {
    next(err);
  }
};

const getOrderOne = async (req, res) => {
  const token = await getToken(req.headers);
  if (!token) {
    return res.status(400).json({ message: "Ошибка авторизации" });
  }
  try {
    const orderID = req.params.id;
    Order.findById(orderID, (err, order) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send({ success: true, order: order });
      }
    }).sort({ _id: -1 });
  } catch (err) {
    next(err);
  }
};

const deleteOrders = async (req, res) => {

  const token = await getToken(req.headers);
  if (!token) {
    return res.status(400).json({ message: "Ошибка авторизации" });
  }

  var orders = req.body;
  console.log("delete orders", orders);
  var deleteArr = [];

  orders.forEach((orderID, index) => {
    console.log("orderID", orderID);
    Order.deleteOne({ _id: orderID }, (err) => {
      if (err) {
        res.sendStatus(500);
      } else {
        // res.sendStatus(200)

        deleteArr.push(1);
        if (deleteArr.length === orders.length) {
          res.json({
            success: true,
            message: "Orders deleted",
          });
        }
      }
    });
  });
};

const sendOrderToManager = async (req, res) => {
  const subject = "Заказы из админки";
  const ordersList = req.body.orders;
  const orderEmail = req.body.email;

  let transporter = nodemailer.createTransport(emailTransport);
  let html = "";

  ordersList.map((order) => {
    var orderLots = "";

    order.order.map((lot) => {
      var oneLot = `
        <div style="display: inline-block;width: 250px;border: 1px solid #ebebeb;background: #f7f7f7;padding: 20px;margin-right: 20px; margin-bottom: 20px;">
          <p>Проект: ${lot.project_project}</p>
          <p>guid: ${lot.guid}</p>
          <p>Номер: ${lot.number}</p> 
          <p>Этаж: ${lot.floor}</p> 
          <p>Площадь: ${lot.square}</p> 
          <p>Цена: ${lot.price}</p> 
          </div>
          `;

      orderLots += oneLot;
    });

    var orderHtml = `
      
          <p>Заказ: №${order.num} ================================================================================================================</p> 
          <div style="display: inline-block;width: 880px;border: 1px solid #ebebeb;padding: 20px;margin-bottom: 20px;">
          <p>Дата/время: ${order.date}</p> 
          <p>Имя: ${order.name}</p> 
          <p>Email: ${order.email}</p> 
          <p>Телефон: ${order.phone}</p>
          </div>
          <p>Лоты:</p>
          ${orderLots}
          <br><br>`;
    html += orderHtml;
  });

  let mailOptionsManager = {
    from: emailFrom, // sender address
    to: orderEmail, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  };

  let infoManager = transporter.sendMail(mailOptionsManager);

  res.send({
    success: true,
    message: "Письмо отправлено!",
  });
};

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
  addNewOrder,
  getOrders,
  getOrderOne,
  deleteOrders,
  sendOrderToManager,
};
