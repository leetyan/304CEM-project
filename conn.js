// var mysql      = require('./node_modules/mysql');
// const express = require('./node_modules/express');
// var app = express();
// const bodyparser = require('./node_modules/body-parser');

// app.use(bodyparser.json());

// var connection = mysql.createConnection({
//   host     : '127.0.0.1',
//   user     : 'root',
//   password : 'root',
//   database : 'webapi'
// });

// connection.connect((err) =>{
//     if(!err)
//     console.log("DB connection succeded.");
//     else
//     console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
// });
 
// // app.listen(8080);

module.exports = {
  db: {
      host:       '127.0.0.1',
      user:       'root',
      password:   'root',
      database:   'webapi'
  },
  port: 8080,
};
