const mysql = require('mysql2');
const connection = require('../../config/db/index');

class DoctorController {
    // ? [GET] /doctor
    show(req, res, next) {
        let sql = "SELECT * FROM bacsi"
        connection.query(sql, function(err, results) {
            if (err) throw err;
            res.render('doctor/doctor', {
                results: results
            })
        })
    }

    // ? [POST] /doctor => find doctor
    search(req, res, next) {
        let searchTerm = req.body.search;
        if (!req.body.search) {
            res.redirect('#');
        }
        let sql = "SELECT * FROM bacsi WHERE Ho LIKE ? or Ten LIKE ? or Makhoa LIKE ?";
        connection.query(sql, ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], function(err, results) {
            if (err) throw err;
            res.render('doctor/doctor', {
                results: results
            })
            //res.redirect('#');
        });
    }

    //? [GET] /new => render create new
    createView(req, res, next) {
        res.render('doctor/createNew');
    }

    // ? [POST] /new => post request to create new
    createNewDoctor(req, res, next) {
        const {fName, lName, address, birthday, sdt, mabacsi, sex, makhoa} = req.body;
        let sql = 'INSERT INTO bacsi SET Ho = ?, Ten = ?, Gioitinh = ?, Mabacsi = ?, SDT = ?, Ngaysinh = ?, Diachi = ?, Makhoa = ?'
        connection.query(sql, [fName, lName, sex, mabacsi, sdt, birthday, address, makhoa], function(err, results) {
            if (err) {
                if (err.errno === 1062) {
                    res.render('error/error', {
                        statusCode: 1062,
                        message: 'duplicate key values',
                        toDo: 'Please submit again'
                    })
                } else if (err.errno === 1644) {
                    res.render('error/error', {
                        statusCode: err.errno,
                        message: err.sqlMessage,
                        toDo: 'Please submit again'
                    })
                } 
                else throw err;
            } else {
                res.redirect('/doctor');
            }
        });
    }



    //? [GET] /edit/:id => render edit view
    edit(req, res, next) {
        let sql = "SELECT * FROM bacsi WHERE Mabacsi = ?";
        connection.query(sql, [req.params.id], function(err, result) {
            if (err) throw err;
            console.log(result);
            res.render('doctor/edit', {
                result: result
            })
        });
    }

    putEdit(req, res, next) {
        let {fName, lName, address, birthday, sdt, mabacsi, sex, makhoa} = req.body;
        
        let sql = 'UPDATE bacsi SET Ho = ?, Ten = ?, Diachi = ?, Ngaysinh = ?, SDT = ?, Gioitinh = ?, Makhoa = ? where Mabacsi = ?'
        connection.query(sql, [fName, lName, address, birthday, sdt, sex, makhoa, mabacsi], function(err, result) {
            if (err) {
                res.render('error/error', {
                    statusCode: err.errno,
                    message: err.sqlMessage,
                    toDo: 'Please submit again'
                })
            } else {
                res.redirect('/doctor');
            }
        })
    }



    // ? [GET] /patient/:id => render patient of a doctor
    showPatient(req, res, next) {
        let sql = "SELECT * FROM benhnhan WHERE Mabenhnhan in (SELECT Mabenhnhan FROM hosokham WHERE Mabacsi = ?)";
        connection.query(sql, [req.params.id], function(err, results) {
            if (err) throw err;
            console.log(results);
            res.render('patient/patient', {
                results: results,
                Mabacsi: req.params.id
            })
            //res.redirect('#');
        });
    }

    // ? [POST] /doctor/patient/:id => find user
    searchPatient(req, res, next) {
        let searchTerm = req.body.search;
        if (!req.body.search) {
            res.redirect('#');
        }
        let sql = "SELECT * FROM benhnhan WHERE Mabenhnhan in (SELECT Mabenhnhan FROM hosokham WHERE Mabacsi = ?) AND (Ho LIKE ? or Ten LIKE ?)";
        connection.query(sql, [req.params.id ,'%' + searchTerm + '%', '%' + searchTerm + '%'], function(err, results) {
            if (err) throw err;
            console.log(results);
            res.render('patient/patient', {
                results: results,
                Mabacsi: req.params.id
            })
            //res.redirect('#');
        });
    }

    showDoctorByKhoa(req, res, next) {
        let sql = "SELECT * FROM bacsi WHERE Makhoa = ?";
        connection.query(sql, [req.params.id], function(err, results) {
            if (err) throw err;
            console.log(results);
            res.render('doctor/doctor', {
                results: results,
            })
        });
    };

}




module.exports = new DoctorController;