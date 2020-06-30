$("#file_input").on("change",function (e) {
    var file = e.target.files[0];   // 获取图片资源
    var fileTypes = [ "jpg", "png"];
    var bTypeMatch = false
    for (var i = 0; i < fileTypes.length; i++) {
        var start = file.name.lastIndexOf(".");
        var fileType = file.name.substring(start + 1);
        if (fileType.toLowerCase() == fileTypes[i]) {
            bTypeMatch = true;
            break;
        }
    }
    if(bTypeMatch){
        var reader = new FileReader();
        reader.readAsDataURL(file); // 读取文件
        reader.onload = function (arg) {    // 渲染文件
            $(".img-container img").attr("src", arg.target.result);
            $(".reset-img").css("display","block");
            $(".first-change-lb").css("display","none");
            $(".img-new-wrap .new-container").css("background-image","url(" + arg.target.result + ")");
            $(".img-preview-wrap").css("display","none");
            $(".img-new-wrap").css("display","block");
            $(".modal-footer input").removeClass("disabled");
        }
    }
    else {
        alert("仅限jpg，png格式！");
        return false;
    }
});

$(".reset-img label").click(function () {
    $(".img-container img").attr("src","");
    $(".reset-img").css("display","none");
    $(".first-change-lb").css("display","block");
    $(".img-new-wrap .new-container").css("background-image","none");
    $(".img-preview-wrap").css("display","block");
    $(".img-new-wrap").css("display","none");
    $(".modal-footer input").addClass("disabled");
});

$(".trade-list-wrapper .trade-wrapper").click(function () {
    if($(".trade-list-wrapper .is-selected").hasClass("trade-customn")){
        $(".trade-list-wrapper .tips").css("display","block");
        $(".trade-list-wrapper .enter-wrapper").css("display","none");
        $(".trade-list-wrapper .enter-wrapper input").val("");
        $(".trade-list-wrapper .enter-wrapper .enter-tip").html("");
    }
    $(".trade-list-wrapper .is-selected").removeClass("is-selected");
    $(this).addClass("is-selected");
    if($(this).hasClass("trade-customn")){
        $(".trade-list-wrapper .tips").css("display","none");
        $(".trade-list-wrapper .enter-wrapper").css("display","block");
    }
    else{
        $(".qrpay-content .price").css("display","block");
        $(".qrpay-content .price p").html($(".is-selected .cost").text() + ".00");
    }
});

$(".s-left .s-list").click(function () {
   $(".s-left .on").removeClass("on router-link-active");
   $(this).addClass("on router-link-active");

   $(".s-right .right-on").removeClass("right-on");
   if($(this).hasClass("s-left-home")){
       $(".s-right .s-right-home").addClass("right-on");
   }
   else if($(this).hasClass("s-left-vip")){
       $(".s-right .s-right-vip").addClass("right-on");
   }
   else if($(this).hasClass("s-left-info")){
       $(".s-right .s-right-info").addClass("right-on");
   }
   else if($(this).hasClass("s-left-avatar")){
        $(".s-right .s-right-avatar").addClass("right-on");
    }
    else{
        $(".s-right .s-right-coin").addClass("right-on");
   }
});

$(".el-radio-group .el-radio-button").click(function () {
    if($(this).hasClass("is-active")){
        return false;
    }

    else{
        if($(this).hasClass("man")){
            alert("man");
        }
        else{
            alert("woman");
        }

        $(".el-radio-group .is-active").removeClass("is-active");
        $(this).addClass("is-active");
    }
});

$(".face-g-action").click(function () {
    $(".s-right .s-right-avatar").removeClass("right-on");
    $(".s-right .s-right-upload").addClass("right-on");
});

$(".upload-to-avatar").click(function () {
    $(".s-right .s-right-upload").removeClass("right-on");
    $(".s-right .s-right-avatar").addClass("right-on");
    return false;
});

$(".home-to-update").click(function () {
    $(".s-right .s-right-home").removeClass("right-on");
    $(".s-right .s-right-info").addClass("right-on");
    $(".s-left .s-left-home").removeClass("on router-link-active");
    $(".s-left .s-left-info").addClass("on router-link-active");
});

$(".coin-link").click(function () {
    $(".s-right .s-right-home").removeClass("right-on");
    $(".s-right .s-right-coin").addClass("right-on");
    $(".s-left .s-left-home").removeClass("on router-link-active");
    $(".s-left .s-left-coin").addClass("on router-link-active");
    return false;
});