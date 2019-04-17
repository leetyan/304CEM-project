var mysql = require('mysql');
var conf = require('c:/Users/hasee/Desktop/304CEM/conn');
 
var connection = mysql.createConnection(conf.db);
var sql = '';
 
module.exports = {
    items: function (req, callback) {
        sql = 'SELECT * FROM recipe';
        return connection.query(sql, callback);
    },
    item: function (req, callback) {
        sql = mysql.format('SELECT * FROM recipe WHERE username = ?', [req.params.id]);
        return connection.query(sql, callback);
    },
    add: function (req, callback) {
        sql = mysql.format('INSERT INTO recipe SET ?', req.body);
        return connection.query(sql, callback);
    },
    delete: function (req, callback) {
        sql = mysql.format('DELETE FROM recipe WHERE username = ?', [req.params.id]);
        return connection.query(sql, callback);
    },
    put: function (req, callback) {
        // 使用 SQL 交易功能實現資料回滾，因為是先刪除資料在新增，且 Key 值須相同，如刪除後發現要新增的資料有誤，則使用 rollback() 回滾
        connection.beginTransaction(function (err) {
            if (err) throw err;
             
            sql = mysql.format('DELETE FROM recipe WHERE username = ?', [req.params.id]);
 
            connection.query(sql, function (err, results, fields) {
                // SQL DELETE 成功 results.affectedRows 會返回 1，反之 0
                if (results.affectedRows) {
                    req.body.username = req.params.username;
                    sql = mysql.format('INSERT INTO recipe SET ?', req.body);
                     
                    connection.query(sql, function (err, results, fields) {
                        // 請求不正確
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
                    // 指定的資源已不存在
                    callback(err, 410);
                }
            });
        });
    },
    patch: function (req, callback) {       
        sql = mysql.format('UPDATE recipe SET ? WHERE username = ?', [req.body, req.params.id]);
        return connection.query(sql, callback);
    }
};