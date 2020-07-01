$(".toSpace-item").click(function () {
   window.open("userPage.html");
   return false;
});

$(".toVip").click(function () {
    sessionStorage.setItem("toVip","true");
    window.open("account.html");
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

function newItem(e) {
    var a = [];
    a.push("<div class='small-item'><a href='../video/videoPage.html");
    a.push("?pid=" + e.pv + "' target='_blank'><img src='");

    var bj = getJson(e.bucket_cover);
    var coverClient = OSS.Wrapper({
        accessKeyId: bj[0].guest_key,
        accessKeySecret: bj[0].guest_secret,
        bucket: 'pilipili-bucket',
        region: 'pilipili-bucket.oss-cn-beijing',
        stsToken: bj[0].security_token,//token
    });

    a.push(coverClient.getObjectUrl(bj[0].file) + "'><span class='length'>");
    a.push(e.duration + "</span></a><a href='../video/videoPage.html");
    a.push("?pid=" + e.pv + "' target='_blank' class='title'>");
    a.push(e.title + "</a><div class='meta'><span class='play'><img src='../img/ic_play.png'>");
    a.push(e.views + "</span><span class='time-'><img src='../img/ic_time.png'>");
    var date = e.time.split(" ");
    a.push(date[0] + "</span></div></div>");
    var newI = a.join("");
    a = null;
    $(".section").append(newI);
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