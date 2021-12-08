const router = require('express').Router()
const registration = require('../controllers/index').registration;

router.post('/',registration.registerController);
router.post('/verifyToken',registration.verifyTokenController);

module.exports = router;
