const moveFile = require("move-file");
const fs = require("fs-extra");
const path = require("path");
const rimraf = require("rimraf");
const sharp = require("sharp");
const Lot = require("../models/lot-model");
const Project = require("../models/project-model");
const lotFolderPath = require("../config/config").lotFolderPath;

function uniqueIDGenerate() {
  function chr4() {
    return Math.random().toString(16).slice(-4);
  }
  return (
    chr4() +
    chr4() +
    "-" +
    chr4() +
    "-" +
    chr4() +
    "-" +
    chr4() +
    "-" +
    chr4() +
    chr4() +
    chr4()
  );
}

function generateGUID(lots) {
  const GUID = uniqueIDGenerate();
  const searchID = lots.some((lot) => lot.guid === GUID);
  if (searchID) {
    return generateGUID(lots);
  } else {
    return GUID;
  }
}

/// Create New Lot
const addNewLot = async (req, res, next) => {

  const token = await getToken(req.headers);
  if (!token) {
    return res.status(400).json({ message: "Ошибка авторизации" });
  }

  const lots = await Lot.find({}).sort({ _id: -1 });
  const newLot = req.body;
  newLot.guid = generateGUID(lots);
  const lotForSave = new Lot(newLot);
  const saveLot = await lotForSave.save();

  if (saveLot) {
    const lotFolder = lotFolderPath + saveLot.guid;
    const createLotFolder = fs.mkdirSync(lotFolder);
    res.send({
      success: true,
      message: `Lot with ID_${saveLot._id} saved successfully!`,
      lotGUID: saveLot.guid,
    });
  } else {
    res.send({
      success: false,
      message: `Lot not saved! Maybe duplicate title error...`,
    });
  }
};

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/// Create New Lot
const createFakeLots = async (req, res, next) => {

  const lotsCount = req.body.count;
  const projects = await Project.find({}).sort({ _id: -1 });
  const projects_titles = projects.map((item) => item.title);
  const projects_guids = projects.map((item) => item.guid);
  const types = ["Офис", "Теплый склад", "Холодный склад", "ПСН"];

  for (let i = 0; i < lotsCount; i++) {
    const fakeLot = {
      type: types[Math.floor(Math.random() * types.length)],
      project_guid:
        projects_guids[Math.floor(Math.random() * projects_guids.length)],
      project_title:
        projects_titles[Math.floor(Math.random() * projects_titles.length)],
      square: getRandom(100, 500),
      price: getRandom(100000, 500000),
      status: "free",
      gallery_fake: [
        "/uploads/fake/img1.jpg",
        "/uploads/fake/img2.jpg",
        "/uploads/fake/img3.jpg",
      ],
      guid: uniqueIDGenerate()
    };
    console.log("newLot ", fakeLot);

    const lotForSave = new Lot(fakeLot);
    const saveLot = await lotForSave.save();

    if (saveLot) {
      console.log("saveLot Done");
    } else {
      console.log("err");
    }
  }

  res.send({
    success: true,
    message: `Lots saved successfully!`,
  });
};

/// Edit Lot
const editLot = async (req, res, next) => {

  const token = await getToken(req.headers);
  if (!token) {
    return res.status(400).json({ message: "Ошибка авторизации" });
  }

  console.log("editLot ", req.body);
  Lot.findOne({ guid: req.params.id }, (err, lot) => {
    if (err) {
      console.log(err);
    } else {
      if (req.body.project) {
        lot.project = req.body.project;
      }
      if (req.body.project_title) {
        lot.project_title = req.body.project_title;
      }
      if (req.body.project_guid) {
        lot.project_guid = req.body.project_guid;
      }
      if (req.body.metro) {
        lot.metro = req.body.metro;
      }
      if (req.body.type) {
        lot.type = req.body.type;
      }
      if (req.body.number) {
        lot.number = req.body.number;
      }
      if (req.body.floor_number) {
        lot.floor_number = req.body.floor_number;
      }
      if (req.body.section_number) {
        lot.section_number = req.body.section_number;
      }
      if (req.body.options) {
        lot.options = req.body.options
      }

      lot.own_entrance = req.body.own_entrance;

      if (req.body.square) {
        lot.square = req.body.square;
      }
      if (req.body.price) {
        lot.price = req.body.price;
      }
      if (req.body.gallery) {
        lot.gallery = req.body.gallery;
      }
      if (req.body.status) {
        lot.status = req.body.status;
      }
      if (req.body.about) {
        lot.about = req.body.about;
      }

      lot.save((err, data) => {
        if (err) {
          console.log(err);
          res.send({
            success: false,
            message: `Lot not saved!`,
          });
        } else {
          res.send({
            success: true,
            message: `Lot with ID_${data._id} saved!`,
          });
        }
      });
    }
  });
};

