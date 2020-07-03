window.onload=function () {
    $(".btn-login").click(function () {
        var submit = true

        if($("#email").val()==""){
            submit = false;
            $("#e-tip").html("邮箱不能为空");
        }
        else{
            $("#e-tip").html("");
        }

        if($("#pw").val()==""){
            submit = false;
            $("#p-tip").html("密码不能为空");
        }
        else {
            $("#p-tip").html("");
        }

        if(submit){
            $(".btn-box").css("display","none");
            $.ajax({
                type:"POST",
                url:"http://47.93.139.52:8000/user/login",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                data:JSON.stringify({"email":$("#email").val(),"password":$("#pw").val()}),
                success:function (data) {
                    var json = getJson(data);
                    if(json[0].code==200){
                        var jjson = getJson(json[0].data);
                        sessionStorage.setItem("username",jjson[0].username);
                        sessionStorage.setItem("token",jjson[0].token);
                        sessionStorage.setItem("toSpace",".s-space");
                        sessionStorage.setItem("fromLogin","true");
                        sessionStorage.setItem("email",$("#email").val());
                        sessionStorage.setItem("pw",$("#pw").val());
                        sessionStorage.setItem("fromLogin","true");
                        window.location.href="userPage.html?token=" + jjson[0].token;
                    }
                    else{
                        $("#p-tip").html(json[0].message);
                        $(".btn-box").css("display","block");
                    }
                },
                error:function (data) {
                    var json = getJson(data);
                    $("#p-tip").html(json[0].message);
                    $(".btn-box").css("display","block");
                }
            });
        }
        else {
        }
    });
}