const { request } = require('express');
const mysql = require('mysql2');
const connection = require('../../config/db/index');

class RecordController {
    //? [GET, POST] => ho so don thuoc
    hosodonthuocNew(req, res, next) {
        let sql = 'SELECT max(Maphieukedon) as max FROM phieukedon;'
        let curMaphieukedon
        connection.query(sql, function (err,results) {
            curMaphieukedon = results[0]
        })
        sql = 'SELECT Madonthuoc, Tenthuoc FROM donthuoc'
        connection.query(sql, function (err,results) {
            //res.send(results);
            res.render('record/hosodonthuoc', {
                madonthuoc: results,
                curMaphieukedon,
            })
        })
    }

    submitNewHosodonthuoc(req, res) {
        let madonthuoc = req.body.madonthuoc;
        madonthuoc = madonthuoc.substring(0, madonthuoc.indexOf('-')-1);
        let {mabacsi, mabenhnhan, ngaykedon, maphieukedon} = req.body;
        let sql = 'INSERT INTO phieukedon SET Maphieukedon = ?, Mabacsi = ?, Madonthuoc = ?, Mabenhnhan = ?, Ngaykedon = ?';
        connection.query(sql, [maphieukedon, mabacsi, madonthuoc, mabenhnhan, ngaykedon], function(err, results) {
            if (err) {
                res.render('error/error', {
                    statusCode: err.errno,
                    message: err.sqlMessage,
                    toDo: 'Please submit again'
                })
            } else {
                res.redirect('/patient/' + mabenhnhan);
            }
        });
    }

    // ?[GET, POST] => ho so kham benh
    hosokhamNew(req, res, next) {
        let sql = 'SELECT max(Mahoso) as max FROM hosokham;'
        let curMahoso;
        connection.query(sql, function (err,results) {
            curMahoso = results[0]
        })
        sql = 'SELECT Mabenh, Tenbenh FROM benh'
        connection.query(sql, function (err,results) {
            //res.send(results);
            res.render('record/hosokham', {
                benh: results,
                curMahoso,
            })
        })
    }

    submitNewHosokham(req, res, next) {
        let mabenh = req.body.mabenh;
        mabenh = mabenh.substring(0, mabenh.indexOf('-')-1);
        let {mabacsi, mabenhnhan, mahoso} = req.body;
        let sql = 'INSERT INTO hosokham SET Mahoso = ?, Mabacsi = ?, Mabenhnhan = ?, Mabenh = ?';
        connection.query(sql, [mahoso, mabacsi, mabenhnhan, mabenh], function(err, results) {
            if (err) {
                res.render('error/error', {
                    statusCode: err.errno,
                    message: err.sqlMessage,
                    toDo: 'Please submit again'
                })
            } else {
                res.redirect('/doctor/patient/' + mabacsi);
            }
        });
    }

    // ? [GET, POST] => ho so xet nghiem
    hosoxetnghiemNew(req, res, next) {
        let sql = 'SELECT max(Maphieuxetnghiem) as max FROM phieuxetnghiem;'
        let curMaphieuxetnghiem;
        connection.query(sql, function (err,results) {
            curMaphieuxetnghiem = results[0]
        })
        sql = 'SELECT Maloaixetnghiem, Tenloai FROM loaixetnghiem'
        connection.query(sql, function (err,results) {
            //res.send(results);
            res.render('record/hosoxetnghiem', {
                xetnghiem: results,
                curMaphieuxetnghiem,
            })
        })
        
    }

    submitNewHosoxetnghiem(req, res, next) {
        let maloaixetnghiem = req.body.maloaixetnghiem;
        maloaixetnghiem = maloaixetnghiem.substring(0, maloaixetnghiem.indexOf('-')-1);
        let {mabenhnhan, maphieuxetnghiem, ketqua, ngayxetnghiem} = req.body;
        let sql = 'INSERT INTO phieuxetnghiem SET Mabenhnhan = ?, Maloaixetnghiem = ?, Maphieuxetnghiem = ?, Ketqua = ?, Ngayxetnghiem = ?';
        connection.query(sql, [mabenhnhan, maloaixetnghiem, maphieuxetnghiem, ketqua, ngayxetnghiem], function(err, results) {
            if (err) {
                res.render('error/error', {
                    statusCode: err.errno,
                    message: err.sqlMessage,
                    toDo: 'Please submit again'
                })
            } else {
                res.redirect('/patient/' + mabenhnhan);
            }
        });
    }

    //? [GET, POST] => ho so nhap vien
    hosonhapvienNew(req, res, next) {
        let sql = 'SELECT max(Manhapvien) AS max FROM hosonhapvien';
        let curManhapvien
        connection.query(sql, function (err,results) {
            curManhapvien = results[0]
        })
        sql = 'SELECT * from phong where Tinhtrang = ?'
        connection.query(sql, ['t'], function (err,results) {
            res.render('record/hosonhapvien', {
                phong: results,
                curManhapvien
            });
        })
    }

    submitNewHosonhapvien(req, res, next) {
        let {mabenhnhan, ngaynhapvien, manhapvien, maphong} = req.body;
        maphong = maphong.substring(0, maphong.indexOf('-')-1);
        let sql = 'INSERT INTO hosonhapvien SET mabenhnhan = ?, ngaynhapvien = ?, manhapvien = ?, maphong = ?';
        connection.query(sql, [mabenhnhan, ngaynhapvien, manhapvien, maphong], function(err, results) {
            if (err) {
                res.render('error/error', {
                    statusCode: err.errno,
                    message: err.sqlMessage,
                    toDo: 'Please submit again'
                })
            } else {
                res.redirect('/patient/' + mabenhnhan);
            }
        });
    }
    
    changeDateHosonhapvien(req, res, next) {
        //res.send(req.body);
        let {ngayxuatvien, mabenhnhan} = req.body;
        let sql = 'UPDATE hosonhapvien SET ngayxuatvien = ? WHERE Manhapvien = ?'
        connection.query(sql, [ngayxuatvien, req.params.id], function (err,results) {
            if (err) {
                if (err.errno === 1062) {
                    res.render('error/error', {
                        statusCode: 1062,
                        message: 'duplicate key values',
                        toDo: 'Please submit again'
                    })
                } else if (err.errno === 1452) {
                    res.render('error/error', {
                        statusCode: 1452,
                        message: 'failed constraint validation',
                        toDo: 'Please submit again'
                    })
                } else throw err;
            } else {
                res.redirect('/patient/' + mabenhnhan);
            }
        })

    }
}




module.exports = new RecordController;