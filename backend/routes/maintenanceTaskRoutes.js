const express = require('express');
const router = express.Router();
const maintenanceTaskController = require('../controller/maintenanceTaskController');

router.get('/get-maintenance-tasks/:propertyId', maintenanceTaskController.getMaintenanceTasks);
router.get('/get-maintenance-tasks/', maintenanceTaskController.getMaintenanceTasks);
router.get('/get-maintenance-task/:id', maintenanceTaskController.getMaintenanceTask);

router.post('/edit-maintenance-task', maintenanceTaskController.editMaintenanceTask);
router.post('/delete-maintenance-task/', maintenanceTaskController.deleteMaintenanceTask);
router.post('/create-maintenance-task', maintenanceTaskController.createMaintenanceTask);

router.get('/get-upcoming-tasks/', maintenanceTaskController.getUpcomingTasks);

module.exports = router;