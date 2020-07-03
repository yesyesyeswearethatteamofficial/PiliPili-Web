window.onload=function () {
    if(sessionStorage.getItem("token") == null  ){
        window.location.href="../user/login.html";
    }

    $(".mini-avatar img").attr("src",sessionStorage.getItem("avatar"));


    $("#video_input").on("change", function (e) {
        var file = e.target.files[0];   // 获取视频资源
        var fileTypes = ["mp4", "mpeg"];
        var bTypeMatch = false
        for (var i = 0; i < fileTypes.length; i++) {
            var start = file.name.lastIndexOf(".");
            var fileType = file.name.substring(start + 1);
            if (fileType.toLowerCase() == fileTypes[i]) {
                bTypeMatch = true;
                break;
            }
        }
        if (bTypeMatch) {
            var reader = new FileReader();
            reader.readAsDataURL(file); // 读取文件
            reader.onload = function (arg) {    // 渲染文件
                $(".video-container video").attr("src", arg.target.result);
                $(".reset-video").css("display", "block");
                $(".first").css("display", "none");
                $(".cover-clip-wrap").css("display", "block");
                $(".descript").text("视频上传成功，请继续上传视频封面");
            }
        }
        else {
            alert("仅限mp4,mpeg格式！");
            return false;
        }
    });

    $(".reset-video label").click(function () {
        location.reload();
    });

    $("#cover_input").on("change", function (e) {
        var file = e.target.files[0];   // 获取图片资源
        var fileTypes = ["jpg", "png"];
        var bTypeMatch = false
        for (var i = 0; i < fileTypes.length; i++) {
            var start = file.name.lastIndexOf(".");
            var fileType = file.name.substring(start + 1);
            if (fileType.toLowerCase() == fileTypes[i]) {
                bTypeMatch = true;
                break;
            }
        }
        if (bTypeMatch) {
            var reader = new FileReader();
            reader.readAsDataURL(file); // 读取文件
            reader.onload = function (arg) {    // 渲染文件
                $(".cover-container img").attr("src", arg.target.result);
                $(".reset-cover").css("display", "block");
                $(".second").css("display", "none");
                $(".descript").text("封面上传成功，请完善视频信息");
                $(".info-clip-wrap").css("display", "block");
                $(".modal-footer input").removeClass("disabled");
            }
        }
        else {
            alert("仅限jpg,png格式！");
            return false;
        }
    });

    $(".reset-cover label").click(function () {
        $(".cover-container img").attr("src", "");
        $(".reset-cover").css("display", "none");
        $(".info-clip-wrap").css("display", "none");
        $(".second").css("display", "block");
        if (!$(".modal-footer input").hasClass("disabled")) {
            $(".modal-footer input").addClass("disabled");
        }
        $(".descript").text("请重新上传视频封面");
        return false;
    });

    $(".modal-btn").click(function () {
        if ($(".modal-btn").hasClass("disabled")) {
            return false;
        }
        if ($(".el-input__inner").val() == "") {
            alert("Sb");
            if (!$(".el-input").hasClass("red")) {
                $(".el-input").addClass("red");
                $(".el-input__inner").attr("placeholder", "视频名称不能为空！！！")
            }
            return false;
        }
        else {
            $.ajax({
                type: "POST",
                data: {"filename": getFileName($(".video-container video").val())},
                url: 'http://47.93.139.52:8000/video/video-upload-new',
                headers: {
                    'Authorization': 'JWT ' + sessionStorage.getItem("token")
                },
                dataType: "json",
                async: false,
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    var json = getJson(data);
                    if (json[0].code == 200) {
                        var jjson = getJson(json[0].data);
                        var videoClient = OSS({
                            accessKeyId: jjson[0].guest_key + '',
                            accessKeySecret: jjson[0].guset_secret + '',
                            bucket: 'pilipili-bucket',
                            region: 'https://oss-cn-beijing.aliyuncs.com',
                            stsToken: jjson[0].security_token + '',//token
                        });
                        videoClient.multipartUpload(jjson[0].file, $(".video-container video").files[0]);
                        $.ajax({
                            type: "POST",
                            data: {"filename": jjson[0].file},
                            url: 'http://47.93.139.52:8000/video/cover-new',
                            headers: {
                                'Authorization': 'JWT ' + sessionStorage.getItem("token")
                            },
                            async: false,
                            contentType: "application/json;charset=utf-8",
                            success: function (data) {
                                window.location.href = "account.html?to=avatar";
                            },
                            error: function (data) {
                                alert("头像上传失败");
                                return false;
                            }
                        });
                    }
                },
                error: function (data) {
                    alert("头像上传失败");
                    return false;
                }
            });
        }
    });
}
