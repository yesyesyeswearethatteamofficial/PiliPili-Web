window.onload=function () {
    if(sessionStorage.getItem('page') == "NaN"){
        sessionStorage.setItem("page",1);
        return false;
    }
}

var cypSwiper = new Swiper('#downCont', {
    loop: true,
    onSlideChangeEnd: function (cypSwiper) {
        var index = cypSwiper.realIndex;
        $(".down_pic img").attr("src","img/phoneUI" + ((parseInt(sessionStorage.getItem('page')) % 4) + 1) + ".jpg");
        sessionStorage.setItem("page",(parseInt(sessionStorage.getItem('page')) % 4) + 1);
    }
});

$(".down_nav li").click(function () {
    var i = $(this).index() + 1;
    cypSwiper.slideTo(i, 500, false);
    $(this).addClass("active").siblings().removeClass("active");
});


$(function () {
    $(".androidDown").each(function() {
        $(this).click(function () {
            var downUrl = $(this).attr("url");
            $("#AndroidUrl").attr("href", downUrl);
            $("#spAndroid").click();
        });
    });

    $(".iosDown").each(function() {
        $(this).click(function () {
            var downUrl = $(this).attr("url");
            $("#IosUrl").attr("href", downUrl);
            $("#spIos").click();
        });
    });
});

