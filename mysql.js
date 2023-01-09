const mysql = require('mysql')
var util = require('util');
var futil = require('./utility.js');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'dans'
});

var DB = (function () {

 

    function _query(query, params, callback) {
        futil.logger.debug(futil.shtm() + "- [SQL GETGEN DATA] | QUERY:" + util.inspect(query));
        pool.getConnection(function (err, connection) {
            if (err) {
                futil.logger.debug(futil.shtm() + "- [SQL GETGEN DATA] | ERROR CONNECT MYSQL: " + util.inspect(JSON.stringify(err)));
                connection.release();
                callback(null, err);
                throw err;
            }

            connection.query(query, params, function (err, rows) {
                connection.release();

                var data = {
                    status: "00",
                    description: "SUCCESS"
                }

                if (!err) {
                    futil.logger.debug(futil.shtm() + "- [SQL GETGEN DATA] | " + util.inspect(JSON.stringify(rows)));
                    //console.log(rows.constructor.name)
                    if (rows.constructor.name == 'Array')
                    {
                        var get_data  = JSON.parse(JSON.stringify(rows))
                        if (get_data.length>0)
                        {
                            // data.status = '00'
                            // data.description = 'SUCCESS'

                            data["data"] = get_data
                            futil.logger.debug(futil.shtm() + "- [RESULT GETGEN DATA] | " + util.inspect(JSON.stringify(data)));
                        }
                        else
                        {
                            data.status = '17'
                            data.description = 'DATA TIDAK DITEMUKAN'
                            futil.logger.debug(futil.shtm() + "- [RESULT GETGEN DATA] | ERROR : " + util.inspect(JSON.stringify(data)));
                        }
                        
                    }
                   
                    callback(data);
                }
                else {
                    data.status = '17'
                    data.description = 'DATA TIDAK DITEMUKAN'

                    futil.logger.debug(futil.shtm() + "- [SQL GETGEN DATA] | ERROR CONNECT MYSQL: " + util.inspect(JSON.stringify(err)));
                    callback(null, data);
                }

            });

            connection.on('error', function (err) {
                connection.release();
                futil.logger.debug(futil.shtm() + "- [SQL GETGEN DATA] | ERROR CONNECT MYSQL: " + util.inspect(JSON.stringify(err)));
                callback(null, err);
                throw err;
            });
        });
    };

    return {
        query: _query
    };
})();

module.exports.DB = DB;