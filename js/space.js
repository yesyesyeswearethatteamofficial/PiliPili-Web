window.onload=function () {
    if(sessionStorage.getItem("fromLogin") == "true") {
        sessionStorage.setItem("token", getUrlParam('token'));
    }

    $.ajax({    //获取用户个人信息
        type: "GET",
        url: "http://47.93.139.52:8000/user/details",
        contentType: "application/json;charset=utf-8",
        async:false,
        headers: {
            'Authorization': 'JWT ' + sessionStorage.getItem("token")
        },
        success: function (data) {
            var json = getJson(data);
            if (json[0].code == 200) {
                var jjson = getJson(json[0].data);
                sessionStorage.setItem("username",jjson[0].username);
                sessionStorage.setItem("uid", jjson[0].id);
                sessionStorage.setItem("gender", jjson[0].gender);
                sessionStorage.setItem("coins", jjson[0].coins);
                sessionStorage.setItem("fans", jjson[0].fans_count);
                sessionStorage.setItem("followings", jjson[0].followings_count);
                sessionStorage.setItem("vip",jjson[0].vip);
            }
            else {
                alert("获取用户个人信息失败");
                window.history.back();
                return false;
            }


        },
        error: function (data) {
            alert("获取用户个人信息失败");
            window.history.back();
            return false;
        }
    });

    $.ajax({    //获取用户空间数据
        type: "GET",
        url: "http://47.93.139.52:8000/user/get-space",
        contentType: "application/json;charset=utf-8",
        async:false,
        headers: {
            'Authorization': 'JWT ' + sessionStorage.getItem("token")
        },
        success: function (data) {
            var json = getJson(data);
            if (json[0].code == 200) {
                var jjson = getJson(json[0].data);
                sessionStorage.setItem("sign", jjson[0].sign);
            }
            else {
                alert("获取用户个人信息失败");
                window.history.back();
                return false;
            }
        },
        error: function (data) {
            alert("获取用户个人信息失败");
            window.history.back();
            ;
            return false;
        }
    });

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

    $.ajax({    //获取用户背景
        type: "GET",
        url: "http://47.93.139.52:8000/user/uid" + sessionStorage.getItem("uid") + "/get-background",
        contentType: "application/json;charset=utf-8",
        async:false,
        success: function (data) {
            var json = getJson(data);
            if (json[0].code == 200) {
                var jjson = getJson(json[0].data);
                if (jjson[0].file != null) {
                    var backClient = OSS({
                        accessKeyId: jjson[0].guest_key,
                        accessKeySecret: jjson[0].guset_secret,
                        bucket: 'pilipili-bucket',
                        region: 'oss-cn-beijing',
                        stsToken: jjson[0].security_token + '',//token
                    });
                    sessionStorage.setItem("background", backClient.signatureUrl(jjson[0].file));
                }
                else {
                    sessionStorage.setItem("background", "../img/null_background.webp");
                }
            }
            else {
                alert("获取用户背景失败");
                window.history.back();
                return false;
            }
        },
        error: function (data) {
            alert("获取用户背景失败");
            window.history.back();
            return false;
        }
    });


    $.ajax({    //获取用户投稿视频
        type: "GET",
        url: "http://47.93.139.52:8000/user/uid" + sessionStorage.getItem("uid") + "/get-video",
        contentType: "application/json;charset=utf-8",
        async:false,
        success: function (data) {
            var json = getJson(data);
            if (json[0].code == 200) {
                var jjson = getJson(json[0].data);
                var i = 0;
                for (item of jjson[0].video_list) {
                    var i_jjson = getJson(item);
                    $("#page-vedio .newest").prepend(newItem(i_jjson[0]));
                    if (i < 4) {
                        $(".s-space .video .content").prepend(newItem(i_jjson[0]));
                    }
                    i++;
                }
                $("#page-vedio .submit-video-type-filter .count").html(i);

                conMostViews();
            }
            else {
                alert("获取视频列表信息失败");
                window.history.back();
            }
        },
        error: function (data) {
            alert("获取视频列表信息失败");
            window.history.back();
        }
    });

    sessionStorage.setItem("fromLogin","false");

    $("title").text(sessionStorage.getItem("username") + "的个人空间 PiliPili");
    $(".h-name").html(sessionStorage.getItem("username"));
    $("#n-gz").html(sessionStorage.getItem("followings"));
    if(parseInt(sessionStorage.getItem("followings")) == 0){
        $("#empty-follow").css("display","block");
    }
    $("#n-fs").html(sessionStorage.getItem("fans"));
    if(parseInt(sessionStorage.getItem("fans")) == 0){
        $("#empty-fan").css("display","block");
    }
    if (sessionStorage.getItem("gender") == "true") {
        $("#h-gender").addClass("female");
    }
    else {
        $("#h-gender").addClass("male");
    }
    if(parseInt(sessionStorage.getItem("vip")) > 0){
        $(".h-vipType").removeClass("not-vip");
    }
    $(".h-avatar-img").attr("src", sessionStorage.getItem("avatar"));
    $(".mini-user-avatar img").attr("src", sessionStorage.getItem("avatar"));
    $(".h-inner .cover").attr("src", sessionStorage.getItem("background"));
    $(".h-basic-spacing .h-sign-2").attr("value", sessionStorage.getItem("sign"));
    $("#fan-side .num").html(sessionStorage.getItem("fans"));
    $("#follow-side .num").html(sessionStorage.getItem("followings"));

    $("#n-main").click(function () {
        $(".n-cursor").css("left", "25px");
        $(".owner .page-active").removeClass("page-active");
        $(".s-space").addClass("page-active");
        return false;
    });

    $("#n-con").click(function () {
        $(".n-cursor").css("left", "95px");
        $(".owner .page-active").removeClass("page-active");
        $(".s-video").addClass("page-active");
        return false;
    });

    $("#n-fav").click(function () {
        $(".n-cursor").css("left", "165px");
        $(".owner .page-active").removeClass("page-active");
        $(".s-fav").addClass("page-active");
        return false;
    });

    $(".n-follow").click(function () {
        $(".owner .page-active").removeClass("page-active");
        $(".s-follow").addClass("page-active");
        $("#follow").css("display", "block");
        $("#fans").css("display", "none");
        $("#space-follow-side .cur").removeClass("cur");
        $("#space-follow-side .router-link-active").removeClass("router-link-active");
        $("#follow-side").addClass("cur");
        $("#follow-side span").addClass("router-link-active");
        $("#follow-side a").addClass("router-link-active");
        return false;
    });

    $(".n-fan").click(function () {
        $(".owner .page-active").removeClass("page-active");
        $(".s-follow").addClass("page-active");
        $("#follow").css("display", "none");
        $("#fans").css("display", "block");
        $("#space-follow-side .cur").removeClass("cur");
        $("#space-follow-side .router-link-active").removeClass("router-link-active");
        $("#fan-side").addClass("cur");
        $("#fan-side span").addClass("router-link-active");
        $("#fan-side a").addClass("router-link-active");
        return false;
    });

    $("#follow-side a").click(function () {
        $("#follow").css("display", "block");
        $("#fans").css("display", "none");
        $("#space-follow-side .cur").removeClass("cur");
        $("#space-follow-side .router-link-active").removeClass("router-link-active");
        $("#follow-side").addClass("cur");
        $("#follow-side span").addClass("router-link-active");
        $("#follow-side a").addClass("router-link-active");
        return false;
    });

    $("#fan-side a").click(function () {
        $("#follow").css("display", "none");
        $("#fans").css("display", "block");
        $("#space-follow-side .cur").removeClass("cur");
        $("#space-follow-side .router-link-active").removeClass("router-link-active");
        $("#fan-side").addClass("cur");
        $("#fan-side span").addClass("router-link-active");
        $("#fan-side a").addClass("router-link-active");
        return false;
    });

    $(".submit-video-type-filter a").click(function () {
        $(".submit-video-type-filter .active").removeClass("active");
        $(this).addClass("active");
        return false;
    });

    $(".avatar-cover").click(function () {
        sessionStorage.setItem("toAvatar", "true");
        window.open("account.html?to=avatar");
        return false;
    });

    $(".t-con").click(function () {
        $(".n-cursor").css("left", "95px");
        $(".owner .page-active").removeClass("page-active");
        $(".s-video").addClass("page-active");
        return false;
    });

    $(".more-con").click(function () {
        $(".n-cursor").css("left", "95px");
        $(".owner .page-active").removeClass("page-active");
        $(".s-video").addClass("page-active");
        return false;
    });

    $(".t-fav").click(function () {
        $(".n-cursor").css("left", "165px");
        $(".owner .page-active").removeClass("page-active");
        $(".s-fav").addClass("page-active");
        return false;
    });

    $(".more-fav").click(function () {
        $(".n-cursor").css("left", "165px");
        $(".owner .page-active").removeClass("page-active");
        $(".s-fav").addClass("page-active");
        return false;
    });

    $("#tab-new").click(function () {
       $(".be-tab-cursor").css("left","-2px");
       $(".main-content .type-on").removeClass("type-on");
       $(".main-content .newest").addClass("type-on");
    });

    $("#tab-click").click(function () {
        $(".be-tab-cursor").css("left","74px");
        $(".main-content .type-on").removeClass("type-on");
        $(".main-content .most").addClass("type-on");
    });
}

function uploadSign() { //失去焦点时自动保存签名
    $.ajax({
        type: "POST",
        url: "http://47.93.139.52:8000/user/upload-sign",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data:JSON.stringify({"sign":$(".h-basic-spacing .h-sign-2").val()}),
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
}

//<div class="small-item">
//                             <a href="" target="_blank" class="cover"><img src="../img/test.png" alt="test-video"><span class="length">147:52</span> </a>
//                             <a href="" target="_blank" title="test-video" class="title">test-video</a>
//                             <div class="meta">
//                                 <span class="play">
//                                     <img src="../img/ic_play.png">
//                                     19
//                                 </span>
//                                 <span class="time">
//                                     <img src="../img/ic_time.png">
//                                             2020-6-23
//                                 </span>
//                             </div>
//                         </div>