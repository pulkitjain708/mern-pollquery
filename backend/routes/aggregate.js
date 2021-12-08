const router = require('express').Router();
const aggregate = require('../controllers/aggregate')

router.post("/",aggregate.clubbed);
// router.post("/rtnrr",aggregate.rtnrr);
// router.post("/timedQuery",aggregate.timedQuery);
// router.post("/eachUser",aggregate.eachUser)

module.exports=router;