$(".ops #likeVideo").click(function () {    //点赞&取消点赞
    if($(".ops #likeVideo").hasClass("unlike")){


        $(".ops #likeVideo").removeClass("unlike");
        $(".ops #likeVideo").addClass("liked");
        $(".ops #likeVideo img").attr("src","../img/img_like_fin.png");
    }
    else{


        $(".ops #likeVideo").removeClass("liked");
        $(".ops #likeVideo").addClass("unlike");
        $(".ops #likeVideo img").attr("src","../img/img_like.png");
    }
});

$(".ops #stowVideo").click(function () {    //收藏&取消收藏
    if($(".ops #stowVideo").hasClass("unstow")){


        $(".ops #stowVideo").removeClass("unstow");
        $(".ops #stowVideo").addClass("stowed");
        $(".ops #stowVideo img").attr("src","../img/img_stow_fin.png");
    }
    else{


        $(".ops #stowVideo").removeClass("stowed");
        $(".ops #stowVideo").addClass("unstow");
        $(".ops #stowVideo img").attr("src","../img/img_stow.png");
    }
});

$(".up-info .btn-panel .default-btn").click(function () {
   if($(this).hasClass("following")){
       if(confirm("你确定要取消对 " + $(".u-info .username").html() + " 的关注吗？")){

           $(this).removeClass("following");
           $(this).addClass("not-follow");
       }

   }
   else{

       $(this).removeClass("not-follow");
       $(this).addClass("following");
   }
});