const router = require('express').Router();
const login = require('../controllers').login;

// auth middleware to be added for login
router.post("/",login.loginController);

module.exports=router;