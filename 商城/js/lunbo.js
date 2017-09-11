
var oCarousel = document.querySelector('#carousel');
var oLeftBtn = document.querySelector('#leftBtn');
var oRightBtn = document.querySelector('#rightBtn');
var oCirclesLi = document.querySelector("#circles").querySelectorAll('li');
var oMUnit = document.querySelector("#m_unit");
var oUll = oMUnit.querySelector('#oUll');
var oLi =  document.querySelectorAll('#oUll li');

var imgLength = oLi.length;
var width = 780;
var animatetime = 800;
var tweenString = "ExpoEaseInOut";
var interval = 3000;
var lock = true;
var index = 0; //0 1 2 3 4

var timer = setInterval(rightBtnHandler, interval);
myajax.get('http://h6.duchengjiu.top/shop/api_ad.php?position_id=1', {}, function(error, responseText) {
    var json = JSON.parse(responseText);
    var data = json.data;

    for (var i = 0; i < imgLength; i++) {
        var obj = data[i];
//            var oA=document.createElement("a");
//            var oImae=document.createElement("img");
//            oLi[i].appendChild(oA);
//            oA.appendChild(oImae);
//            console.log(obj.url);
//            oImae[i].src=obj.url;
        oLi[i].innerHTML += `<a href="#"><img src="${obj.url}"></img></a>`;
        oUll.appendChild(oLi[0].cloneNode(true));
    }
})
oCarousel.onmouseover = function(){
    clearInterval(timer);
}
oCarousel.onmouseout = function() {
    timer = setInterval(rightBtnHandler, interval);
}

//把0号li克隆，然后添加到carouseUL的最后


oRightBtn.onclick = rightBtnHandler;
oLeftBtn.onclick  = function() {
    if (oMUnit.isAnimated) return;

    index--;
    if (index < 0) {
        index = imgLength - 1;
        oMUnit.style.left = -width * imgLength + 'px';
    }
    changeCircles();
    animate(oMUnit, {"left": -width*index}, animatetime, tweenString);
}

for (var i = 0; i < oCirclesLi.length; i++) {
    (function(i){
        oCirclesLi[i].onmouseover = function() {
            if (oMUnit.isAnimated) return;
            index = i;
            changeCircles();
            animate(oMUnit, {"left": -width*index}, animatetime, tweenString);
        }
    })(i);
}

function rightBtnHandler() {
    //如果本身在运动，则不做任何事
    if (oMUnit.isAnimated) return;

    index++;
    changeCircles();
    animate(oMUnit, {"left":-width*index}, animatetime, tweenString, function(){
        if (index > imgLength - 1) {
            index = 0;
            this.style.left = "0px";
        }
    });
}

//更换小圆点
function changeCircles() {
    //n是信号量的副本
    var n = index;
    if (n === imgLength) {
        n = 0;
    }

    for (var i = 0; i < oCirclesLi.length; i++) {
        oCirclesLi[i].className = "";
    }
    oCirclesLi[n].className = "current";
}
