const express = require('express');
const router = express.Router();
const feedbacksControllers = require("../controllers/feedbacksControllers");

router.get('/get-feedbacks/', feedbacksControllers.getFeedbacks)
router.get('/get-one-feedback/:id', feedbacksControllers.getOneFeedback)
router.post('/send-email/', feedbacksControllers.sendFeedback)
router.post('/delete-feedbacks/', feedbacksControllers.deleteFeedback)

module.exports = router;
