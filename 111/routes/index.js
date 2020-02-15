var express = require('express');
var router = express.Router();
var userSql=require('../API/login')
var md5 = require('md5-node')
var COS = require('cos-nodejs-sdk-v5');
var cos = new COS({
  AppId: '1300918548',
  SecretId: 'AKIDWs3LTODRVO4iLkgwCE0Z6eR0W9ZxNG9p',
  SecretKey: 'kJqAKIzUkx9JSJ7VhdUE1b1EIBtQl4GI',
});

var tengxun_cos = {
  Bucket: 'bucket-1300918548',
  Region: 'ap-shanghai',
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main/index', { title: 'Express' });
});
router.get('/login',function(req,res,next){
      res.render('login/index',{});
});
router.get('/register',function(req,res,next){
  res.render('register/index');
});


//注册账号
router.post('/addAccount',function(req,res,next){
  var b1 = new Buffer(req.body.password,'base64');
  var s1 = b1.toString().substring(10);
  var password=md5(s1);
  var params={
    name:req.body.name,
    password:password
  }
  userSql.insert(params,function(results,fields){
    if(results.status==1){
      var data={
        status:0,
        message:'注册成功'
      }
    }else{
      var data={
        status:-1,
        message:'注册失败'
      }
    }
    res.send(data);
  })
})

/*登陆*/
router.post('/loginIn',function(req,res,next){
  var b1 = new Buffer(req.body.password,'base64');
  var s1 = b1.toString().substring(10);
  //console.log(s1);
  var password=md5(s1);
  var params={
    name:req.body.name,
    password:password
  }
  //console.log(params);
  userSql.checkAccount(params,function(results,fields){
    //console.log(results);
    if(results.status==1){
      if(results.data.length==0){
        var data={
          status:-1,
          message:'用户名或密码错误'
        }
      }else{
        var data={
          status:0,
          message:'登陆成功'
        }
      }
    }else{
      var data={
        status:-1,
        message:'错误'
      }
    }
    res.send(data);
  })
})

router.post('/api/upload',function(req,res,next){
  var base64img=req.body.img;
  //移除“data:image/png;base64,”字符串
  var base64Data = base64img.replace(/^data:image\/\w+;base64,/, "");
  //转换为Buffer对象
  var buffer=Buffer.from(base64Data,'base64');
  var key='/wdnmd/2.jpg';
  cos.putObject({
    Bucket : tengxun_cos.Bucket,                        /* 必须 */
    Region : tengxun_cos.Region,                        /* 必须 */
    Key : key,                           /* 必须 */
    Body: buffer,           /* 必须 */
    onProgress: function (progressData) {
      console.log(progressData);
    },
  }, function(err, data) {
      if(err) {
        console.log(err)
      } else {
        //获取刚上传的图片的url
        cos.getObjectUrl({
          Bucket: tengxun_cos.Bucket,
          Region: tengxun_cos.Region,
          Key: key
          //Sign: true
        }, function (err, data) {
          if(!err){
            var url=data.Url
            res.send(url);
          }
        });
      }
  })
})

router.get('/getAllPic',function(req,res,next){
  userSql.getAllPictures("",function(results,fields){
    res.send(results);
  })
})
module.exports = router;
