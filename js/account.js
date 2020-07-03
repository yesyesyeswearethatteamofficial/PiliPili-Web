window.onload=function(){
    if(sessionStorage.getItem("token") == null  ){
        window.location.href="../user/login.html";
        return false;
    }

    if(getUrlParam('to') == "vip"){
        $(".s-left .on").removeClass("on router-link-active");
        $(".s-left .s-left-vip").addClass("on router-link-active");
        $(".s-right .right-on").removeClass("right-on");
        $(".s-right .s-right-vip").addClass("right-on");
    }
    else if(getUrlParam('to') == "avatar"){
        $(".s-left .on").removeClass("on router-link-active");
        $(".s-left .s-left-avatar").addClass("on router-link-active");
        $(".s-right .right-on").removeClass("right-on");
        $(".s-right .s-right-avatar").addClass("right-on");
    }

    $("title").text(sessionStorage.getItem("username") + "的个人中心");
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

    if(parseInt(sessionStorage.getItem("vip")) > 0){
     $(".big-member-btn").html("续费大会员");
     $(".home-userstatus").html("大会员");
     $(".home-userstatus").addClass("vip");
     $(".big-member-btn").addClass("user-is-vip");
     $(".big-user-name").addClass("user-is-vip");
    }
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
            $.ajax({
                type: "POST",
                data: JSON.stringify({"filename":getFileName($("#file_input").val())}),
                url: 'http://47.93.139.52:8000/user/upload-avatar-new',
                headers: {
                    'Authorization': 'JWT ' + sessionStorage.getItem("token")
                },
                dataType:"json",
                async:false,
                contentType: "application/json;charset=utf-8",
                success:function(data) {
                    var json = getJson(data);
                    if (json[0].code == 200) {
                        var jjson = getJson(json[0].data);
                        var bjson = getJson(jjson[0].bucket_avatar);
                        var avatarClient = OSS({
                            accessKeyId: bjson[0].guest_key,
                            accessKeySecret: bjson[0].guest_secret,
                            bucket: 'pilipili-bucket',
                            region: 'oss-cn-beijing',
                            stsToken: bjson[0].security_token + '',//token
                        });
                        avatarClient.multipartUpload(bjson[0].file,file);
                        avatarClient.put(bjson[0].file,file);
                        sessionStorage.setItem("upload-avatar", bjson[0].file)
                    }
                    else{
                        alert("头像上传失败");
                    }
                },
                error:function (data) {
                    alert("头像上传失败");
                }
            });
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
    if($(".el-input__inner").val() == sessionStorage.getItem("username")){
        return false;
    }
    else {
        $.ajax({
            type: "POST",
            url: "http://47.93.139.52:8000/user/put-username",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify({"username": $(".el-input__inner").val(), "cost": 6}),
            headers: {
                'Authorization': 'JWT ' + sessionStorage.getItem("token")
            },
            success: function (data) {
                var json = getJson(data);
                if (json[0].code == 200) {
                    var jjson = getJson(json[0].data);
                    sessionStorage.setItem("username", jjson[0].username);
                    sessionStorage.setItem("coins", jjson[0].coins);
                    $(".curren-b-num").html(sessionStorage.getItem("coins"));
                    $(".balance-price").html(sessionStorage.getItem("coins"));
                    $(".home-top-msg-name").html($(".el-input__inner").val());
                }
                else {
                    alert("昵称修改失败");
                    location.reload();
                }
            },
            error: function (data) {
                alert("昵称修改失败");
                location.reload();
            }
        });
    }
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

$(".big-member-btn").click(function () {
   if($(".vip-buy").val() != ""){
       var cost = parseInt($(".vip-buy").val());
       if(cost > parseInt(sessionStorage.getItem("coins"))){
           alert("硬币余额不足，请充值");
       }
       else {
           $.ajax({
               type: "POST",
               url: "http://47.93.139.52:8000/user/put-vip",
               contentType: "application/json;charset=utf-8",
               dataType: "json",
               data: JSON.stringify({"coins": cost, "vip": cost}),
               headers: {
                   'Authorization': 'JWT ' + sessionStorage.getItem("token")
               },
               success: function (data) {
                   var json = getJson(data);
                   if (json[0].code == 200) {
                       var jjson = getJson(json[0].data);
                       sessionStorage.setItem("coins", jjson[0].coins);
                       sessionStorage.setItem("vip",jjson[0].vip);
                       window.location.href="account.html?to=vip";
                   }
                   else {
                       alert("大会员购买失败");
                   }
               },
               error: function (data) {
                   alert("大会员购买失败");
               }
           });
       }
   }
});

$(".s-right-pw .pw-button").click(function () {
    var submit = true;

    if($("#old-pw").val()==""){
        submit = false;
        $("#old-pw-m").html("原密码不能为空");
    }
    else if($("#old-pw").val() == sessionStorage.getItem("pw")){
        $("#old-pw-m").html("");
    }
    else{
        submit = false;
        $("#old-pw-m").html("密码错误");
    }

    if($("#new-pw").val()==""){
        submit = false;
        $("#new-pw-m").html("新密码不能为空");
    }
    else {
        $("#new-pw-m").html("");
    }

    if($("#new-pw").val() == $("#confirm-pw").val()){
        $("#confirm-pw-m").html("");
    }
    else{
        $("#confirm-pw-m").html("密码不一致");
        submit = false;
    }

    if(submit){
        $.ajax({
            type:"POST",
            url:"http://47.93.139.52:8000/user/put-password",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data:JSON.stringify({"password":$("#new-pw").val()}),
            headers: {
                'Authorization': 'JWT ' + sessionStorage.getItem("token")
            },
            success:function (data) {
                var json = getJson(data);
                if(json[0].code==200){
                    sessionStorage.setItem("pw",$("#new-pw").val());
                    alert("密码修改成功");
                    window.location.href="account.html";
                }
                else{
                    $("#p-tip").html(json[0].message);
                    alert("密码修改失败");
                }
            },
            error:function (data) {
                alert("密码修改失败");
            }
        });
    }
    else {
    }
});

$(".modal-btn").click(function () {
    $.ajax({
            type: "POST",
            data: JSON.stringify({"file": sessionStorage.getItem("upload-avatar")}),
            url: 'http://47.93.139.52:8000/user/upload-avatar-success',
            headers: {
                'Authorization': 'JWT ' + sessionStorage.getItem("token")
            },
            async: false,
            contentType: "application/json;charset=utf-8",
            success: function () {
                $.ajax({    //获取用户头像
                    type: "GET",
                    url: "http://47.93.139.52:8000/user/uid" + sessionStorage.getItem("uid") + "/get-avatar",
                    contentType: "application/json;charset=utf-8",
                    async:false,
                    success: function (data) {
                        var json = getJson(data);
                        if (json[0].code == 200) {
                            var jjson = getJson(json[0].data);
                            if (jjson[0].file != null) {
                                var avatarClient = OSS({
                                    accessKeyId: jjson[0].guest_key,
                                    accessKeySecret: jjson[0].guset_secret,
                                    bucket: 'pilipili-bucket',
                                    region: 'oss-cn-beijing',
                                    stsToken: jjson[0].security_token + '',//token
                                });
                                sessionStorage.setItem("avatar", avatarClient.signatureUrl(jjson[0].file));
                            }
                            else {
                                sessionStorage.setItem("avatar", "../img/null_avatar.png");
                            }
                        }
                        else {
                            alert("获取用户头像失败");
                            window.history.back();
                            return false;
                        }
                    },
                    error: function (data) {
                        alert("获取用户头像失败");
                        window.history.back();
                        return false;
                    }
                });
                window.location.href = "account.html?to=avatar";
            },
            error: function () {
                alert("头像上传失败");
            }
        });

});

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