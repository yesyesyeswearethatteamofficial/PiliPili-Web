window.onload=function(){
    if(sessionStorage.getItem("toVip") == "true"){
        $(".s-left .on").removeClass("on router-link-active");
        $(".s-left .s-left-vip").addClass("on router-link-active");
        $(".s-right .right-on").removeClass("right-on");
        $(".s-right .s-right-vip").addClass("right-on");
        sessionStorage.setItem("toVip","false");
    }
    else if(sessionStorage.getItem("toAvatar") == "true"){
        $(".s-left .on").removeClass("on router-link-active");
        $(".s-left .s-left-avatar").addClass("on router-link-active");
        $(".s-right .right-on").removeClass("right-on");
        $(".s-right .s-right-avatar").addClass("right-on");
        sessionStorage.setItem("toAvatar","false");
    }

    $(".mini-user-avatar img").attr("src",sessionStorage.getItem("avatar"));
    $(".home-head img").attr("src",sessionStorage.getItem("avatar"));
    $(".big-head img").attr("src",sessionStorage.getItem("avatar"));
    $(".face-g-avatar").attr("src",sessionStorage.getItem("avatar"));
    $(".pre-container").css("background-image","url(" + sessionStorage.getItem("avatar") + ")");
    $(".curren-b-num").html(sessionStorage.getItem("coins"));
    $(".balance-price").html(sessionStorage.getItem("coins"));
    if(sessionStorage.getItem("gender") == "true"){
        $(".user-my-sex .el-radio-group .woman").addClass("is-active");
    }
    else{
        $(".user-my-sex .el-radio-group .man").addClass("is-active");
    }
    $(".el-textarea__inner").html(sessionStorage.getItem("sign"));
    $(".el-input__inner").attr("value",(sessionStorage.getItem("username")));
    $(".home-top-msg-name").html(sessionStorage.getItem("username"));
    $(".big-user-name").html(sessionStorage.getItem("username"));
}

$("#file_input").on("change",function (e) {
    var file = e.target.files[0];   // 获取图片资源
    var fileTypes = [ "jpg", "png"];
    var bTypeMatch = false
    for (var i = 0; i < fileTypes.length; i++) {
        var start = file.name.lastIndexOf(".");
        var fileType = file.name.substring(start + 1);
        if (fileType.toLowerCase() == fileTypes[i]) {
            bTypeMatch = true;
            break;
        }
    }
    if(bTypeMatch){
        var reader = new FileReader();
        reader.readAsDataURL(file); // 读取文件
        reader.onload = function (arg) {    // 渲染文件
            $(".img-container img").attr("src", arg.target.result);
            $(".reset-img").css("display","block");
            $(".first-change-lb").css("display","none");
            $(".img-new-wrap .new-container").css("background-image","url(" + arg.target.result + ")");
            $(".img-preview-wrap").css("display","none");
            $(".img-new-wrap").css("display","block");
            $(".modal-footer input").removeClass("disabled");
        }
    }
    else {
        alert("仅限jpg，png格式！");
        return false;
    }
});

$("#changeSign").click(function () {    //修改签名
    $.ajax({
        type: "POST",
        url: "http://47.93.139.52:8000/user/upload-sign",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data:JSON.stringify({"sign":$(".el-textarea__inner").val()}),
        headers: {
            'Authorization': 'JWT ' + sessionStorage.getItem("token")
        },
        success: function (data) {
            var json = getJson(data);
            if (json[0].code == 200) {
                var jjson = getJson(json[0].data);
                sessionStorage.setItem("sign",jjson[0].sign);
            }
            else{
                alert("签名修改失败");
                location.reload();
            }
        },
        error: function (data) {
            alert("签名修改失败");
            location.reload();
        }
    });
});

