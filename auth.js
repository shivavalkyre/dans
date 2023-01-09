const mysql = require('./mysql')
const encrypt = require('./encrypt.js')
const decrypt = require('./decrypt.js')
const jwt = require('jsonwebtoken');
var util = require('util');
var futil = require('./utility.js');

var  generateAccessToken = function (username) {
  
    var token = jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '3600s' })
    futil.logger.debug(futil.shtm() + "- [GEN TOKEN] | DATA:" + util.inspect(token));
    return token;
  }
module.exports.generateAccessToken = generateAccessToken;

var authAccessToken = function  (req,res,next){
    
    var data = {
        status: "00",
        description: "SUCCESS"
    }

    futil.logger.debug(futil.shtm() + "- [AUTH CEK REQUEST ] | DATA:" + util.inspect(req.headers['authorization']));
    var token = req.headers['authorization'];
    //console.log(token)
    var hasAuth=false;
    try {
        var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        //console.log(decoded)
        hasAuth = true;
        next() 
      } catch(err) {
        // err
        hasAuth = false;
        data.status = '17'
        data.description = 'TOKEN NOT VALID'
        res.status(400).send(data)
      }

      futil.logger.debug(futil.shtm() + "- [AUTH CEK] | DATA:" + util.inspect(hasAuth));
      
}

module.exports.authAccessToken = authAccessToken;


var Login = function (req,res)
{

    var data = req.body
    //console.log(data.data)
    // var username = param.username
    // var password = param.password

    var query = "SELECT * FROM encrypts WHERE encrypt_data=?"
    mysql.DB.query(query,[data.data],function(getRes0){
        //console.log('getRs0:',getRes0)
        if(getRes0.status=='00')
        {
            var iv = getRes0.data[0].iv
            var key = getRes0.data[0].kol
            var encryptedData = data.data
    
            var datas = {"encryptedData": encryptedData,"iv":iv,"key":key}
            //console.log('datas:',datas)
    
            decrypt.DecryptData(datas,function(getRes1){
                var dec = getRes1
                var username = dec.username
                var password = dec.password
            
                var query ='SELECT * FROM users  WHERE username=? AND password=?'
                mysql.DB.query(query,[username,password], function(getRes2){
                    //res.send(getRes2)
                    if (getRes2.status == '00'){
                        var token = generateAccessToken({"username":username})
                        res.setHeader('session',token)
                        encrypt.EncryptResponseBody(getRes2.data[0],function(getRes3){
                            getRes2.data[0] = getRes3.data
                            res.send(getRes2)
                        })
                    }else{
                        res.send(getRes2)
                    }
                    
                })
               
            })
        }
        else
        {
            //res.send(getRes0)
        }
    
            
       
    })
   
}
module.exports.Login = Login