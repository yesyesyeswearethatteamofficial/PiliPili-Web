window.onload=function () {
    if(sessionStorage.getItem("token") == null){
        window.location.href="../user/login.html";
        return false;
    }

    $.ajax({    //获取用户个人信息
        type: "GET",
        url: "http://47.93.139.52:8000/user/uid" + getUrlParam('aid') + "/details",
        contentType: "application/json;charset=utf-8",
        async:false,
        success: function (data) {
            var json = getJson(data);
            if (json[0].code == 200) {
                var jjson = getJson(json[0].data);
                $("title").text(jjson[0].username + "的个人空间");
                $(".h-name").html(jjson[0].username);
                $("#n-gz").html(jjson[0].followings_count);
                $("#n-fs").html(jjson[0].fans_count);
                if (jjson[0].gender == true) {
                    $("#h-gender").addClass("female");
                }
                else {
                    $("#h-gender").addClass("male");
                }

                if(jjson[0].vip > 0){
                    $(".h-vipType").removeClass("not-vip");
                }

                $(".h-basic-spacing .h-sign-2").attr("value", jjson[0].sign);

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

    $.ajax({
        type: "GET",
        url: "http://47.93.139.52:8000/user/uid" + getUrlParam('aid') + "/get-avatar",
        contentType: "application/json;charset=utf-8",
        async:false,
        headers: {
            'Authorization': 'JWT ' + sessionStorage.getItem("token")
        },
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
                    $(".h-avatar-img").attr("src",avatarClient.signatureUrl(jjson[0].file));
                }
                else {
                    $(".h-avatar-img").attr("src","../img/null_avatar.png");
                }
            }
            else{
                alert("获取用户公开信息失败");
                location.reload();
            }
        },
        error: function (data) {
            alert("获取用户公开信息失败");
            location.reload();
        }
    });

    $.ajax({
        type: "GET",
        url: "http://47.93.139.52:8000/user/uid" + getUrlParam('aid') + "/is-followed",
        contentType: "application/json;charset=utf-8",
        async:false,
        headers: {
            'Authorization': 'JWT ' + sessionStorage.getItem("token")
        },
        success: function (data) {
            var json = getJson(data);
            if (json[0].code == 200) {
                var jjson = getJson(json[0].data);
                if(jjson[0].is_followed){
                    $(".follow-this").html("取消关注 ");
                    $(".follow-this").addClass("followed");
                }
                else{
                    $(".follow-this").html("关注用户");
                    $(".follow-this").addClass("unfollow");
                }
            }
            else{
                alert("获取关注信息失败");
                window.history.back();
            }
        },
        error: function (data) {
            alert("获取关注信息失败");
            window.history.back();
        }
    });

    $.ajax({    //获取用户背景
        type: "GET",
        url: "http://47.93.139.52:8000/user/uid" + getUrlParam('aid') + "/get-background",
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
                    $(".h-inner .cover").attr("src", backClient.signatureUrl(jjson[0].file));
                }
                else {
                    $(".h-inner .cover").attr("src", "../img/null_background.webp");
                }
            }
            else {
                alert("获取用户背景失败");
                window.history.back();
            }
        },
        error: function (data) {
            alert("获取用户背景失败");
            window.history.back();
        }
    });


    $.ajax({    //获取用户投稿视频
        type: "GET",
        url: "http://47.93.139.52:8000/user/uid" + getUrlParam('aid') + "/get-video",
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
                    i++;
                }
                $("#page-vedio .submit-video-type-filter .count").html(i);
                conMostViews();
                for (item of jjson[0].video_list) {
                    var i_jjson = getJson(item);
                    $("#page-vedio .newest").prepend(newItem(i_jjson[0]));
                    i++;
                }
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

    $(".mini-user-avatar img").attr("src", sessionStorage.getItem("avatar"));

    $(".submit-video-type-filter a").click(function () {
        $(".submit-video-type-filter .active").removeClass("active");
        $(this).addClass("active");
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

    $(".follow-this").click(function () {
        if($(".follow-this").hasClass("followed")) {
            if (confirm("你确定要取消对ta的关注吗？")) {
                $.ajax({
                    type: "POST",
                    url: "http://47.93.139.52:8000/user/un-fan",
                    contentType: "application/json;charset=utf-8",
                    async: false,
                    headers: {
                        'Authorization': 'JWT ' + sessionStorage.getItem("token")
                    },
                    data: JSON.stringify({"id": getUrlParam('aid')}),
                    success: function (data) {
                        var json = getJson(data);
                        if (json[0].code == 200) {
                            $(".follow-this").removeClass("followed");
                            $(".follow-this").addClass("unfollow");
                            $(".follow-this").html("关注用户");
                        }
                        else {
                            alert("取消关注失败（网络原因），请重试");
                        }
                    },
                    error: function (data) {
                        alert("取消关注失败（网络原因），请重试");
                    }
                });
            }
        }
        else{
            $.ajax({
                type: "POST",
                url: "http://47.93.139.52:8000/user/fan",
                contentType: "application/json;charset=utf-8",
                async:false,
                headers: {
                    'Authorization': 'JWT ' + sessionStorage.getItem("token")
                },
                data:JSON.stringify({"id":getUrlParam('aid')}),
                success: function (data) {
                    var json = getJson(data);
                    if (json[0].code == 200) {
                        var jjson = getJson(json[0].data);
                        $(".follow-this").addClass("followed");
                        $(".follow-this").removeClass("unfollow");
                        $(".follow-this").html("取消关注");
                    }
                    else {
                        alert("关注失败（网络原因），请重试");
                    }
                },
                error: function (data) {
                    alert("关注失败（网络原因），请重试");
                }
            });
        }
    });

}


//<div class="small-item">
//                             <a href="" target="_blank" class="cover"><img src="" alt="test-video"><span class="length">147:52</span> </a>
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