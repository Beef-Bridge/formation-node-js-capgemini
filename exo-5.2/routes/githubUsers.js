var express = require('express');
var router = express.Router();
const githubUsersController = require('../controllers/githubUsers');
const { checkUsernameFormat } = require('../middlewares/github.middleware');

/* GET Github users listing. */
router.get('/', githubUsersController.displayUsersList);
router.get('/:username', checkUsernameFormat, githubUsersController.displayUserDetail);

module.exports = router;
