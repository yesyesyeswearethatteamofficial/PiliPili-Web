window.onload=function() {
    if(sessionStorage.getItem("token") == null  ){
        window.location.href="../user/login.html";
    }

    $(".toSpace-item .mini-avatar img").attr("src",sessionStorage.getItem("avatar"));
    $(".user-head").attr("src",sessionStorage.getItem("avatar"));
    if(getUrlParam('isAuthor') == "false"){
        var fans;
        $.ajax({
            type: "GET",
            url: "http://47.93.139.52:8000/user/uid" + getUrlParam('aid') + "/details",
            contentType: "application/json;charset=utf-8",
            async:false,
            headers: {
                'Authorization': 'JWT ' + sessionStorage.getItem("token")
            },
            success: function (data) {
                var json = getJson(data);
                if (json[0].code == 200) {
                    var jjson = getJson(json[0].data);
                    fans = jjson[0].fans_count;
                    if(parseInt(jjson[0].vip) > 0){
                        $(".u-info .username").addClass("vip-red-name");
                    }
                    $(".u-info .username").html(jjson[0].username);
                    $(".u-info .desc").html(jjson[0].sign);
                }
                else{
                    alert("获取用户公开信息失败");
                    location.reload();
                    return false;
                }
            },
            error: function (data) {
                alert("获取用户公开信息失败");
                location.reload();
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
                        $(".fa").attr("src",avatarClient.signatureUrl(jjson[0].file));
                    }
                    else {
                        $(".fa").attr("src","../img/null_avatar.png");
                    }
                }
                else{
                    alert("获取用户公开信息失败");
                    location.reload();
                    return false;
                }
            },
            error: function (data) {
                alert("获取用户公开信息失败");
                location.reload();
                return false;
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
                        $(".default-btn").removeClass("not-follow");
                        $(".default-btn").addClass("following");
                        $(".default-btn span").html("已关注 " + fans);
                    }
                    else{
                        $(".default-btn span").html("关注 " + fans);
                    }
                }
                else{
                    alert("获取关注信息失败");
                    location.reload();
                    return false;
                }
            },
            error: function (data) {
                alert("获取关注信息失败");
                location.reload();
                return false;
            }
        });

    }
    else{
        $(".default-btn").css("display","none");
        $(".copyright").css("display","none");
        $(".fa").attr("src",sessionStorage.getItem("avatar"));
        $(".u-info .username").html(sessionStorage.getItem("username"));
        $(".u-info .desc").html(sessionStorage.getItem("sign"));
        return false;
    }

    $.ajax({
        type: "GET",
        url: "http://47.93.139.52:8000/video/pv" + getUrlParam('pid') + "/details",
        contentType: "application/json;charset=utf-8",
        headers: {
            'Authorization': 'JWT ' + sessionStorage.getItem("token")
        },
        async:false,
        success: function (data) {
            var json = getJson(data);
            if (json[0].code == 200) {
                var jjson = getJson(json[0].data);
                $(".video-title .tit").html(jjson[0].title);
                $("title").html(jjson[0].title);
                $(".video-data .a-date").html(jjson[0].time);
                $(".video-data .view").html(jjson[0].views + "播放&nbsp;&nbsp;");
                $(".video-data .dm").html(jjson[0].danmuku + "弹幕");
                $(".video-desc .info").html(jjson[0].sign);
                $(".comment .b-head .results").html(jjson[0].comments);
                $(".ops #coinVideo").html("<img src='../img/img_coin.png' class='van-icon'>" + jjson[0].coins);

                $.ajax({
                    type: "GET",
                    url: "http://47.93.139.52:8000/video/pv" + getUrlParam('pid') + "/is-liked-and-collected",
                    contentType: "application/json;charset=utf-8",
                    headers: {
                        'Authorization': 'JWT ' + sessionStorage.getItem("token")
                    },
                    async:false,
                    success: function (data) {
                        var bjson = getJson(data);
                        if (bjson[0].code == 200) {
                            var bjjson = getJson(bjson[0].data);
                            if(bjjson[0].is_liked) {
                                $(".ops #likeVideo").html("<img src='../img/img_like_fin.png' class='van-icon'>" + jjson[0].likes);
                                $(".ops #likeVideo").addClass("liked");
                            }
                            else{
                                $(".ops #likeVideo").html("<img src='../img/img_like.png' class='van-icon'>" + jjson[0].likes);
                                $(".ops #likeVideo").addClass("unlike");
                            }
                            if(bjjson[0].is_collected) {
                                $(".ops #stowVideo").html("<img src='../img/img_stow_fin.png' class='van-icon'>" + jjson[0].collections);
                                $(".ops #stowVideo").addClass("stowed");
                            }
                            else{
                                $(".ops #stowVideo").html("<img src='../img/img_stow.png' class='van-icon'>" + jjson[0].collections);
                                $(".ops #stowVideo").addClass("unstow");
                            }
                        }
                        else{
                            alert("获取视频信息失败");
                            location.reload();
                            return false;
                        }
                    },
                    error: function (data) {
                        alert("获取视频信息失败");
                        location.reload();
                        return false;
                    },})
            }
            else{
                alert("获取视频信息失败");
                location.reload();
                return false;
            }
        },
        error: function (data) {
            alert("获取视频信息失败");
            location.reload();
            return false;
        }
    });

    $.ajax({
        type: "GET",
        url: "http://47.93.139.52:8000/video/pv" + getUrlParam('pid') + "/video",
        contentType: "application/json;charset=utf-8",
        async:false,
        headers: {
            'Authorization': 'JWT ' + sessionStorage.getItem("token")
        },
        success: function (data) {
            var json = getJson(data);
            if (json[0].code == 200) {
                var jjson = getJson(json[0].data);
                var videoClient = OSS.Wrapper({
                    accessKeyId: jjson[0].guest_key,
                    accessKeySecret: jjson[0].guest_secret,
                    bucket: 'pilipili-bucket',
                    region: 'oss-cn-beijing',
                    stsToken: jjson[0].security_token,//token
                });

                $("#danmup").DanmuPlayer({src: videoClient.signatureUrl(jjson[0].file), width: 657, height: 464});
            }
            else{
                alert("获取视频信息失败");
                location.reload();
                return false;
            }
        },
        error: function (data) {
            alert("获取视频信息失败");
            location.reload();
            return false;
        }
    });

    var danmuList = [];

    $.ajax({
        type: "GET",
        url: "http://47.93.139.52:8000/video/pv" + getUrlParam('pid') + "/get-danmuku",
        contentType: "application/json;charset=utf-8",
        async:false,
        success: function (data) {
            var json = getJson(data);
            if (json[0].code == 200) {
                var jjson = getJson(json[0].data);
                for(item of jjson[0].all_danmuku){
                    var ijson = getJson(item);
                    danmuList.push({text: ijson[0].content, color: ijson[0].color, size: ijson[0].size, position: ijson[0].type, time: ijson[0].time});
                }
            }
            else{
                alert("获取弹幕信息失败");
                location.reload();
                return false;
            }
        },
        error: function (data) {
            alert("获取弹幕信息失败");
            location.reload();
            return false;
        }
    });

    $(".u-face a").attr("href","../user/otherSpace.html?aid=" + getUrlParam('aid'));
    $(".ctrl-progress").css("height", "3px");
    $(".progress-handle").css("height", "0");
    $(".progress-handle").css("width", "0");
    $(".danmu-video").css("object-fit","fill")
    $(".danmu-player .danmu-input").css("border","1px solid #e7e7e7");
    $(".danmu-player .danmu-input").css("border-radius","2px 0 0 2px");
    $(".danmu-player .danmu-input").css("height","30px");
    $(".danmu-player .danmu-input").attr("placeholder","发条弹幕见证当下");
    $(".danmu-player .send-btn").css("background-color","#00a1d6");
    $(".danmu-player .send-btn").css("width","60px");
    $(".danmu-player .send-btn").css("height","28px");
    $(".danmu-player .send-btn").css("font-size","12px");
    $(".danmu-player .send-btn").css("text-align","center");
    $(".danmu-player .send-btn").css("display","inline-block");
    $(".danmu-player .send-btn").css("padding","0");
    $(".danmu-player .send-btn").css("padding-top","2px");
    $(".danmu-player").css("font-family","-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif");
    $(".danmu-player .send-btn").html("发送");
    $(".danmu-player .opt-btn").css("color","#7a767a");
    $(".danmu-player .opt-btn").css("padding-right","4px");
    $(".danmu-player .opt-btn").css("font-size","18px");
    $(".danmu-player input[type=radio]").css("border-color","#b4afb3")
    $(".tooltip714").css("border","1px solid #b4af03");
    $(".danmu-player .play-btn").css("background-color","#00a1d6");
    $(".danmu-player .play-btn").css("height","50px");
    $(".danmu-player .current-time").css("color","#868686");
    $(".danmu-player .slash").css("padding","0 3px");
    $(".tooltip714:eq(1)").remove();
    $(".glyphicon").css("top","6px");
    $(".danmu-player .current-time").css("padding-top","4px");
    $(".danmu-player .slash").css("padding-top","4px");
    $(".danmu-player .duration").css("padding-top","4px");

    document.querySelector('.danmu-video').addEventListener("play", function () {
        $(".pilipili-player-video-state").css("display", "none");
    });

    document.querySelector('.danmu-video').addEventListener("pause", function () {
        $(".pilipili-player-video-state").css("display", "block");
    })

    if(danmuList.length > 0) {
        $("#danmup .danmu-div").danmu("addDanmu", danmuList);
    }

}
