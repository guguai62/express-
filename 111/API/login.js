var db=require('../db');

module.exports={
  querryAll:function(params,callback){
    var sql="SELECT * FROM user";
    db.query(sql,[],function(results,fields){
      callback&&callback(JSON.parse(JSON.stringify(results)), JSON.parse(JSON.stringify(fields)));
    });
  },
  insert:function(params,callback){
    var sql="INSERT INTO user(name,password) VALUES (?,?)";
    db.query(sql,[params.name,params.password],function(results,fields){
      console.log(results);
      callback&&callback(results,fields);
    })
  },
  checkAccount:function(params,callback){
    var sql="SELECT * FROM user WHERE name=? AND password=?";
    db.query(sql,[params.name,params.password],function(results,fields){
      console.log(results);
      callback&&callback(JSON.parse(JSON.stringify(results)), JSON.parse(JSON.stringify(fields)));
    })
  },
  test:function(params, callback){
    console.log(params);
    params+="sdffsdfds";
    console.log('你啊手动阀十分');
    callback&&callback(params);
  },
  getAllPictures:function(params,callback){
    var sql="SELECT * FROM pictures";
    db.query(sql,[],function(results,fields){
      callback&&callback(JSON.parse(JSON.stringify(results)), JSON.parse(JSON.stringify(fields)));
    })
  }
}
