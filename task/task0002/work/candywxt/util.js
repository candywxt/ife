// 任务2
// 判断arr是否为一个数组，返回bool值
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}
// 判断fn是否为一个函数，返回bool值
function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}
// 使用递归实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、object对象。
function cloneObject(src) {
    var result,oClass = isClass(src);
    if (oClass === 'Object') {
        result = {};
    }
    else if (oClass === 'Array') {
        result = [];
    }
    else {
        return src;
    }
    for (key in src) {
        var copy = src[key];
        if (isClass(copy) === 'Object') {
            result[key] = arguments.callee(copy);
        }
        else if (isClass(copy) === 'Array') {
            result[key] = arguments.callee(copy);
        }
        else {
            result[key] = src[key];
        }
    }
    return result;
}
function isClass(o) {
    if (o === null) {
        return 'Null';
    }
    if (o === undefined) {
        return 'Undefined';
    }
    return Object.prototype.toString.call(o).slice(8,-1);
}

// 学习数字，字符串、数字等相关方法，在util.js中实现以下函数
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var n = {};
    var r = [];
    arr.forEach(function (v) {
        if (!n[typeof(v) + v]) {
            n[typeof(v) + v] = true;
            r.push(v);
        }
    })
    return r
}

function trimArray(arr) {
    var r = [];
    for (var i = 0 ,len = arr.length; i < len; i++) {
        if (arr[i] != '') {
            r.push(arr[i]);
        }
    }
    return r;
}

// 对字符串头尾行空格字符的去除，包括全角半角空格，Tab等，返回一个字符串
// 先暂时不要简单的用一句增则表达式来实现
function trim(str) {
    if (str == null) {
        return "";
    }
    //去除前面所有空格
    while (str.charAt(0) == ' '　|| str.charAt(0) == '　') {
        str = str.substring(1,str.length);
    }
    //去除后面的空格
    while (str.charAt(str.length-1) == ' '　|| str.charAt(0) == '　') {
        str = str.substring(0,str.length-1);
    }
    return str;
}



// 实现一个遍历数组的方法，针对数组中每一个元素进行fn函数，并将数组索引和元素作为参数传递
// 其中fn函数可以接受两个参数：item和index
function each(arr, fn) {
	var i;
	for(i in arr) {
        fn(arr[i],i);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var i;
    var count = 0;
    for ( i in obj) {
        count++;
    }
   return count;      
}

//学会正则表达式，在util.js完成以下代码
//判断是否为邮箱地址
function isEmail(emailStr) {
    var myRe = /[\w+\-]+@[\w+\.]+[a-z]{2,3}/g;
    var result = myRe.test(emailStr);
    return result ? true : "请输入正确的邮箱！";
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var myRe = /1[3,5,8]{1}\d{9}/g;
    var result = myRe.test(phone);
    return result ? true : "请输入正确的手机号！";
}

//----------------------------------------------------
//任务三
//为dom增加一个样式名为newClassName的新样式
function check(element,className) {
    if (element.nodeType !== 1 || typeof className !== 'string') {
        return false;
    }
    return true;
}
function addClass(element, newClassName) {
    if (!element) {
        return;
    }
    if (element.classList) {
        var i = 0 ; 
        var c;
        if (check(element, newClassName)) {
            newClassName = newClassName.split(' ');
            while (c = newClassName[i++]) {
                element.classList.add(c);
            }
        }
    }
    else {
        if(check(element, newClassName)) {
            console.log("1");
            element.className += (element.className ? ' ' : '') + newClassName;
        }
    }
}

// 移除dom中样式oldClassName
function removeClass(element, oldClassName) {
    if (!element) {
        return;
    }
    if (element.classList) {
        var i = 0;
        var c;
        if (check(element,oldClassName)) {
            oldClassName = oldClassName.split(' ');
            while (c = oldClassName[i++]) {
                element.classList.remove(oldClassName);
            }
        }
    }
    else {
        if(check(element, oldClassName)) {
            element.className = element.className.replace(RegExp('\\b' + oldClassName + '\\b', 'g'), '')
        }
    }
}
// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode){
    if (!element || !siblingNode) {
        return false;
    }
    return element.parentNode === siblingNode.parentNode;
}

// 获取dom相对于浏览器的窗口的位置，返回一个对象{x，y}
function getPosition(element) {
    pos.x = element.offsetLeft;
    pos.y = element.offsetTop;
    var current = element.offsetParent;
    var pos = {};
    while (current != null) {
        pos.x += current.offsetLeft;
        pos.y += current.offsetTop;
        current = current.offsetParent;
    }
    return pos;
}

// 实现一个简单的Query
function $(selector) {
    var myRe = /[#|.|\[]{1}/g,
		myRe2 = /\w+/g,
        sign = myRe.exec(selector),
		selector = myRe2.exec(selector);
	if(sign == "#"){
		result = document.getElementById(selector);	
	   }
	else if(sign == "."){
	   	result = document.getElementsByClassName(selector);	
	   }
	else if(sign == "["){
		for(var i = 0,l = document.getElementsByTagName('*').length; i < l ; i++){
			result = document.getElementsByTagName('*')[i].getAttribute(selector);
			console.log(selector);
		}
	}
	else {
		result = document.getElementsByTagName(selector);
	}
	return result;
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    var element = element || document;
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent('on' + event, listener);
    }
    else {
        element['on' + event] = listener;
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    }
    else if (element.detachEvent) {
        element.detachEvent('on' + event, listener);
    }
    else {
        element['on' + event] = null;
    }
}
// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, 'click', listener)
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, 'keydown', function (e) {
        if (e.keyCode === 13) {
            listener.call(element, e);
        }
    });
}

function delegateEvent(element, tag, eventName, listener) {
    $.on(selector,eventName,function(event) {
        var event = event || window.event;
        var target = event.target || event.srcElement;
        var tname = target.nodeName.toLowerCase();
        if (tname === tag) {
            listener(event);
        }
    });
}

$.on = addEvent;
$.un = removeEvent;
$.enter = addEnterEvent;
$.click = addClickEvent;
$.delegate = delegateEvent;

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] : 0;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : 0;
    if(Sys.ie) {
        return Sys.ie; 
    }else{
        return -1;
    } 
}
// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = ''
        +cookieName 
        + '=' 
        + escape(cookieValue)
        +((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
}

// 获取cookie值
function getCookie(cookieName) {
    if(document.cookie.length > 0){
        c_start = document.cookie.indexOf(cookieName + "=")
        if (c_start != -1){
            c_start = c_start + cookieName.length+1;
            c_end = document.cookie.indexOf(";",c_start);
            if(c_end == -1){
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return "";
}

//学习Ajax,并尝试自己封装一个Ajax方法。
function ajax(url, options) {
    var data = options.data ? options.data : '';
    var type = options.type ? options.type : 'get';
    var onsuccess = options.onsuccess || function() {};
    var onfail = options.onfail || function() {};
    
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    }
    else {
        var xhr = new ActiveObject('Microsoft.XMLHTTP');
    }
    
    if (data) {
        url = url + '?';
        for (var key in data) {
            url = url + key + '=' + options.data[key] + '&';
        }
    }
    
    if (xhr != null) {
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                onsuccess(xhr.responseText,xhr);
            }
            else {
                onfail();
            }
            }
        };
        xhr.open(type, url,true);
        xhr.send(null);
    }
}