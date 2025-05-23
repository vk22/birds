const moveFile = require('move-file');
const fs = require('fs-extra');
const path = require('path');
const rimraf = require("rimraf");
const sharp = require('sharp')
const Project = require('../models/project-model');
const projectFolderPath = require('../config/config').projectFolderPath;

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
function generateGUID(lots) {
  const GUID = uniqueIDGenerate()
  const searchID = lots.some( lot => lot.guid === GUID)
  if (searchID) {
    return generateGUID(lots)
  } else {
    return GUID
  }
}
function getNextItemID(items) {
  if (!items.length) {
    lastID = 1;
  } else {
    let lastIDArray = [];
    items.forEach(function(el) {
      lastIDArray.push(el.id)
    });
    lastID = lastIDArray[0]+1;
  }
  return lastID
}

////// Projects Controllers //////

const addNewProject = async (req, res, next) => {

  const token = await getToken(req.headers);
  if (!token) {
    return res.status(400).json({ message: "Ошибка авторизации" });
  }

  const newProject = req.body;
  const projects = await Project.find({}).sort({ _id: 1 })
  const nextID = getNextItemID(projects)
  newProject.id = nextID;
  const projectForSave = await new Project(newProject)
  const saveProject = await projectForSave.save(); 
  if (saveProject) {
    const projectFolder = projectFolderPath+saveProject.id;
    fs.mkdirSync(projectFolder, { recursive: true });
    res.send({
      success: true,
      message: `Project with ID_${saveProject._id} saved successfully!`,
      projectID: saveProject.id
    })
  } else {
    res.send({
      success: false,
      message: `Project not saved! Maybe duplicate title error...`
    })
  } 
}

const editProject = async (req, res, next) => {

  const token = await getToken(req.headers);
  if (!token) {
    return res.status(400).json({ message: "Ошибка авторизации" });
  }

  Project.findById(req.params.id, (err, project) => {
    if (err) {
      console.log(err)
    } else {
      if (req.body.title) {
        project.title = req.body.title
      }
      if (req.body.url) {
        project.url = req.body.url
      }
      if (req.body.type) {
        project.type = req.body.type
      }
      if (req.body.class) {
        project.class = req.body.class
      }
      if (req.body.city) {
        project.city = req.body.city
      }
      if (req.body.metro) {
        project.metro = req.body.metro
      }
      if (req.body.address) {
        project.address = req.body.address
      }
      if (req.body.square) {
        project.square = req.body.square
      }
      if (req.body.floors) {
        project.floors = req.body.floors
      }
      if (req.body.parking) {
        project.parking = req.body.parking
      }
      if (req.body.freeSpaces) {
        project.freeSpaces = req.body.freeSpaces
      }
      if (req.body.features) {
        project.features = req.body.features
      }
      if (req.body.featuresIndex) {
        project.featuresIndex = req.body.featuresIndex
      }
      if (req.body.about) {
        project.about = req.body.about
      }
      if (req.body.cover) {
        project.cover = req.body.cover
      }
      if (req.body.preview) {
        project.preview = req.body.preview
      }
      if (req.body.indexCover) {
        project.indexCover = req.body.indexCover
      }
      if (req.body.gallery) {
        project.gallery = req.body.gallery
      }
      if (req.body.mapCoords) {
        project.mapCoords = req.body.mapCoords
      }
      if (req.body.pin) {
        project.pin = req.body.pin
      }
      if (req.body.pdf) {
        project.pdf = req.body.pdf
      }
      if (req.body.options) {
        project.options = req.body.options
      }

      project.save((err, data) => {
        if (err) {
          console.log(err)
          res.send({
            success: false,
            message: `Project not saved!`
          })
        } else {
          res.send({
            success: true,
            message: `Project with ID_${data._id} saved saved!`,
          })
        }
      })


    }
  })
}

const getProjects = async (req, res, next) => {
    try {        
      const projects = await Project.find({}).sort({ _id: -1 })
      if (projects.length) {
        res.send({
          success: true, 
          projects: projects,
        })
      } else {
        res.sendStatus(500)
      }
    } catch (err) {
      next(err);
    }
}

const getProjectOne = async (req, res, next) => {
  try {
    var token = '99999';
    if (token) {
      Project.findById(req.params.id, (err, project) => {
        if (err) {
          res.sendStatus(500)
        } else {
          res.send({success: true, project: project})
        }
      })
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized'});
    }
  } catch (err) {
    next(err);
  }
}

const deleteProject = async (req, res, next) => {

  const token = await getToken(req.headers);
  if (!token) {
    return res.status(400).json({ message: "Ошибка авторизации" });
  }

  Project.findById(req.params.id, 'id', (err, project) => {
    if (err) {
      console.log(err)
    } else {
      console.log('removed: '+project.id) 
      const folder = projectFolderPath+project.id;
      rimraf(folder, function () { 
        console.log("delete-project done"); 
      });
    }
  })

  Project.remove({ _id: req.params.id }, err => {
    if (err) {
      res.sendStatus(500)  
    } else {
      res.sendStatus(200)
    }
  })

}

const uploadProjectFiles = async (req, res, next) => {
  const files = req.files
  files.forEach ( file => {
    const fileFormat = path.extname(file.filename)
    console.log('fileFormat ', fileFormat)
    const filename = file.filename
    const filenameResized = file.filename.split('.').slice(0, -1).join('.') + '-sm' + fileFormat
    const coverPath = file.destination + '/' + filename
    const coverSmPath = file.destination + '/' + filenameResized

    if (fileFormat !== '.pdf') {
      fs.copyFile(coverPath, coverSmPath, (err) => {
        if (err) throw err;
          sharp(coverSmPath)
          .resize(1000) 
          .jpeg({quality : 90})
          //.toFile(coverSmPath2)
          .toBuffer()
          .then( data => { 
            fs.writeFile(coverSmPath, data)
            console.log('sharp done', data)
          })
          .catch( err => { console.log('sharp error') });
      });
    }

  })
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

const changeProjectOrder = (req, res) => {
    const projects = req.body;
    let saved = [];
    let itemsProcessed = 0;
    projects.forEach(function(el,index,array) {
      itemsProcessed++;
      const postItem = el.project;
      const postOrder = el.order;
        Project.findById(postItem._id, 'order', (err, project) => {
          if (err) {
            console.log(err)
          } else {
            project.order = postOrder;
            project.save((err, data) => {
              if (err) {
                console.log(err)
              } else {
                saved.push(data._id)
              }
            })
      
          }
        })

        if(itemsProcessed === array.length) {
          console.log('all re-orders');
              
          res.send({
              success: true,
              message: `All projects saved!`,
            })
          }

    });
}

const getToken = function (headers) {
  console.log('getToken ', headers)
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
  addNewProject,
  editProject,
  getProjects,
  getProjectOne,
  deleteProject,
  uploadProjectFiles,
  changeProjectOrder
}
