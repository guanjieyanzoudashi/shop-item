function getQueString(name){
    var search=location.search.substr(1);
    var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var result=search.match(reg);
    if(result===null)return null;
    return decodeURIComponent(result[2]);

}
var cat_id=getQueString('cat_id');
var oUl = document.querySelector('.oul');
var oUl2=document.querySelector(".oul2");
var oA=document.querySelector("a[name=cart]");
var oLogin=document.querySelector("a[name=login]");
var oUsername=document.querySelector("a[name=register]");
myajax.get('http://h6.duchengjiu.top/shop/api_cat.php', {}, function(error, responseText) {
    var json = JSON.parse(responseText);
    var data = json.data;

    for (var i = 0; i < data.length; i++) {
        var obj = data[i];

        oUl.innerHTML += `<li><a href="商城首页.html?cat_id=${obj.cat_id}">${ obj.cat_name}</a></li>`;
        if(localStorage.username){
            oA.href="cart.html";
            oUsername.innerHTML="你好" + localStorage.username;
            oLogin.innerHTML="退出";
            oLogin.onclick=function(){
                localStorage.username="";
                oLogin.href="商城首页.html"
            };
            if( oUsername.innerHTML===("你好" + localStorage.username)){
                oUsername.href="商城首页.html"
            }
        }
        else if(!localStorage.username){
            oA.onclick=function(){
                alert("请先登录");
            }
        }
    }
});
var oSearch=document.querySelector(".search");
var search_text = getQueryString('search_text');
var butt=document.querySelector(".butt");
var oContent=document.querySelector(".content");
myajax.get('http://h6.duchengjiu.top/shop/api_goods.php', {search_text: search_text}, function(err,responseText){
    var json = JSON.parse(responseText);
    console.log(json);
    var data = json.data;
    if (data.length === 0) {
        oContent.innerHTML =` <div style="background-image:url('img/404.jpg');height: 405px;width:900px;background-repeat: no-repeat;margin: 0 auto;position: relative"><ul class="return"><li>未搜索到商品,</li><li id="second">5</li><li>秒后跳回首页</li></ul></div>`;
        oContent.style.backgroundColor="#AFDBF4";
        var oSecond = oContent.querySelector('#second');
        var timer = setInterval(() => {
            var second = parseInt(oSecond.innerText);
        oSecond.innerText = --second;
    }, 1000);
        setTimeout(() => {
            clearInterval(timer);
        location.href = '商城首页.html';
    }, 5000);
        return;
    }
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        oUl2.innerHTML += `<li class="goods">
          <a href="goods.html?goods_id=${obj.goods_id}"><img src="${obj.goods_thumb}" /></a>
          <span>${obj.goods_name}</span>
          <p>￥:${obj.price}</p>
        </li>`;
    }
    oSearch.onkeyup = function(event) {
        if (event.keyCode === 13) {
            location.href = 'search.html?search_text=' + this.value;
        }
        var self=this;
        butt.onclick= function(event) {
            location.href = 'search.html?search_text=' +  self.value;
        }
    }
});
var oApp=document.querySelector(".app");
var code=document.querySelector(".codeImg");
oApp.onmouseover=function(){
    code.style.display='block';
}
oApp.onmouseout=function(){
    code.style.display='none'
}