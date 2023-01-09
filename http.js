var unirest = require('unirest');
var util = require('util');
var futil = require("./utility.js");


exports.callGetTransaction = function (body, url, callback) {
    var response = {
        status: '00',
        description: 'SUCCESS',
    };

    futil.logger.debug(futil.shtm() + "- [HTTPGET PROCESS] | REQUEST URL   : " + util.inspect(url, false, null))
    futil.logger.debug(futil.shtm() + "- [HTTPGET PROCESS] | REQUEST BODY  : " + util.inspect(body, false, null))

    unirest.get(url)
        // .headers(header)
        .query(body)
        .end(function (resp) {
            futil.logger.debug(futil.shtm() + "- [HTTPGET PROCESS] | RESPONSE BODY: " + util.inspect(resp.body, false, null));
            if (resp.status == 200) {
                if (typeof resp.body == 'undefined') {
                    response.status = '38'
                    response.description = 'INVALID PARSING RESPONSE DATA'
                    callback(response)
                } else {
                    var msg = resp.body
                    response.data = new Array(1)
                    response.data[0] = {}
                    response.data[0]['response'] = msg
                    callback(response);
                }
            } else {
                response.status = '40'
                response.description = 'INVALID RESPONSE'
                callback(response)
            }
        });
}


exports.callPostTransaction = function (args, url, reply) {
    var response = {
        status: '00',
        description: 'SUCCESS',
    };
    var sargs = JSON.stringify(args);
    var head = {
        'content-type': 'application/json'
    }
    futil.logger.debug(futil.shtm() + "- [---------------] | REQUEST URL: " + url)
    futil.logger.debug(futil.shtm() + "- [---------------] | REQUEST BODY: " + util.inspect(sargs))

    unirest.post(url).headers(head).send(sargs).end(function (rspPost) {

        if (typeof rspPost.body != 'undefined') {
            futil.logger.debug(futil.shtm() + '- [---------------] | RESPONSE BODY: ' + util.inspect(JSON.stringify(rspPost.body)));
            var msg = rspPost.body; //+ "").replace(/['\t,\r,\n]/g, "");

            response.data = new Array(1)
            response.data[0] = {}
            response.data[0]['response'] = msg
            reply(msg);
        } else {
            futil.logger.debug(futil.shtm() + '- [---------------] | RESPONSE BODY: UNDEFINED');
            response.status = '24'
            response.description = 'TRANSAKSI GAGAL|RESPONSE BODY UNDEFINED'
            reply(response)
        }
    });
}

