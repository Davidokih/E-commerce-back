const { upload } = require('../utils/multer');
const express = require('express');

const router = express.Router();

const {
    getAllUsers,
    getOneUser,
    deleteUser,
    createUser,
    signInUser
} = require('../controller/userController');

router.route('/').get(getAllUsers);
router.route('/:id').get(getOneUser).delete(deleteUser);

router.route('/register').post(upload, createUser);
router.route('/signIn').post(signInUser);

module.exports = router;