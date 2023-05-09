const { request, response } = require('express');
const mysql = require('mysql2');
const connection = require('../../config/db/index');
const jwt = require('jsonwebtoken');

class LoginController {
    show(req, res, next) {
        res.render('login/login');
    }

    // ? [POST] -> login request
    checkLogin(req, res, next) {
        console.log(req.body);
        if (!req.body.role) {
            res.send('pls input appropriate role');
        } else {
            let sql = 'SELECT * FROM basedrole WHERE role = ? and password = ?';
            connection.query(sql, [req.body.role, req.body.password], function (err, result) {
                if (err) { console.log(err) }
                if (!result.length) {
                    res.render('error/error', {
                        statusCode: 401,
                        message: 'Not found role',
                        toDo: 'Please login first'
                    });
                } else {
                    const toCreateToken = {
                        role: req.body.role
                    };
                    const accessToken = jwt.sign(toCreateToken, 'project');
                    res.cookie("jwt", accessToken);
                    console.log({ accessToken });
                    res.redirect('/');
                }   
                
            });

        }
    }

    logout(req, res, next) {
        res.cookie('jwt', '');
        res.redirect('/');
    }
}

module.exports = new LoginController;