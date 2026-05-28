var express = require('express');
var router = express.Router();
const githubUsersController = require('../controllers/githubUsers');

/* GET Github users listing. */
router.get('/', githubUsersController.displayUsersList);
router.get('/:username', githubUsersController.displayUserDetail);

module.exports = router;
