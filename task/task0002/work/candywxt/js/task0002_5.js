window.onload = drag;
var box1 = $('#box1');
var box2 = $('#box2');
var item = $('#item4');
function drag() {
    item.onmousedown = fnDown;
}
function fnDown(event) {
    event = event || window.event;
    var disX=event.clientX-item.offsetLeft;
    var disY=event.clientY-item.offsetTop;
  // 移动
    document.onmousemove=function(event){
  	    event = event || window.event;
  	    fnMove(event,disX,disY);
      }
  // 释放鼠标
    document.onmouseup=function(){
  	    document.onmousemove=null;
  	    document.onmouseup=null;
      }
}
function fnMove(e,posX,posY){
    var l=e.clientX-posX,
        t=e.clientY-posY,
        winW=document.documentElement.clientWidth || document.body.clientWidth,
        winH=document.documentElement.clientHeight || document.body.clientHeight,
        maxW=winW-item.offsetWidth,
        maxH=winH-item.offsetHeight;
    console.log(l)
    if ( l < 0 ) {
        l = 0;
    }
    else if (l > maxW) {
        l = maxW;
    }
    if (t < 0) {
        t = 0;
    }
    else if (t > maxH) {
        t=maxH;
    }
    item.style.left=l+'px';
    item.style.top=t+'px';
}