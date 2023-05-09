const { request } = require('express');
const mysql = require('mysql2');
const connection = require('../../config/db/index');

class PatientController {
    show(req, res, next) {
        let sql = "SELECT HOSOKHAM.*,BACSI.*,Khoa.Tenkhoa FROM (HOSOKHAM INNER JOIN BACSI USING(Mabacsi)) INNER JOIN KHOA USING(Makhoa) WHERE Mabenhnhan=?;";
        let phieuxetnghiem;
        let donthuoc;
        let hosonhapvien;
        let thongtinbenhnhan;
        let hosokham;
        connection.query(sql, [req.params.id], function (err, results) {
            if (err) throw err;
            hosokham = results;
        })
        sql = "SELECT * FROM phieuxetnghiem WHERE Mabenhnhan = ?";
        connection.query(sql, [req.params.id], function (err, results) {
            if (err) throw err;
            phieuxetnghiem = results;
        })
        sql = "SELECT * FROM hosonhapvien WHERE Mabenhnhan = ?";
        //sql= "SELECT hosonhapvien.Manhapvien,hosonhapvien.Maphong,hosonhapvien.Ngaynhapvien,hosonhapvien.Ngayxuatvien,catruc.Mayta from hosonhapvien inner join catruc using(Maphong) where Mabenhnhan=?"
        connection.query(sql, [req.params.id], function (err, results) {
            if (err) throw err;
            hosonhapvien = results;
        })
        sql = "SELECT * FROM benhnhan WHERE Mabenhnhan = ?";
        connection.query(sql, [req.params.id], function (err, results) {
            if (err) throw err;
            thongtinbenhnhan = results;
        })
        
        //sql = "SELECT donthuoc.*,phieukedon.Ngaykedon,phieukedon.Mabacsi from donthuoc inner join phieukedon using(Madonthuoc) where Mabenhnhan= ?;";
        sql = "SELECT donthuoc.*,phieukedon.Ngaykedon,phieukedon.Mabacsi,bacsi.*,khoa.Tenkhoa from ( (donthuoc inner join phieukedon using(Madonthuoc)) inner join bacsi using(Mabacsi) )inner join Khoa using (Makhoa) where Mabenhnhan=?;";
        connection.query(sql, [req.params.id], function (err, results) {
            if (err) throw err;
            donthuoc = results;
            //res.send(donthuoc);
            //res.send(donthuoc);
            res.render('patient/patientInfo', {
                phieuxetnghiem: phieuxetnghiem,
                donthuoc: donthuoc,
                hosonhapvien: hosonhapvien,
                thongtinbenhnhan: thongtinbenhnhan,
                hosokham: hosokham,
            })

        })
    }
    
    createView(req, res, next) {
        res.render('patient/create');
    }

    createNewPatient(req, res, next) {
        const {fName, lName, address, birthday, sdt, mabenhnhan, sex} = req.body;
        let sql = 'INSERT INTO benhnhan SET Ho = ?, Ten = ?, Mabenhnhan = ?, Gioitinh = ?, Ngaysinh = ?, SDT = ?, Diachi = ?'
        connection.query(sql, [fName, lName, mabenhnhan, sex, birthday, sdt, address], function(err, results) {
            if (err) {
                if (err.errno === 1062) {
                    res.render('error/error', {
                        statusCode: 1062,
                        message: 'duplicate key values',
                        toDo: 'Please submit again'
                    })
                } else throw err;
            } else {
                res.redirect('/patient/' + mabenhnhan);
            }
        });
    }

    editView(req, res, next) {
        let sql = 'SELECT * FROM benhnhan where Mabenhnhan = ?';
        connection.query(sql, [req.params.id], function(err, results) {
            if (err) {
                console.log(err)
                throw err;
            } else {
                res.render('patient/edit', {
                    benhnhan: results,
                })
            }
        })
    }

    putEdit(req, res, next) {
        let {fName, lName, address, birthday, sdt, mabenhnhan, sex} = req.body;
        console.log(fName, lName, address, birthday, sdt, mabenhnhan, sex)
        let sql = 'UPDATE benhnhan SET Ho = ?, Ten = ?, Diachi = ?, Ngaysinh = ?, SDT = ?, Gioitinh = ? where Mabenhnhan = ?'
        connection.query(sql, [fName, lName, address, birthday, sdt, sex, mabenhnhan], function(err, result) {
            console.log(sql)
            if (err) {
                console.log(err);
                res.render('error/error', {
                    statusCode: err.errno,
                    message: err.sqlMessage,
                    toDo: 'Please submit again'
                })
            } else {
                res.redirect('/patient/' + mabenhnhan);
            }
        })
    }

}





module.exports = new PatientController;