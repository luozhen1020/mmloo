
/************
    定义设置 cookie 方法
    参数:name【cookie 名】,  value【cookie 的值】,   time【cookie 的有效时间(用分钟为单位)】
************/
function setCookie(name, value,src, time) {
    var _expires = new Date();
    if (time > 0) {
        _expires.setMinutes(_expires.getMinutes() + time);
    } else {
        _expires.setYear(_expires.getFullYear() + time);
    }
    document.cookie = name + '=' + value +'=' + src + ';path=;expires=' + _expires;
}


/************
    定义获取 cookie 方法
    参数:
    返回值(数组对像)：var _array = [{"name": "name1", "value": "value1"}, {"name": "name2", "value": "value2"}]
************/
function getCookie() {
    //定义要返回的结果
    var result = [];
    //"name1=value1;name2=value2"
    var _cookie = document.cookie;
    if (!_cookie) {
        return result;
    }
    //将字符串分隔成字符串数组
    //["name1=value1", "name2=value2"]
    var cookieArray = _cookie.split(';');
    //如果 cookie 数组为空，返回一个空数组
    if (cookieArray.length < 1) {
        return result;
    }
    //遍历 cookie 数组
    for (var i = 0; i < cookieArray.length; i++) {
        //"name1=value1" "name2=value2"
        var _str = cookieArray[i];
        //["name1", "value1"] ["name2", "value2"]
        var _strArray = _str.split('=');
        
        //{"name": "name1", "value": "value1"} {"name": "name2", "value": "value2"}
        var _obj = { "name": _strArray[0], "value": _strArray[1] ,"src":_strArray[2]};
        result.push(_obj);
    }
    return result;
}


/************
    定义删除 cookie 方法
    参数:
    返回值(数组对像)：{ "total": 0, "delcount": 0}(total：cookie 的总数量；delcount: cookie 被删除的数量);
************/
function delCookie(){
    //获取 cookie
    var cookies = getCookie();

    //console.log(cookie);
    //如果 cookie 为空则返回对应的对像结果
    if (cookies.length < 1) {
        return { "total": 0, "delcount": 0};
    }
    //删除 cookie 的数量
    var _delcount = 0
    for (var i = 0; i < cookies.length; i++) {
        //获取数组当中的 cookie
        var cookie = cookies[i];
        //设置对应 cookie 失效
        setCookie(cookie.name, cookie.value, -1);
        _delcount++;
    }
    return { "total": cookies.length, "delcount": _delcount };
}