/// Get Lots
const getLots = async (req, res, next) => {
  const mode = req.query.mode;

  try {
    //var token = getToken(req.headers);
    var token = "99999";
    if (token) {
      let lots;
      if (mode == "all") {
        lots = await Lot.find({}).sort({ _id: -1 });
      } else if (mode == "free") {
        lots = await Lot.find({ status: "free" }).sort({ _id: -1 });
      }
      if (lots.length) {
        res.send({
          success: true,
          lots: lots,
        });
      } else {
        res.send({
          success: false,
          lots: undefined,
        });
      }
    } else {
      res.status(403).send({ success: false, msg: "Unauthorized" });
    }
  } catch (err) {
    next(err);
  }
};

/// Get One Lot
const getOneLot = async (req, res, next) => {
  try {
    //var token = getToken(req.headers);
    var token = "99999";
    if (token) {
      const lot = await Lot.findOne({ guid: req.params.id });
      if (lot) {
        res.send({
          success: true,
          lot: lot,
        });
      } else {
        res.send({
          success: false,
          lot: undefined,
        });
      }
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized" });
    }
  } catch (err) {
    next(err);
  }
};

/// Upload Lot Files
const uploadLotFiles = async (req, res, next) => {
  const files = req.files;
  console.log("req.files: " + JSON.stringify(req.files));
  
  for (file of files) {
    const fileFormat = path.extname(file.filename);
    const filename = file.filename;
    const filenameResized =
      file.filename.split(".").slice(0, -1).join(".") + "-sm" + fileFormat;
    const imagePath = file.destination + "/" + filename;
    const imageSmPath = file.destination + "/" + filenameResized;


    const image = await sharp(imagePath)
    const metadata = await image.metadata()
    console.log('image size', metadata.width, metadata.height)

    if (metadata.width > 2000) {
      sharp(imagePath)
        .resize(2000)
        .jpeg({ quality: 90 })
        .toBuffer()
        .then((data) => {
          fs.writeFile(imagePath, data);
          console.log("main image resized", data);
        })
        .catch((err) => {
          console.log("sharp error");
        });
    }

    try {
      fs.copyFileSync(imagePath, imageSmPath);
      sharp(imageSmPath)
        .resize(700)
        .jpeg({ quality: 90 })
        .toBuffer()
        .then((data) => {
          fs.writeFile(imageSmPath, data);
          console.log("preview 700 done", data);
        })
        .catch((err) => {
          console.log("sharp error");
        });

    } catch (e) {
      console.log('e', e)
    }

      
    

  }


  // console.log('files-project-upload files: '+JSON.stringify(files));
  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    res.json({
      success: false,
      message: `Error upload!`,
    });
  }

  res.json({
    success: true,
    message: `Pictures uploaded!`,
  });
};

//// Delete Lot Files
const deleteLotFiles = async (req, res, next) => {
  const lotFolder = req.body.lotFolder;
  const files = req.body.files;

  console.log("lotFolder ", lotFolder);
  console.log("files ", files);
  let errors = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filename = file.name;
    const filenameSM = filename.split(".")[0] + "-sm." + filename.split(".")[1];
    const filenamePath = lotFolderPath + lotFolder + "/" + filename;
    const filenameSMPath = lotFolderPath + lotFolder + "/" + filenameSM;
    

    try {
      if (fs.existsSync(filenamePath)) {
        fs.unlinkSync(filenamePath);
      }
      if (fs.existsSync(filenameSMPath)) {
        fs.unlinkSync(filenameSMPath);
      }
    } catch (error) {
      console.log(error);
      errors.push(error);
    }
  }

  if (errors.length) {
    res.send({
      success: false,
      message: `Error with deleting...`,
    });
  } else {
    res.send({
      success: true,
      message: `Files Deleted successfully.`,
    });
  }
};

const deleteLots = async (req, res) => {
  const token = await getToken(req.headers);
  if (!token) {
    return res.status(400).json({ message: "Ошибка авторизации" });
  }

  const { lots } = req.body;
  console.log("lots: " + lots);

  for (var i = 0; i < lots.length; i++) {

    try {
      const lotID = lots[i];
      const lot = await Lot.findById(lotID);
      console.log("lot: " + lot);
      if (!lot) {
        console.log('лот не найден');
      } else {
        if (lot.guid) {
          // console.log("removed: " + lot.guid);
          const folder = lotFolderPath + lot.guid;
          rimraf(folder, function () {
            console.log("delete-project done");
          });
        }
      }

      const lotRemove = await Lot.remove({ _id: lotID });
      if (!lotRemove) {
        res.sendStatus(500);
      }

    } catch (error) {
      console.log(error);
    }
  }

  res.json({
    success: true,
    message: `All good!`,
  });


};

const getToken = function (headers) {
  // console.log('getToken ', headers)
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
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
  addNewLot,
  getLots,
  getOneLot,
  editLot,
  deleteLots,
  uploadLotFiles,
  deleteLotFiles,
  createFakeLots,
};
