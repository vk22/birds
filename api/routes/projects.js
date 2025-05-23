const express = require('express');
const router = express.Router();
const multer = require('multer');
const projectFolderPath = require("../config/config").projectFolderPath;
const projectsControllers = require('../controllers/projectsControllers'); 
const storageProject = multer.diskStorage({
  destination: function (req, file, cb) {
    const projectID = req.params.id;
    cb(null, projectFolderPath+projectID)
  },
  filename: function (req, file, cb) {
    const filenameHandled = file.originalname.replace(/['" #]+/g, '_');
    cb(null, filenameHandled)
  }
})
const upload = multer({ storage: storageProject })


/// Create New Project  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/add-project', projectsControllers.addNewProject)

/// Get All Projects ///
router.get('/projects/', projectsControllers.getProjects); 

/// Get One Project////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/get-project-one/:id', projectsControllers.getProjectOne)

//// Edit project
router.put('/project/:id', projectsControllers.editProject)

/// Delete Project ////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.delete('/delete-project/:id', projectsControllers.deleteProject)

/// Project Upload ////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/files-project-upload/:id', upload.array('files', 12), projectsControllers.uploadProjectFiles)

/// Change Project's Order ////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/order-projects/', projectsControllers.changeProjectOrder)


module.exports = router;