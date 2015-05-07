var btnDone = $('#done');
$.on(btnDone,'click',show);
function show(){
    var hobby = $('#hobby').value;
    var arr = [];
    hobby = hobby.split(/[\s,，、；]/i);
    for (var i = 0, len = hobby.length; i < len; i++) {
        hobby[i] = trim(hobby[i]);
    }
    hobby = uniqArray(hobby);
    hobby = trimArray(hobby);
    if (hobby.length === 0) {
        error(0);
    }
    else if (hobby.length > 10) {
        error(10);
    }
    else {
        error(1);
        right(hobby);
    }
    return hobby;
}
function error(txt) {
    var error = $('#error');
    switch (txt) {
        case 0 : error.innerHTML = '请至少输入一个爱好';
            break;
        case 10 : error.innerHTML = '爱好不能超过十个！';
            break;
        default : error.innerHTML = '';
    }
}
function right(hobby) {
    var result =  $('#result');
    result.innerHTML = '';
    var p = document.createElement('p');
    p.innerHTML = '您的爱好如下：';
    result.appendChild(p);
    for (var i = 0,len = hobby.length; i < len; i++) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = hobby[i];
        result.appendChild(checkbox);
        
        var label = document.createElement('label');
        label.setAttribute('for',hobby[i]);
        label.innerHTML = hobby[i];
        result.appendChild(label);
    }
}