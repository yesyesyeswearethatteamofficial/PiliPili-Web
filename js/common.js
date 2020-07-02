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