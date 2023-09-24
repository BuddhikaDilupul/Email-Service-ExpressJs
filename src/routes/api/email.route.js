const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");
const emailValidation = require("../../validations/email.validation");
const emailController = require("../../controllers/email.controller");
const { authenticate } = require("../../middlewares/authenticate");
const ROLES = require("../../ROLES");
const { authorize } = require("../../middlewares/authorize");


router.post(
  "/sa",
  validate(emailValidation.reset),
  // authenticate,
  // authorize([ROLES.patient,ROLES.reciptionist]),
  emailController.statusAlert
);
router.post(
  "/new",
  validate(emailValidation.reset),
  // authenticate,
  // authorize([ROLES.patient,ROLES.reciptionist]),
  emailController.newUser
);
router.post(
  "/appointment",
  validate(emailValidation.newAppointment),
  // authenticate,
  // authorize([ROLES.patient,ROLES.reciptionist]),
  emailController.newAppoointment
);
router.post(
  "/",
  validate(emailValidation.reset),
  // authenticate,
  // authorize([ROLES.patient,ROLES.reciptionist]),
  emailController.resetPassword
);
module.exports = router;
