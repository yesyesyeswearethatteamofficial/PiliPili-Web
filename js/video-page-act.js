$(".ops #likeVideo").click(function () {    //点赞&取消点赞
    if($(".ops #likeVideo").hasClass("unlike")){
        $.ajax({
            type: "PUT",
            url: "http://47.93.139.52:8000/video/pv" + getUrlParam('pid') + "/like",
            contentType: "application/json;charset=utf-8",
            async:false,
            headers: {
                'Authorization': 'JWT ' + sessionStorage.getItem("token")
            },
            success: function (data) {
                var json = getJson(data);
                if (json[0].code == 200) {
                    var jjson = getJson(json[0].data);
                    $(".ops #likeVideo").html("<img src='../img/img_like_fin.png' class='van-icon'>" + jjson[0].likes);
                    $(".ops #likeVideo").removeClass("unlike");
                    $(".ops #likeVideo").addClass("liked");
                }
                else {
                    alert("点赞失败（网络原因），请重试");
                    return false;
                }


            },
            error: function (data) {
                alert("点赞失败（网络原因），请重试");
                return false;
            }
        });
    }
    else{
        $.ajax({
            type: "PUT",
            url: "http://47.93.139.52:8000/video/pv" + getUrlParam('pid') + "/unlike",
            contentType: "application/json;charset=utf-8",
            async:false,
            headers: {
                'Authorization': 'JWT ' + sessionStorage.getItem("token")
            },
            success: function (data) {
                var json = getJson(data);
                if (json[0].code == 200) {
                    var jjson = getJson(json[0].data);
                    $(".ops #likeVideo").html("<img src='../img/img_like.png' class='van-icon'>" + jjson[0].likes);
                    $(".ops #likeVideo").removeClass("liked");
                    $(".ops #likeVideo").addClass("unlike");
                }
                else {
                    alert("取消点赞失败（网络原因），请重试");
                    return false;
                }


            },
            error: function (data) {
                alert("取消点赞失败（网络原因），请重试");
                return false;
            }
        });
    }
});

$(".ops #stowVideo").click(function () {    //收藏&取消收藏
    if($(".ops #stowVideo").hasClass("unstow")){
        $.ajax({
            type: "PUT",
            url: "http://47.93.139.52:8000/video/pv" + getUrlParam('pid') + "/collect",
            contentType: "application/json;charset=utf-8",
            async:false,
            headers: {
                'Authorization': 'JWT ' + sessionStorage.getItem("token")
            },
            success: function (data) {
                var json = getJson(data);
                if (json[0].code == 200) {
                    var jjson = getJson(json[0].data);
                    $(".ops #stowVideo").html("<img src='../img/img_stow_fin.png' class='van-icon'>" + jjson[0].video_collections);
                    $(".ops #stowVideo").removeClass("unstow");
                    $(".ops #stowVideo").addClass("stowed");
                }
                else {
                    alert("收藏失败（网络原因），请重试");
                    return false;
                }


            },
            error: function (data) {
                alert("收藏失败（网络原因），请重试");
                return false;
            }
        });
    }
    else{
        $.ajax({
            type: "PUT",
            url: "http://47.93.139.52:8000/video/pv" + getUrlParam('pid') + "/un-collect",
            contentType: "application/json;charset=utf-8",
            async:false,
            headers: {
                'Authorization': 'JWT ' + sessionStorage.getItem("token")
            },
            success: function (data) {
                var json = getJson(data);
                if (json[0].code == 200) {
                    var jjson = getJson(json[0].data);
                    $(".ops #stowVideo").html("<img src='../img/img_stow.png' class='van-icon'>" + jjson[0].video_collections);
                    $(".ops #stowVideo").removeClass("stowed");
                    $(".ops #stowVideo").addClass("unstow");
                }
                else {
                    alert("取消收藏失败（网络原因），请重试");
                    return false;
                }


            },
            error: function (data) {
                alert("取消收藏失败（网络原因），请重试");
                return false;
            }
        });
    }
});

$(".up-info .btn-panel .default-btn").click(function () {
   if($(".btn-panel .default-btn").hasClass("following")){
       if(confirm("你确定要取消对 " + $(".u-info .username").html() + " 的关注吗？")){
           $.ajax({
               type: "POST",
               url: "http://47.93.139.52:8000/user/un-fan",
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
                       $(".btn-panel .default-btn>span").html("关注 " + jjson[0].fans_count);
                       $(".btn-panel .default-btn").removeClass("following");
                       $(".btn-panel .default-btn").addClass("not-follow");
                   }
                   else {
                       alert("取消关注失败（网络原因），请重试");
                       return false;
                   }


               },
               error: function (data) {
                   alert("取消关注失败（网络原因），请重试");
                   return false;
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
                   $(".btn-panel .default-btn>span").html("已关注 " + jjson[0].fans_count);
                   $(".btn-panel .default-btn").removeClass("not-follow");
                   $(".btn-panel .default-btn").addClass("following");
               }
               else {
                   alert("关注失败（网络原因），请重试");
                   return false;
               }


           },
           error: function (data) {
               alert("关注失败（网络原因），请重试");
               return false;
           }
       });
   }
});

$(".ops #coinVideo").click(function () {
    $.ajax({
        type: "POST",
        url: "http://47.93.139.52:8000/video/pv" + getUrlParam('pid') + "/put-coin",
        contentType: "application/json;charset=utf-8",
        async:false,
        headers: {
            'Authorization': 'JWT ' + sessionStorage.getItem("token")
        },
        data:JSON.stringify({'coins':1}),
        success: function (data) {
            var json = getJson(data);
            if (json[0].code == 200) {
                var jjson = getJson(json[0].data);
                var temp = $("#coinVideo").html().split(">");
                var new_coin = 1 + parseInt(temp[1]);
                $("#coinVideo").html("<img src='../img/img_coin.png' class='van-icon'>" + new_coin);
            }
            else {
                alert("投币失败（网络原因），请重试");
                return false;
            }


        },
        error: function (data) {
            alert("投币失败（网络原因），请重试");
            return false;
        }
    });
});

$(".comment-submit").click(function () {
    if($(".textarea-container textarea").val() == ""){
        return false;
    }
    else{
        $.ajax({
            type: "POST",
            url: "http://47.93.139.52:8000/video/pv" + getUrlParam('pid') + "/comment",
            contentType: "application/json;charset=utf-8",
            async:false,
            headers: {
                'Authorization': 'JWT ' + sessionStorage.getItem("token")
            },
            data:JSON.stringify({'comment':$(".textarea-container textarea").val()}),
            success: function (data) {
                var json = getJson(data);
                if (json[0].code == 200) {
                    var jjson = getJson(json[0].data);
                    $(".comment .b-head .results").html(parseInt($(".comment .b-head .results").html()) + 1);
                }
                else {
                    alert("评论失败（网络原因），请重试");
                    return false;
                }


            },
            error: function (data) {
                alert("评论失败（网络原因），请重试");
                return false;
            }
        });
    }
});
