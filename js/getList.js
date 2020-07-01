window.onload=function(){
    $(".mini-user-avatar img").attr("src",sessionStorage.getItem("avatar"));


    $.ajax({
        type: "GET",
        url: "http://47.93.139.52:8000/video/list-video",
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            var json = getJson(data);
            if (json[0].code == 200) {
                var jjson = getJson(json[0].data);
                for(item of jjson[0].video_list){
                    $.ajax({
                        type: "GET",
                        url: "http://47.93.139.52:8000/video/pv" + item + "/details",
                        contentType: "application/json;charset=utf-8",
                        headers: {
                            'Authorization': 'JWT ' + sessionStorage.getItem("token")
                        },
                        success:function (data) {
                            var i_json = getJson(data);
                            if(i_json[0].code == 200){
                                var i_jjson = getJson(i_json[0].data);
                                newItem(i_jjson[0]);
                            }
                        },
                        error: function (data) {
                            alert("获取视频详细信息失败");
                            location.reload();
                        }
                    });
                }
            }
            else{
                alert("获取视频列表信息失败");
                location.reload();
            }
        },
        error: function (data) {
            alert("获取视频列表信息失败");
            location.reload();
        }
    });
}