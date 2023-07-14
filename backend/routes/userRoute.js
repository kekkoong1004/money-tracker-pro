const express = require('express');
const router = express.Router();
const {
  addNewUser,
  loginUser,
  getAllUsers,
  getOneUser,
  updateUser,
  updatePassword,
  updateUserImage,
  getProfileImage,
  deleteOldImage,
  resetPassword,
  renewPasswordWithToken,
} = require('../controllers/user');
const { checkAuthMiddleware } = require('../helpers/auth');
const { upload } = require('../controllers/user');

router
  .post('/register', addNewUser)
  .post('/login', loginUser)
  .post(
    '/imageUpload/:userId',
    checkAuthMiddleware,
    upload.single('image'),
    deleteOldImage,
    updateUserImage
  )
  .post('/resetPassword', resetPassword);
router
  .get('/getAllUsers', getAllUsers)
  .get('/getOneUser/:userId', getOneUser)
  .get('/getProfileImage/:userId/:key', getProfileImage);
router.put('/updateUser/:userId', checkAuthMiddleware, updateUser);
router
  .patch('/updatePassword/:userId', checkAuthMiddleware, updatePassword)
  .patch('/renewPasswordWithToken', renewPasswordWithToken);

module.exports = router;
