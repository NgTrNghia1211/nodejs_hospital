var express = require('express');
var router = express.Router();
const route = require('.');

const DoctorController = require('../app/Controllers/DoctorController');
const AuthMiddleware = require('../app/Middleware/AuthMiddleware');


// ? route to show all doctor
router.get('/', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkPrimeDoctor, DoctorController.show);

// ? route to post request find doctor
router.post('/', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkPrimeDoctor, DoctorController.search);

/* router.get('/khoa/:id', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, DoctorController.showDoctorByKhoa); */

// ? route to render view of create doctor
router.get('/new', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkPrimeDoctor, DoctorController.createView);
router.post('/new', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkPrimeDoctor, DoctorController.createNewDoctor)

// ? route to show all patient of a doctor
router.get('/patient/:id', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkPrimeDoctor, DoctorController.showPatient);

// ? route to find a patient of a  doctor
router.post('/patient/:id', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkPrimeDoctor,  DoctorController.searchPatient);

// ? route to render view of update doctor
router.get('/edit/:id',  AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkPrimeDoctor, DoctorController.edit);
router.put('/edit/:id', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkPrimeDoctor, DoctorController.putEdit);


module.exports = router;