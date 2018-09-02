var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlBoard = require('../controllers/board');
var ctrlList = require('../controllers/list');
var ctrlCard = require('../controllers/card');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

//boards
router.post('/boards', auth, ctrlBoard.boardCreateOne);
router.get('/boards', auth, ctrlBoard.getAllBoardsOfUser);
router.get('/boards/:id', auth, ctrlBoard.getBoardData);

//lists
router.post('/boards/:id/lists', auth, ctrlList.listCreateOne);

//cards
router.post('/cards', auth, ctrlCard.cardCreateOne);
router.put('/move-cards/:id', auth, ctrlCard.cardHandleDrop);
router.put('/archive-cards/:id', auth, ctrlCard.cardArchiveToggle);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


module.exports = router;
