const router = require('express').Router();
const forms = require('../controllers').forms;

// auth middleware to be added for login
router.post("/newForm",forms.newForm);
router.post("/fetchByMail",forms.getFormsByMail);
router.post("/formBelongsToUser",forms.formBelongsToUser);
router.post("/submitFormResult",forms.submitFormResult);
router.post("/submitHTML",forms.submitHTML);
router.post("/getResponses",forms.getResponses);
router.post("/datatable",forms.customizedDatatable);
router.post("/deleteResponse",forms.deleteResponse);

module.exports=router;