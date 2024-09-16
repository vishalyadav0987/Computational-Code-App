const express = require('express');
const protectedRoute = require('../middleware/protectedRoute');
const { pushProject, getAllProjectOfUser, getAllprojectList, updateProjectDetails, likeDislikeProject, deleteProject, incrementProjectViews, getSingleProject } = require('../controllers/DevControllers');
const router = express.Router();

router.route('/project/push').post(protectedRoute, pushProject);
router.route('/project/user/get-all').get(protectedRoute, getAllProjectOfUser);
router.route('/project/get-all').get(getAllprojectList);
router.route('/project/get/:id').get(protectedRoute, getSingleProject);
router.route('/project/like-and-dislike/:projectID').post(protectedRoute, likeDislikeProject);
router.route('/project/views/:projectID').get(protectedRoute, incrementProjectViews);
router.route('/project/update/:projectID').put(protectedRoute, updateProjectDetails);
router.route('/project/delete/:projectID').delete(protectedRoute, deleteProject);

module.exports = router;