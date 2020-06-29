window.onload=function() {

    $("#danmup").DanmuPlayer({src: "../testv.mp4", width: 657, height: 464});
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

    $("#danmup .danmu-div").danmu("addDanmu", [

        {text: "这是滚动弹幕", color: "white", size: 1, position: 0, time: 2}

        , {text: "这是顶部弹幕", color: "yellow", size: 1, position: 1, time: 3}

        , {text: "这是底部弹幕", color: "red", size: 1, position: 2, time: 3}

    ]);


}
