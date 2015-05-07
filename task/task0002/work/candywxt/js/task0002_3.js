   window.onload = function(){
    var positive = $('#positive');
    var inverted = $('#inverted');
    
    var box = $('#box');
    var list = $('#list');
    var buttons = document.getElementById("buttons").getElementsByTagName("span");
    var prev = $('#prev');
    var next = $('#next');
    
    // 按钮索引
    var index = 1;
    // 是否自动播放
    var animated = false;
    var timer;
    
    //默认轮播间隔时间
    var t =2000;
    // 用户自定义轮播间隔时间
    var myFast = 3000;
    var mySlow = 6000;
    
    function showButton() {
        for (var i = 0,len = buttons.length; i < len; i++) {
            if( buttons[i].className == 'on'){
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';
    }
    
    function animate(offset) {
        if (offset == 0) {
            return;
        }
        animated = true;
        var newLeft = parseInt(list.style.left)+ offset ;
        var time =300;
        var interval = 10;
        var speed = parseInt(offset/(time/interval));
        
        var go = function (){
            if( ( speed < 0 && parseInt(list.style.left) > newLeft ) || ( speed > 0 && parseInt(list.style.left ) < newLeft ) ){
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go,interval);
            }
            else {
                animated = false;
                list.style.left = newLeft + 'px';
                if(newLeft > -173){
                    list.style.left = -2600 + 'px';
                }
                if(newLeft < -2600){
                    list.style.left = -520 +'px';
                }
                animated = false;
            }
        }
        go();
    }
    
    function play(t){
        timer = setInterval(function(){
            next.onclick();
        },t);
    }
    
    function invertedPlay(t){
        timer = setInterval(function(){
            prev.onclick();
        },t);
    }
    
    function stop(){
        clearInterval(timer);
    }
    next.onclick = function(){
        if (index == 5) {
            index = 1;
        }
        else {
            index++;
        }
        showButton();
        if (!animated) {
            animate(-520);
        }
    }
    prev.onclick = function(){
         if (index == 1) {
            index = 5;
        }
        else {
            index--;
        }
        showButton();
        if(!animated){
            animate(520);
        }
    }
    for (var i = 0,len = buttons.length;i < len; i++){
        buttons[i].onclick = function(){
            if (animated) {
                return;
            }
            if(this.className == 'on'){
                return;
            }
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -520 * (myIndex - index);
            
            animate(offset);
            index = myIndex;
            showButton();
            
        }
    }
       
    box.onmouseover = stop;
    box.onmouseout = play(t);
    
    // 定制轮播图
    // 正序
    positive.onclick = function() {
        stop();
        play(t);
    };
    //倒序
    inverted.onclick = function() {
        stop();
        invertedPlay(t);
    }
    //不循环
    nocircle.onclick = function() {
        stop();
    }
    //3秒
    fast.onclick = function() {
        stop();
        play(myFast);
    }
    slow.onclick = function() {
        stop();
        play(mySlow);
    }
}