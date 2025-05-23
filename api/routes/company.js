const express = require('express');
const router = express.Router();
const companyControllers = require("../controllers/companyControllers");

/// Get Company Info
router.get('/company-data/', companyControllers.getCompanyInfo)

/// Edit Company Info
router.put('/company-edit/', companyControllers.editCompanyInfo)

/// Edit Contact
router.put('/company-contact/:id', companyControllers.editCompanyContacts)


module.exports = router;