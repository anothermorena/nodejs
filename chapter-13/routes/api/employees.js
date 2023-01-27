const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router
  .route('/')
  .get(employeesController.getAllEmployees)
  .post(
    //only admins and editors are allowed to access this route
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.createNewEmployee
  )
  .put(
    //only admins and editors are allowed to access this route
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.updateEmployee
  )
  .delete(
    //only admins are allowed to access this route
    verifyRoles(ROLES_LIST.Admin),
    employeesController.deleteEmployee
  );

router.route('/:id').get(employeesController.getEmployee);

module.exports = router;
