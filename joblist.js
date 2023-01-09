var encrypt = require('./encrypt.js')
var http = require('./http.js')

var Read = function (req,res)
{
    var response = {
        status: '00',
        description: 'SUCCESS',
    };

    var url = process.env.API_JOBLIST
    http.callGetTransaction("",url, function(getRes){
        if (getRes.status =='00'){
            var reply = getRes.data[0].response[0]
            encrypt.EncryptResponseBody(reply,function(getRes1){
                response.data = new Array(1)
                response.data[0] = getRes1.data
                res.send(response)
            })

        }
    })
}
module.exports.Read = Read

var ReadParam = function (req,res)
{
    var params = req.params.param
    //params = 

    var response = {
        status: '00',
        description: 'SUCCESS',
    }

    var url = process.env.API_JOBLIST + '?'+ params 
    //console.log('url:',url)
    http.callGetTransaction("",url, function(getRes){
        if (getRes.status =='00'){
            var reply = getRes.data[0].response

            encrypt.EncryptResponseBody(reply,function(getRes1){
                response.data = new Array(1)
                response.data[0] = getRes1.data
                res.send(response)
            })

          
            
        }
    })
}
module.exports.ReadParam = ReadParam

var ReadByPage = function (req,res)
{
    var params = req.params.page
    //console.log(params)
    //params = 

    var response = {
        status: '00',
        description: 'SUCCESS',
    }

    var url = process.env.API_JOBLIST + '?page='+ params 
    //console.log('url:',url)
    http.callGetTransaction("",url, function(getRes){
        if (getRes.status =='00'){
            var reply = getRes.data[0].response[0]

            encrypt.EncryptResponseBody(reply,function(getRes1){
                response.data = new Array(1)
                response.data[0] = getRes1.data
                res.send(response)
            })

          
            
        }
    })
}
module.exports.ReadByPage = ReadByPage

var ReadDetail = function (req,res)
{
    var params = req.params.id
    //console.log(params)
    //params = 

    var response = {
        status: '00',
        description: 'SUCCESS',
    }

    var url = process.env.API_JOBDETAIL + params 
    //console.log('url:',url)
    http.callGetTransaction("",url, function(getRes){
        if (getRes.status =='00'){
            var reply = getRes.data[0].response
            //console.log(reply)
            encrypt.EncryptResponseBody(reply,function(getRes1){
                response.data = new Array(1)
                response.data[0] = getRes1.data
                res.send(response)
            })

          
            
        }
    })
}
module.exports.ReadDetail = ReadDetail
