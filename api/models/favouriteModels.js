var mysql = require('mysql');
var conf = require('c:/Users/hasee/Desktop/304CEM/conn');
 
var connection = mysql.createConnection(conf.db);
var sql = '';
 
module.exports = {
    items: function (req, callback) {
        sql = 'SELECT * FROM favourite';
        return connection.query(sql, callback);
    },
    item: function (req, callback) {
        sql = mysql.format('SELECT * FROM favourite WHERE name = ?', [req.params.id]);
        return connection.query(sql, callback);
    },
    add: function (req, callback) {
        sql = mysql.format('INSERT INTO favourite SET ?', req.body);
        return connection.query(sql, callback);
    },
    delete: function (req, callback) {
        sql = mysql.format('DELETE FROM favourite WHERE name = ?', [req.params.id]);
        return connection.query(sql, callback);
    },
    put: function (req, callback) {
        
        connection.beginTransaction(function (err) {
            if (err) throw err;
             
            sql = mysql.format('DELETE FROM favourite WHERE name = ?', [req.params.id]);
 
            connection.query(sql, function (err, results, fields) {
               
                if (results.affectedRows) {
                    req.body.username = req.params.username;
                    sql = mysql.format('INSERT INTO favourite SET ?', req.body);
                     
                    connection.query(sql, function (err, results, fields) {
                       
                        if (err) {
                            connection.rollback(function () {
                                callback(err, 400);
                            });
                        } else {
                            connection.commit(function (err) {
                                if (err) callback(err, 400);
     
                                callback(err, 200);
                            });
                        }                        
                    });
                } else {
                    callback(err, 410);
                }
            });
        });
    },
    patch: function (req, callback) {       
        sql = mysql.format('UPDATE favourite SET ? WHERE name = ?', [req.body, req.params.id]);
        return connection.query(sql, callback);
    }
};