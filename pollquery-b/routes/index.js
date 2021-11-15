const router = require('express').Router();
// const path = __dirname.split("routes")[0];


router.use('/register', require('./registration'));
router.use('/login', require('./login'));
router.use('/FrmSrv',require('./forms'))

// router.get('/',(req,res)=>{
//     res.sendFile(`${path}/static/html/login.html`);
// })

module.exports = router;