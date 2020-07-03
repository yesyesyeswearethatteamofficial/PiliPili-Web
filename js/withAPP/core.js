function stable($var) {
    $('#type').fadeOut(0);
    if ($var == 1) {
        $('#stable').fadeIn(0);
        $('#step1').fadeIn(500);
    } else {
        $('#beta').fadeIn(0);
        $('#beta_devices').fadeIn(500);
        // beta_devices();
    }
}

function beta_versions() {
    $.ajax({
        type: "GET",
        url: "api/beta/versions",
        dataType: "json",
        success: function (data) {
            if (data.error) {
                alert(data.error);
            } else {
                $('#beta_versions').children('.list').empty();
                $.each(data, function (i) {
                    var name = data[i]['os_version'];
                    console.log(name);
                    $('#beta_versions').children('.list').append("<div class=\"select-beta-devices-type\"> <div class=\"btn left big broad\"><a href=\"javascript:;\" onclick=\"beta_devices('" + name + "')\">" + name + "</a></div></div>");
                });
            }
        }
    });
}

function beta_devices_list($var) {
    $.ajax({
        type: "GET",
        url: "api/beta/devices/" + $var,
        dataType: "json",
        success: function (data) {
            if (data.error) {
                alert(data.error);
            } else {

                $('#beta_devices_list').fadeIn(500);

                $('#beta_devices').fadeOut(0);
                $('#beta_versions_list').fadeOut(0);
                $('#beta_firmwarm_info').fadeOut(0);

                $('#beta_devices_list').children('.list').empty();

                console.log("test");

                $.each(data, function (i) {
                    var name = data[i]['device_name'];
                    var show_name = data[i]['show_name'];
                    console.log(name);
                    $('#beta_devices_list').children('.list').append("<div class=\"select-beta-devices-type\"> <div class=\"btn left big broad\"><a href=\"javascript:;\" onclick=\"beta_versions_list('" + name + "')\">" + show_name + "</a></div></div>");
                });
            }
        }
    });
}

function beta_versions_list($var) {

    var device_name = $var;

    $.ajax({
        type: "GET",
        url: "api/beta/versions/" + $var,
        dataType: "json",
        success: function (data) {
            if (data.error) {
                alert(data.error);
            } else {

                $('#beta_versions_list').fadeIn(500);

                $('#beta_devices').fadeOut(0);
                $('#beta_devices_list').fadeOut(0);
                $('#beta_firmwarm_info').fadeOut(0);

                $('#beta_versions_list').children('.list').empty();

                $.each(data, function (i) {
                    var name = data[i]['os_version'];
                    console.log(name);
                    $('#beta_versions_list').children('.list').append("<div class=\"select-beta-devices-type\"> <div class=\"btn left big broad\"><a href=\"javascript:;\" onclick=\"beta_firmware_info('" + device_name + "','" + name + "')\">" + name + "</a></div></div>");
                });
            }
        }
    });
}


function device($var) {
    $('#step2').removeClass();
    $('#step2').addClass($var);
    $.ajax({
        type: "GET",
        url: "api/" + $var + "/condensed",
        dataType: "json",
        success: function (data) {
            if (data.error) {
                alert(data.error);
            } else {
                $('#step1').fadeOut(0);
                $('#step2').fadeIn(500);
                $('#step2').children('.list').empty();
                $.each(data, function (i) {
                    var show_name = data[i]['show_name'];
                    var id = data[i]['identifier'];
                    $('#step2').children('.list').append("<div class=\"select-devices-type\"><div class=\"btn left big broad\"><a href=\"javascript:;\" onclick=\"identifier('" + id + "')\" id=\"identifier_" + id + "\">" + show_name + "</a></div></div>");
                });
            }
        }
    });
}

