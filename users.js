var mysql = require('./mysql.js')
var encrypt = require('./encrypt.js')

var Create = function (req,res)
{

}
module.exports.Create = Create

var Read = function (req,res)
{
    var query ="SELECT * FROM users"
    mysql.DB.query(query,null,function (getRes1)
    {
        var body_resp = getRes1.data
        //console.log(body_resp)
        encrypt.EncryptResponseBody(body_resp,function(getRes2){
            
            getRes1.data = getRes2.data
            res.send(getRes1)
        })
        
    })
}
module.exports.Read = Read

var Update = function (req,res)
{

}
module.exports.Create = Update

var Delete = function (req,res)
{

}
module.exports.Delete = Delete

