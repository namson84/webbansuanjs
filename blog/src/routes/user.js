const express = require('express');
const router = express.Router();



const UserController = require('../app/controllers/UserController');

router.post('/create', UserController.create);
router.get('/register', UserController.register);
router.get('/login', UserController.login);
router.post('/confirm', UserController.confirmLogin);
router.get('/logout', UserController.logout);
router.get('/profile', UserController.profile);
router.get('/profileById/:id',UserController.profileById);
router.delete('/delete/:id', UserController.deleteUser);
router.post('/:id', UserController.updateProfile);
router.get('/list', UserController.users);

module.exports = router