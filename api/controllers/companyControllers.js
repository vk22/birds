const Company = require("../models/company-model");
const Lot = require("../models/lot-model");

// const getCompanyInfo = async (req, res) => {
//   const getCompanyInfo = await Company.find({});
//   console.log('getCompanyInfo ', getCompanyInfo)
//   return getCompanyInfo[0];
// }

async function getCompanyData() {
  const getCompanyData = await Company.find({});
  return getCompanyData[0];
}

const getCompanyInfo = async (req, res, next) => {
  try {
    const token = "99999";
    if (token) {
      const companyInfo = await Company.find({});
      // console.log('companyInfo ', companyInfo)
      // console.log('req ', req)
      if (companyInfo.length) {
        if (req) {
          res.send({
            success: true,
            company: companyInfo[0],
          });
        } else {
          return companyInfo[0];
        }
      } else {
        if (req) {
          res.sendStatus(500);
        } else {
          return false;
        }
      }
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized" });
    }
  } catch (err) {
    console.log(err);
  }
};

const editCompanyInfo = async (req, res) => {

  Company.findById(req.body._id, (err, company) => {
    if (err) {
      console.log(err)
    } else {
      if (req.body.address) {
        company.address = req.body.address
      }
      if (req.body.phone) {
        company.phone = req.body.phone
      }
      if (req.body.emailFrom) {
        company.emailFrom = req.body.emailFrom
      }
      if (req.body.emailTo) {
        company.emailTo = req.body.emailTo
      }
      if (req.body.emailsForOrders) {
        company.emailsForOrders = req.body.emailsForOrders
      }

      company.save((err, data) => {
        if (err) {
          console.log(err)
          res.send({
            success: false,
            message: `Company not saved!`
          })
        } else {
          res.send({
            success: true,
            message: `Company with ID_${data._id} saved saved!`,
          })
        }
      })


    }
  })
}

const editCompanyContacts = async (req, res, next) => {

  try { 
    const companyInfo = await Company.findById('642401b2c279347734988f2c');
    const companyContacts = companyInfo.contacts;
    const contactForEdit = companyContacts.find( item => item.id === +req.params.id)

    if (contactForEdit) {
      if (req.body.city) {
        contactForEdit.city = req.body.city
      }
      if (req.body.address) {
        contactForEdit.address = req.body.address
      }
      if (req.body.phone) {
        contactForEdit.phone = req.body.phone
      }
      if (req.body.mapCoords) {
        contactForEdit.mapCoords = req.body.mapCoords
      }
    }

    const save = await companyInfo.save()
    console.log('save ', save)
    if (save) {
      res.send({
        success: true,
        message: `Contacts saved!`,
      })
    } else {
      console.log('Contacts not saved!')
      res.send({
        success: false,
        message: `Contacts not saved!`
      })
    }
  }
  catch (err) {
    console.log(err)
  }

}

const addCompanyContacts = async (req, res, next) => {
  
  const companyInfo = await Company.findById('642401b2c279347734988f2c');
  const companyContacts = companyInfo.contacts;
  const newID = companyContacts[companyContacts.length-1].id + 1
  const newContact = req.body;
  newContact.id = newID
  companyContacts.push(newContact)

  const save = await companyInfo.save()
  console.log('save ', save)
  if (save) {
    res.send({
      success: true,
      message: `Contacts saved!`,
    })
  } else {
    console.log('Contacts not saved!')
    res.send({
      success: false,
      message: `Contacts not saved!`
    })
  }

}

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


module.exports = {
  getCompanyInfo,
  editCompanyInfo,
  editCompanyContacts,
  addCompanyContacts,
};
