const router = require('express').Router();
const {
  getUsers, getUser, createUser, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.get('/me', getUserInfo);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);
router.post('/', createUser);

module.exports = router;
