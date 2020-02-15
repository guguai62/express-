$(document).ready(function () {
  var effectivePass=false;


  //登陆
  $('#ln').click(function(){
    var names = $("input:nth-of-type(1)").val();
    var passwords = $("#inppassword").val();

    //产生10位的随机字符串
    var string=getCode();
    //console.log(string);

    var b = new Base64();  
    var str = b.encode(string+passwords);  
    var params={
      name:names,
      password:str,
    }
    $.ajax({
      type:'post',
      url:'/loginIn',
      data:JSON.stringify(params),
      contentType: 'application/json',
      success:function(res){
        console.log(res);
        if(res.status==0){
          alert(res.message)
          //window.location.href='/'
        }else{
          alert(res.message)
        }
      },
      error:function(err){
        console.log('失败了');
      }
    })
    // $.ajax({
    //   type:'post',
    //   url:'/api/upload',
    //   data:JSON.stringify(params),
    //   contentType: 'application/json',
    //   success:function(res){
    //     console.log(res);
    //     // if(res.status==0){
    //     //   alert(res.message)
    //     //   //window.location.href='/'
    //     // }else{
    //     //   alert(res.message)
    //     // }
    //   },
    //   error:function(err){
    //     console.log('失败了');
    //   }
    // })
  })

  function getCode(){
      var  x="0123456789qwertyuioplkjhgfdsazxcvbnm";
      var  tmp="";
      //var timestamp = new Date().getTime();
      for(var  i=0;i< 10;i++)  {
      tmp  +=  x.charAt(Math.ceil(Math.random()*100000000)%x.length);
      }
      return  tmp;
  }

  //跳转到注册页面
  $('#goToRegister').click(function(){
    window.location.href="/register";
  })

  $('#goBackLogin').click(function(){
    window.location.href="/login";
  })

  //注册
  $('#checkAndRegister').click(function(){
    var formData = getSignUpForm();
    console.log(formData);
    if (!validateSignUpForm(formData)) {
      alert('信息有误');
      return;
    }

    var string=getCode();

    var b = new Base64();  
    var str = b.encode(string+formData.password);  

    var params={
      name:formData.username,
      password:str
    }

    $.ajax({
      type:'post',
      url:'/addAccount',
      data:JSON.stringify(params),
      contentType: 'application/json',
      success:function(res){
        alert(res.message);
       console.log(res);
      },
      error:function(err){
        console.log('失败了');
      }
    })
  })

  function getSignUpForm() {
    return {
        username: $('#accountName').val(),
        password: $('#firstPassword').val(),
        secondPassword: $('#secondPassword').val()
    };
  }
  function validateSignUpForm(formData) {
    var isValidate = true;
    if(!effectivePass){
      isValidate=false
    }
    if(formData.username.length<1|| formData.password.length<6||formData.secondPassword.length<6){
      isValidate=false;
    }
    if(formData.password!=formData.secondPassword){
      isValidate=false
    }
    return isValidate;
  }
  /**绑定输入密码处理函数 */
  $('#firstPassword').keyup(function(){
    var password=$('#firstPassword').val();
    var secondPassword= $('#secondPassword').val();
    console.log(password);
    var string=check(password);
    if(!effectivePass){
      //密码无效
      var input=$('#firstPassword').parent();
      input[0].style.borderBottomColor = "#f00";

      $('#hasErr').empty();
      $('#hasErr').append(string);
      $('#hasErr')[0].style.display="inherit";
      if((secondPassword!="") && (password!=secondPassword)){
        var div= $('#secondPassword').parent();
        div[0].style.borderBottomColor = "black";
        $('#err').empty();
        var errorMessage='两次密码不一致'
        $('#err').append(errorMessage);
        $('#err')[0].style.display="inherit";
      }

    }else{
      var input=$('#firstPassword').parent();
      input[0].style.borderBottomColor = "black";
      $('#hasErr').empty();
      $('#hasErr')[0].style.display='none';
      //清除校验密码时添加的样式
      if(password==secondPassword){
        $('#err').empty();
        $('#err')[0].style.display='none';
      }
    }
      //console.log(string);
  })
  /**绑定校验密码处理函数 */
  $('#secondPassword').keyup(function(){
    var password= $('#firstPassword').val();
    var secondPassword= $('#secondPassword').val();
    if(password!=secondPassword){
      var input= $('#secondPassword').parent();
      input[0].style.borderBottomColor = "#f00";
      
      $('#err').empty();
      var errorMessage='两次密码不一致'
      $('#err').append(errorMessage);
      $('#err')[0].style.display="inherit";
    }else{
      var input= $('#secondPassword').parent();
      input[0].style.borderBottomColor = "black";
      $('#err').empty();
      $('#err')[0].style.display='none';
    }
  })
  /**校验密码强度 */
  function check(password){

    var modes=[0,0,0,0];

    var string=checkStrong(password);

    function checkStrong(pas){
        if(pas.length<6){
          effectivePass=false;
          return "密码长度不得小于6位";
        }else if(pas.length>20){
          effectivePass=false;
          return "密码长度不得超过20位"
        }else{
          for (let i = 0; i< pas.length; i++) {
            CharMode(pas.charCodeAt(i))
          }
          var count=0;
          for (let i=0;i < 4;i++){
            count+=modes[i];
          }
          if(count>=3){
            effectivePass=true;
            return "";
          }else{
            effectivePass=false;
            return "密码必须由6-20位数字+字母+特殊字符组成"
          }
        }
    }

    function CharMode(iN) {
      if (iN >= 48 && iN <= 57) //数字
          modes[0]=1
      if (iN >= 65 && iN <= 90) //大写字母
          modes[2]=1
      if (iN >= 97 && iN <= 122) //小写
          modes[1]=1
      else
         modes[3]=1  //特殊字符
    }

    return string;
  }
})


