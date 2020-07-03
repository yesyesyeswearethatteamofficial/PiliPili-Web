$(".toSpace-item").click(function () {
   window.open("userPage.html");
   return false;
});

$(".toVip").click(function () {
    sessionStorage.setItem("toVip","true");
    window.open("account.html?to=vip");
    return false;
});

$(".mini-upload").click(function () {
   window.open("../video/videoFrame.html");
   return false;
});

$(".nav-search-btn").click(function () {
    window.open("../video/search.html");
    return false;
});


function getErrJson(data) {
    var jsonStr = '[' + JSON.stringify(data) + ']';
    var jsonRR = JSON.parse(jsonStr)[0].responseJSON;
    var jsonR = '[' + JSON.stringify(jsonRR) + ']';
    var json = JSON.parse(jsonR);
    return json;
}

function getJson(data) {
    var jsonStr = '[' + JSON.stringify(data) + ']';
    var json = JSON.parse(jsonStr);
    return json;
}

function getFileName(e){
    var pos=e.lastIndexOf("\\");
    return e.substring(pos+1);
}


function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return encodeURI(r[2]); return null; //返回参数值
}

function newItem(e) {
    var a = [];
    a.push("<div class='small-item'><a href='../video/videoPage.html");
    a.push("?pid=" + e.pv + "&" + "aid=" + e.author + "&");
    if(parseInt(sessionStorage.getItem("uid")) == e.author){
        a.push("isAuthor=true");
    }
    else{
        a.push("isAuthor=false");
    }
    a.push("' target='_blank' class='cover'><img src='");

    var bj = getJson(e.bucket_cover);
    if(bj[0].file != null) {
        var coverClient = OSS.Wrapper({
            accessKeyId: bj[0].guest_key,
            accessKeySecret: bj[0].guest_secret,
            bucket: 'pilipili-bucket',
            region: 'oss-cn-beijing',
            stsToken: bj[0].security_token,//token
        });
        a.push(coverClient.signatureUrl(bj[0].file) + "'><span class='length'>");
    }
    else{
        a.push("../img/null_background.webp'><span class='length'>");
    }
    a.push(e.duration + "</span></a><a href='../video/videoPage.html");
    a.push("?pid=" + e.pv + "&" + "aid=" + e.author + "&");
    if(parseInt(sessionStorage.getItem("uid")) == e.author){
        a.push("isAuthor=true");
    }
    else{
        a.push("isAuthor=false");
    }
    a.push("' target='_blank' class='title'>");
    a.push(e.title + "</a><div class='meta'><span class='play'><img src='../img/ic_play.png'><span class='views'>");
    a.push(e.views + "</span></span><span class='time-'><img src='../img/ic_time.png'>");
    var date = e.time.split(" ");
    a.push(date[0] + "</span></div></div>");
    var newI = a.join("");
    a = null;
    return newI;
}

function sortByPlay(a,b) {
    return parseInt($(a).find(".views").text()) > parseInt($(b).find(".views").text())? -1:1;
}

function conMostViews() {
    var sortEle = $(".newest>.small-item").sort(sortByPlay);
    $(".most").empty().append(sortEle);
}

/*function connMostViews() {
    alert("sort!");
    var sortEle = $(".most>div").sort(sortByPlay);
    $(".most").empty().append(sortEle);
}*/

//<div class="small-item">
//                             <a href="" target="_blank" class="cover"><img src><span class="length">147:52</span> </a>
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

function newFollowItem(e) {
    var a=[];
    a.push("<li class='list-item " + e.id + "'><a href='../user/otherSpace.html?uid=" + e.id + "' target='_blank' class='cover'><img src='");
    $.ajax({    //获取用户头像
        type: "GET",
        url: "http://47.93.139.52:8000/user/uid" + e.id + "/get-avatar",
        contentType: "application/json;charset=utf-8",
        async:false,
        success: function (data) {
            var ajson = getJson(data);
            if (ajson[0].code == 200) {
                var ajjson = getJson(ajson[0].data);
                if (ajjson[0].file != null) {
                    var avatarClient = OSS.Wrapper({
                        accessKeyId: ajjson[0].guest_key,
                        accessKeySecret: ajjson[0].guest_secret,
                        bucket: 'pilipili-bucket',
                        region: 'oss-cn-beijing',
                        stsToken: ajjson[0].security_token + '',//token
                    });
                    a.push(avatarClient.signatureUrl(ajjson[0].file) + "' class='cover'>");
                }
                else {
                    a.push( "../img/null_avatar.png' class='cover'>");
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

    a.push("</a><div class='content'><a href='../user/otherSpace.html?uid=" + e.id + "' target='_blank' class='title'><span>" + e.username + "</span></a>");
    a.push("<p class='auth-description'>" + e.sign + "</p><div class='fans-action'><div class='fans-action-follow'><span follow-id='"+ e.id + "' class='fans-action-text'>取消关注</span></div> </div>");
    a.push("</div></li>");
    var newI = a.join("");
    a = null;
    return newI;
}

function newFanItem(e) {
    var a=[];
    a.push("<li class='list-item " + e.id + "'><a href='../user/otherSpace.html?uid=" + e.id + "' target='_blank' class='cover'><img src='");
    $.ajax({    //获取用户头像
        type: "GET",
        url: "http://47.93.139.52:8000/user/uid" + e.id + "/get-avatar",
        contentType: "application/json;charset=utf-8",
        async:false,
        success: function (data) {
            var ajson = getJson(data);
            if (ajson[0].code == 200) {
                var ajjson = getJson(ajson[0].data);
                if (ajjson[0].file != null) {
                    var avatarClient = OSS.Wrapper({
                        accessKeyId: ajjson[0].guest_key,
                        accessKeySecret: ajjson[0].guest_secret,
                        bucket: 'pilipili-bucket',
                        region: 'oss-cn-beijing',
                        stsToken: ajjson[0].security_token + '',//token
                    });
                    a.push(avatarClient.signatureUrl(ajjson[0].file) + "' class='cover'>");
                }
                else {
                    a.push( "../img/null_avatar.png' class='cover'>");
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

    a.push("</a><div class='content'><a href='../user/otherSpace.html?uid=" + e.id + "' target='_blank' class='title'><span>" + e.username + "</span></a>");
    a.push("<p class='auth-description'>" + e.sign + "</p>");
    a.push("</div></li>");
    var newI = a.join("");
    a = null;
    return newI;
}

//  <li class="list-item">
//                                     <a href="" target="_blank" class="cover">
//                                         <img src="" class="cover">
//                                     </a>
//                                     <div class="content">
//                                         <a href="" target="_blank" class="title">
//                                             <span class="this-is-vip">nightayk</span>
//                                         </a>
//                                         <p class="auth-description">没有签名</p>
//                                         <div class="fans-action">
//                                             <div class="fans-action-follow">
//                                                 <span class="fans-action-text">取消关注</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </li>