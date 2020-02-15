var mysql=require('mysql');
var dbconfig=require('./dbconfig/mysql');

module.exports={
  query : function(sql,params,callback){
        //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
        var connection = mysql.createConnection(dbconfig);
        connection.connect(function(err){
            if(err){
                console.log('数据库连接失败');
                //throw err;
            }
         //开始数据操作
        connection.query( sql, params, function(err,results,fields ){
           if(err){
                console.log('数据操作失败');
                var result={
                  status:0,
                  data:0
                }
                callback&&callback(result,fields)
                //throw err;
            }else {
              var result={
                status:1,
                data:results
              }
              callback && callback(result,fields);
            }
             connection.end(function(err){
                  if(err){
                      console.log('关闭数据库连接失败！');
                      //throw err;
                  }
              });
           });
       });
    }
  }
