const express = require('express');
const router = express.Router();

const newController = require('../app/controllers/Newws');

router.get('/course', newws.show);
router.get('/', newController.index);

module.exports = router;