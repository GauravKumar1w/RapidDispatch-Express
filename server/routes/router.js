const express = require("express");
const router = express.Router();

const services = require("../services/render");
const controller = require('../controller/controller');

// HTML rendering routes
router.get('/', services.homeRoutes);
router.get('/view', services.viewTruck);
router.get('/update-truck', services.update_truck);
router.get('/showtruck', services.showTruck);
router.get('/updateTruck', services.updateTruck);
router.get('/viewPending', services.viewTruckPending);
router.get('/viewArrived', services.viewTruckArrived);
router.get('/add1', services.addTruck);
router.get('/add2', services.addcase);
router.get('/seetruckdetail', services.SeeTruckDetails);
router.get('/makepayment', services.MakePayment);
router.get('/createnewuser', services.createnewuser);
router.get('/contact', services.contactUs);
router.get("/login", services.login);
router.get("/managerview", services.mymanagerView);
router.get("/managerlogin", services.mymanagerlogin);
router.get("/register", services.register);
router.get('/manager', services.viewManager);
router.get('/success', services.success);
router.get('/failure', services.failure);
router.get('/about', services.aboutUs);

// API routes
router.post('/api/users', controller.create);
router.get('/api/users', controller.find);
router.put('/api/users/:id', controller.update);
router.delete('/api/users/:id', controller.delete);

router.post('/api/users2', controller.create2);
router.get('/api/users2', controller.find2);
router.post('/api/users3', controller.update2);

router.post('/api/manager', controller.createManager);
router.get('/api/manager', controller.findManager);
// In your route handler for processing payments



module.exports = router;
