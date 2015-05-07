search = $('.search');
console.log(search);
$.on(search,'keyup',show);
var oldText = null;
var c = null;
var data;
fakeData = ['text1','text2','1'];
function show(e) {
    var event = e || window.event;
    var text = myRe(search.value);
    if (text === oldText) {
        if (evetn.keyCode === 38) {
            if (c !== null) {
                c = (c-1+data.length)%data.length;
            }
            else {
                c = data.length - 1;
            }
        }
        else if (event.keyCode === 40) {
            if (c !== null) {
                c = (c+1)%data.length;
            }
            else {
                c = 0;
            }
        }
        else if (event.keyCode === 13) {
            if (data[c] !== null) {
                search.value = data[c];
                ul.style.visibility = 'hidden';
                return;
            }
        }
    }
    else {
        c = null;
        oldText = text;
        if(!text) {
            ul.style.visibility = 'hidden';
            return;
        }
        var re = new RegExp('^' + text);
        data = fakeData.filter(function(d) {
            return re.test(d);
        })
        if (data.length !== 0) {
            ul.style.visibility = 'visible';
        }
    }
    ul.innerhtml = '';
    for (var i in data) {
        var li = document.createElement('li');
        ul.appendChild(li);
        if (text) {
            li.innerHTML = data[i].replace(new RegExp('(^' + test + ')'),'<span>$1</span>')
        }
    }
    if (c !== null) {
        ul.children[c].className = 'selected';
    }
}