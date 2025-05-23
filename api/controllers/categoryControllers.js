const Category = require("../models/category-model");

const addNewCategory = async (req, res) => {

  const newGategory = req.body;
  const category = new Category(newGategory);
  category.save((err, data) => {
    if (err) {
      console.log(err);
      res.send({
        success: false,
        message: `categories not saved! Maybe duplicate title error...`,
      });
    } else {
      res.send({
        success: true,
        message: `categories with ID_${data._id} saved successfully!`,
        postNum: data,
      });
    }
  });

};

const getCategories = async (req, res) => {
  try {
    //var token = getToken(req.headers);
    var token = "99999";
    let lots = [];

    if (token) {
      Category.find({}, (err, lotCategories) => {
        if (err) {
          res.sendStatus(500);
        } else {
          // console.log('lotCategories ', lotCategories)
          res.send({
            success: true,
            lotCategories: lotCategories,
          });
        }
      }).sort({ _id: 1 });
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized" });
    }
  } catch (err) {
    next(err);
  }
};

const getCategoryOne = async (req, res) => {
  console.log("req.params.id: " + req.params.id);
  var token = "99999";
  if (token) {
    Category.findById(req.params.id, (err, category) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send({ success: true, category: category });
      }
    });
  } else {
    return res.status(403).send({ success: false, msg: "Unauthorized" });
  }
};

const editCategory = async (req, res) => {
  console.log("edit: " + JSON.stringify(req.body));

  Category.findById(req.params.id, (err, category) => {
    if (err) {
      console.log(err);
    } else {
      if (req.body.title) {
        category.title = req.body.title;
      }
      if (req.body.subtitle) {
        category.subtitle = req.body.subtitle;
      }
      if (req.body.image) {
        category.image = req.body.image;
      }
      if (req.body.url) {
        category.url = req.body.url;
      }
      if (req.body.subcategories) {
        category.subcategories = [...req.body.subcategories];
      }

      category.save((err, data) => {
        if (err) {
          console.log(err);
          res.send({
            success: false,
            message: `Category not saved!`,
          });
        } else {
          res.send({
            success: true,
            message: `Category with ID_${data._id} saved saved!`,
          });
        }
      });
    }
  });
};

const uploadCategoryFiles = async (req, res, next) => {
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
  
}

const deleteCategory = async (req, res) => {

  Category.remove({ _id: req.params.id }, err => {
    if (err) {
      res.sendStatus(500)  
    } else {
      res.sendStatus(200)
    }
  })

}

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

module.exports = {
  addNewCategory,
  getCategories,
  getCategoryOne,
  editCategory,
  uploadCategoryFiles,
  deleteCategory
};
