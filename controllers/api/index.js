//imports router package & route files
const router = require('express').Router();
const userController = require('./user-controller.js');
const thoughtController = require('./thought-controller.js');

//sets router to redirect requests accordingly;
router.use('/users', userController);
router.use('/thoughts', thoughtController);

module.exports = router;