$("#changeName").click(function () { //修改昵称
    $.ajax({
        type: "POST",
        url: "http://47.93.139.52:8000/user/put-username",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data:JSON.stringify({"username":$(".el-input__inner").val(),"cost":6}),
        headers: {
            'Authorization': 'JWT ' + sessionStorage.getItem("token")
        },
        success: function (data) {
            var json = getJson(data);
            if (json[0].code == 200) {
                var jjson = getJson(json[0].data);
                sessionStorage.setItem("username",jjson[0].username);
                sessionStorage.setItem("coins",jjson[0].coins);
                $(".curren-b-num").html(sessionStorage.getItem("coins"));
                $(".balance-price").html(sessionStorage.getItem("coins"));
            }
            else{
                alert("昵称修改失败");
                location.reload();
            }
        },
        error: function (data) {
            alert("昵称修改失败");
            location.reload();
        }
    });
});

$(".more-btn").click(function () { //购买硬币
    var arr = $(".price p").html().split(".");
    var price = parseInt(arr[0]);
    $.ajax({
        type: "POST",
        url: "http://47.93.139.52:8000/user/put-coin",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data:JSON.stringify({"coins":price}),
        headers: {
            'Authorization': 'JWT ' + sessionStorage.getItem("token")
        },
        success: function (data) {
            var json = getJson(data);
            if (json[0].code == 200) {
                var jjson = getJson(json[0].data);
                sessionStorage.setItem("coins",jjson[0].coins);
                $(".curren-b-num").html(sessionStorage.getItem("coins"));
                $(".balance-price").html(sessionStorage.getItem("coins"));
            }
            else{
                alert("硬币购买失败");
                location.reload();
            }
        },
        error: function (data) {
            alert("硬币购买失败");
            location.reload();
        }
    });
});

/*$(".modal-btn").click(function () {
   var formData = new FormData();
    formData.append('content',$("#upload-avatar")[0]);
   $.ajax({
       type: "POST",
       data: formData,
       url: 'http://47.93.139.52:8000/user/upload-avatar',
       headers: {
           'Authorization': 'JWT ' + sessionStorage.getItem("token")
       },
       contentType: false,
       processData: false,
       success:function(data){
           var json = getJson(data);
           if(json[0].code==200){
               var jjson = getJson(json[0].data);
               alert("上传成功");
               $.ajax({    //获取用户头像
                   type: "GET",
                   url: "http://47.93.139.52:8000/user/uid"+ sessionStorage.getItem("uid") + "/get-avatar",
                   contentType: "application/json;charset=utf-8",
                   success: function (data) {
                       var json = getJson(data);
                       if (json[0].code == 200) {
                           var jjson = getJson(json[0].data);
                           if(jjson[0].file != null) {
                               var avatarClient = OSS({
                                   accessKeyId: jjson[0].guest_key + '',
                                   accessKeySecret: jjson[0].guset_secret + '',
                                   bucket: 'pilipili-bucket',
                                   region: 'https://oss-cn-beijing.aliyuncs.com',
                                   stsToken: jjson[0].security_token + '',//token
                               });
                               sessionStorage.setItem("avatar",avatarClient.getObjectUrl(jjson[0].file));
                           }
                           else{
                               sessionStorage.setItem("avatar","../img/null_avatar.png");
                           }
                       }
                   },
                   error: function (data) {
                       var json = getJson(data);
                       alert(json[0].message);
                   }
               });
           }
           else{

           }
       },
       error:function (data) {
           var json = getJson(data);

       }

   });
});*/

$(".reset-img label").click(function () {
    $(".img-container img").attr("src","");
    $(".reset-img").css("display","none");
    $(".first-change-lb").css("display","block");
    $(".img-new-wrap .new-container").css("background-image","none");
    $(".img-preview-wrap").css("display","block");
    $(".img-new-wrap").css("display","none");
    $(".modal-footer input").addClass("disabled");
});

