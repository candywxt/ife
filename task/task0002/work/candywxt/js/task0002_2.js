var time = $('#time');
console.log(time);
var btn = $('#btn');
var result = $('#result');
console.log(btn);
$.on(btn,'click',run);
function run(){
    var arr = time.value.split("-");
    var setDate = new Date(arr[0],arr[1]-1,arr[2]);
    difTime = setDate.getTime() - new Date().getTime();
    if (difTime > 0) {
       clearInterval(update);
       setInterval(function() {
            //显示倒计时
            update();
        },1000)
        console.log("right!");
    }
    else {
        clearInterval(update);
        console.log("wrong!");
    }
    console.log(setDate,difTime);
}
function update() {
    clearInterval(update);
    if (difTime>0){
        difTime--;
        var oD = Math.floor(difTime/3600/24/1000);
        var oH = Math.floor((difTime/1000-oD*24*3600)/3600);
        var oM = Math.floor((difTime/1000-oD*24*3600-oH*3600)/60);
        var oS = difTime%60;
        result.innerHTML = oD+"天"+oH+"小时"+oM+"分钟"+oS+"秒";
    }
    if (difTime === 0) {
        consloe.log('时间到！')
    }
    setInterval(result.innerHTML,1000);
}