function identifier($var) {
    $.ajax({
        type: "GET",
        url: "api/" + $var + "/index/signing",
        dataType: "json",
        success: function (data) {
            if (data.error) {
                alert(data.error);
            } else {
                $('#step2').fadeOut(0);
                $('#step3').fadeIn(500);
                $('#step3').children('.list').empty();
                $.each(data, function (key, value) {
                    if (value['signing'] == 1) {
                        var $sign = 'signing'
                    } else {
                        var $sign = 'stopped'
                    }
                    $('#step3').children('.list').append("<div class=\"btn left big narrow " + $sign + "\"><a href=\"javascript:;\" onclick=\"firmware('" + $var + "','" + key + "')\" id=\"identifier_" + key + "\">" + value['version'] + "</a></div>");
                });
            }
        }
    });
}



function previous_step($var) {
    $('#type').fadeOut(0);
    $('#step1').fadeOut(0);
    $('#step2').fadeOut(0);
    $('#step3').fadeOut(0);
    $('.info').fadeOut(0);
    $('#beta_devices').fadeOut(0);
    $('#beta_devices_list').fadeOut(0);
    $('#beta_versions_list').fadeOut(0);
    $('#beta_firmwarm_info').fadeOut(0);


    switch ($var) {
        case 0:
            $id = 'type';
            break;
        case 1:
            $id = 'step1';
            break;
        case 2:
            $id = 'step2';
            break;
        case 3:
            $id = 'step3';
            break;
        case 4:
            $id = 'beta_devices';
            break;
        case 5:
            $id = 'beta_devices_list';
            break;
        case 6:
            $id = 'beta_versions_list';
            break;
        case 7:
            $id = 'beta_firmwares_info';
            break;
    }
    $('#' + $id).fadeIn(0);

}


function bytesToSize(bytes) {
    if (bytes === 0) return '0 B';

    var k = 1024;

    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];                                                                                                       //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

function elementPosition(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        curleft = obj.offsetLeft;
        curtop = obj.offsetTop;
        while (obj = obj.offsetParent) {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        }
    }
    return {x: curleft, y: curtop};
}

function ScrollToControl(id) {
    var elem = document.getElementById(id);
    var scrollPos = elementPosition(elem).y;
    var heightTop = document.documentElement.scrollTop || document.body.scrollTop;
    scrollPos = scrollPos - heightTop - 70;
    var remainder = scrollPos % 50;
    var repeatTimes = (scrollPos - remainder) / 50;
    ScrollSmoothly(scrollPos, repeatTimes);
    window.scrollBy(0, remainder);
}

var repeatCount = 0;
var cTimeout;

function ScrollSmoothly(scrollPos, repeatTimes) {
    if (repeatCount < repeatTimes) {
        window.scrollBy(0, 50);
    }
    else {
        repeatCount = 0;
        clearTimeout(cTimeout);
        return;
    }
    repeatCount++;
    cTimeout = setTimeout("ScrollSmoothly('" + scrollPos + "','" + repeatTimes + "')", 50);
}

function install_profile($model) {
    var url = "http://" + window.location.host + "/Install/" + $model;
    if ($model == "tvOS12" || $model == "tvOS13") {
        var copy_tvos_text = "https://iBeta.me/install/" + $model;
        $("#" + $model).attr("href", "javascript:;");
        $("#" + $model).attr("data-clipboard-text", copy_tvos_text);
        var clipboard = new ClipboardJS("#" + $model);
        clipboard.on('success', function (e) {
            console.log(e);
        });
        clipboard.on('error', function (e) {
            console.log(e);
        });
    }
    window.open(url, "_blank");
}

$(function () {
    $('#appCardLoadMore').bind('click', function () {
        $('.card-app-unshow-more').attr("class", "app-card-item card-app-show-more");
        $('#appCardLoadMore').fadeOut(0.5);
        $('#appCardLoadLess').fadeIn(0.5);
    });
});

$(function () {
    $('#appCardLoadLess').bind('click', function () {
        $('.card-app-show-more').attr("class", "app-card-item card-app-unshow-more");
        $('#appCardLoadLess').fadeOut(0.5);
        $('#appCardLoadMore').fadeIn(0.5);
    });
});
