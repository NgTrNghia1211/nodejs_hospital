const { request, response } = require('express');
const mysql = require('mysql2');
const connection = require('../../config/db/index');

class HomeController {
    show(req, res, next) {
        res.render('home');
    }
}




module.exports = new HomeController;