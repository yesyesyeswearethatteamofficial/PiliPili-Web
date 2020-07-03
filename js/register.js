window.onload=function () {
  $(".register-group button").click(function () {
      var submit = true;

      if($("#uname").val()==""){
          submit = false;
          $("#uname-error").html("昵称不能为空");
      }
      else{
          if($("#uname").val().length < 2){
              submit = false;
              $("#uname-error").html("昵称过短");
          }
          else if($("#uname").val().length > 15){
              submit = false;
              $("#uname-error").html("昵称过长");
          }
          else {
              $("#uname-error").html("");
          }
      }

      if($("#pw").val()==""){
          submit = false;
          $("#pw-error").html("密码不能为空");
      }
      else{
          if($("#pw").val().length < 6){
              submit = false;
              $("#pw-error").html("密码过短");
          }
          else if($("#pw").val().length > 20){
              submit = false;
              $("#pw-error").html("密码过长");
          }
          else{
              $("#pw-error").html("");
          }
      }

      var emailRegex = /^\w+@+[0-9a-zA-Z]+\.(com|com.cn|edu|hk|cn|net)$/;
      if($("#email").val()==""){
          submit = false;
          $("#email-error").html("邮箱不能为空");
      }
      else if (!emailRegex.test($("#email").val()) || $("#email").val().length < 6 || $("#email").val().length > 25) {
          submit = false;
          $("#email-error").html("邮箱格式不正确");
      }

      if(submit){
          $("#email-error").html("");
          $(".register-group button").css("display","none");
          $.ajax({
              type:"POST",
              url:"http://47.93.139.52:8000/user/register",
              contentType: "application/json;charset=utf-8",
              dataType: "json",
              data:JSON.stringify({"email":$("#email").val(),"username":$("#uname").val(),"password":$("#pw").val()}),
              success:function (data) {
                  var json = getJson(data);
                  if(json[0].code == 200) {
                      $(".register-success").html("注册成功：");
                      $("#to-login").html("点我返回登录界面");
                  }
                  else{
                      $("#register-error").html(json[0].message+",");
                      $("#error-reload").html("请点击重试");
                  }
              },
              error:function (data) {
                  var json = getJson(data);
                  $("#register-error").html(json[0].message+",");
                  $("#error-reload").html("请点击重试");
              }
          });
      }
      else {
          return false;
      }
  });

  $("#error-reload").click(function () {
     location.reload();
     return false;
  });
};