const mysql = require('mysql2');
const connection = require('../../config/db/index');

class NurseController {
    showNurse(req, res, next) {
        let sql = "SELECT * FROM yta WHERE Mayta = ?"
        let thongtinyta;
        connection.query(sql, [req.params.id] ,function(err, results) {
            if (err) throw err;
            thongtinyta = results;
        })
        sql = "SELECT * FROM catruc WHERE Mayta = ?";
        connection.query(sql, [req.params.id] ,function(err, results) {
            if (err) throw err;
            res.render('nurse/nurseInfo', {
                catruc: results,
                thongtinyta: thongtinyta
            });
            
        })
    }
}




module.exports = new NurseController;