$(".trade-list-wrapper .trade-wrapper").click(function () {
    if($(".trade-list-wrapper .is-selected").hasClass("trade-customn")){
        $(".trade-list-wrapper .tips").css("display","block");
        $(".trade-list-wrapper .enter-wrapper").css("display","none");
        $(".trade-list-wrapper .enter-wrapper input").val("");
        $(".trade-list-wrapper .enter-wrapper .enter-tip").html("");
    }
    $(".trade-list-wrapper .is-selected").removeClass("is-selected");
    $(this).addClass("is-selected");
    if($(this).hasClass("trade-customn")){
        $(".trade-list-wrapper .tips").css("display","none");
        $(".trade-list-wrapper .enter-wrapper").css("display","block");
    }
    else{
        $(".qrpay-content .price").css("display","block");
        $(".qrpay-content .price p").html($(".is-selected .cost").text() + ".00");
    }
});

$(".s-left .s-list").click(function () {
   $(".s-left .on").removeClass("on router-link-active");
   $(this).addClass("on router-link-active");

   $(".s-right .right-on").removeClass("right-on");
   if($(this).hasClass("s-left-home")){
       $(".s-right .s-right-home").addClass("right-on");
   }
   else if($(this).hasClass("s-left-vip")){
       $(".s-right .s-right-vip").addClass("right-on");
   }
   else if($(this).hasClass("s-left-info")){
       $(".s-right .s-right-info").addClass("right-on");
   }
   else if($(this).hasClass("s-left-avatar")){
        $(".s-right .s-right-avatar").addClass("right-on");
    }
   else if($(this).hasClass("s-left-pw")){
       $(".s-right .s-right-pw").addClass("right-on");
   }
    else{
        $(".s-right .s-right-coin").addClass("right-on");
   }
});

$(".el-radio-group .el-radio-button").click(function () {
    if($(this).hasClass("is-active")){
        return false;
    }

    else{
        if($(this).hasClass("man")){
            $.ajax({    //修改性别
                type: "PUT",
                url: "http://47.93.139.52:8000/user/put-gender",
                contentType: "application/json;charset=utf-8",
                headers: {
                    'Authorization': 'JWT ' + sessionStorage.getItem("token")
                },
                dataType: "json",
                data:JSON.stringify({"gender":false}),
                success: function (data) {
                    var json = getJson(data);
                    if (json[0].code == 200) {
                        sessionStorage.setItem("gender","false");
                    }
                    else {
                        alert("性别修改失败");
                        location.reload();
                    }
                },
                error: function (data) {
                    alert("性别修改失败");
                    location.reload();
                }
            });
        }
        else{
            $.ajax({    //修改性别
                type: "PUT",
                url: "http://47.93.139.52:8000/user/put-gender",
                contentType: "application/json;charset=utf-8",
                headers: {
                    'Authorization': 'JWT ' + sessionStorage.getItem("token")
                },
                dataType: "json",
                data:JSON.stringify({"gender":true}),
                success: function (data) {
                    var json = getJson(data);
                    if (json[0].code == 200) {
                        sessionStorage.setItem("gender","true");
                    }
                    else {
                        alert("性别修改失败");
                        location.reload();
                    }
                },
                error: function (data) {
                    alert("性别修改失败");
                    location.reload();
                }
            });
        }

        $(".el-radio-group .is-active").removeClass("is-active");
        $(this).addClass("is-active");
    }
});

$(".face-g-action").click(function () {
    $(".s-right .s-right-avatar").removeClass("right-on");
    $(".s-right .s-right-upload").addClass("right-on");
});

$(".upload-to-avatar").click(function () {
    $(".s-right .s-right-upload").removeClass("right-on");
    $(".s-right .s-right-avatar").addClass("right-on");
    return false;
});

$(".home-to-update").click(function () {
    $(".s-right .s-right-home").removeClass("right-on");
    $(".s-right .s-right-info").addClass("right-on");
    $(".s-left .s-left-home").removeClass("on router-link-active");
    $(".s-left .s-left-info").addClass("on router-link-active");
});

$(".coin-link").click(function () {
    $(".s-right .s-right-home").removeClass("right-on");
    $(".s-right .s-right-coin").addClass("right-on");
    $(".s-left .s-left-home").removeClass("on router-link-active");
    $(".s-left .s-left-coin").addClass("on router-link-active");
    return false;
});