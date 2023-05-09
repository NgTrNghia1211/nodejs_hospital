const DoctorRouter = require('./doctor');
const PatientRouter = require('./patient');
const NurseRouter = require('./nurse');
const HomeRouter = require('./home');
const LoginRouter = require('./login');
const LogoutRouter = require('./logout');
const RecordRouter = require('./record');
const connection = require('../config/db/index');
const mysql = require('mysql2');

function route(app) {
    app.use('/doctor', DoctorRouter)
    app.use('/patient', PatientRouter)
    app.use('/nurse', NurseRouter)
    app.use('/login', LoginRouter)
    app.use('/logout', LogoutRouter)
    app.use('/record', RecordRouter)
    app.use('/', HomeRouter)
}

module.exports = route;
