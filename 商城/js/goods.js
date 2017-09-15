function getQueString(name){
    var search=location.search.substr(1);
    var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var result=search.match(reg);
    if(result===null)return null;
    return decodeURIComponent(result[2]);

}
var oUl = document.querySelector('.oul');
var oA=document.querySelector("a[name=cart]");
var oLogin=document.querySelector("a[name=login]");
var oUsername=document.querySelector("a[name=register]");

myajax.get('http://h6.duchengjiu.top/shop/api_cat.php', {}, function(error, responseText){
    var json = JSON.parse(responseText);
    var data = json.data;
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        oUl.innerHTML += `<li><a href="商城首页.html?cat_id=${obj.cat_id}">${ obj.cat_name}</a></li>`;
    }
//        document.querySelector(".top").innerHTML+=`<div class="login"><a href="login.html" name="register">登陆</a><a href="register.html" name="login">注册</a></div>`
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
});
var goods_id = getQueryString('goods_id');
var oUl2=document.querySelector(".oul2");
var oText=document.querySelector(".text");
console.log(goods_id);
var oProduct=document.querySelector(".product");
myajax.get('http://h6.duchengjiu.top/shop/api_goods.php', {
    // goods_id: goods_id ES5
    goods_id //ES6
}, function(err, responseText){
    var json = JSON.parse(responseText);
    var obj = json.data[0];
    console.log(json);
    oProduct.innerHTML = `
        <div style="background-color: white;width: 1100px;margin-top: 60px;position: absolute">
        <div id="smallPic" class="smallPic">
      <img src="${obj.goods_thumb}" alt="" class="smallImage">
      <div id="zoom" class="zoom"></div>
        </div>
            <div class="goods-message">
          <h1 class="goods-message-title">${obj.goods_name}</h1>
          <p style="margin-top: 20px">${obj.goods_desc}</p>
            <div style="height: 160px;width:300px;background-color:#F6F6F6;margin: 0 auto">
            <div style="width: 187px;height: 43px;margin: 0 auto;">
          <div class="goods-message-price-title">一 淘 价:</div><strong class="price"> ￥${obj.price}</strong>
           </div>
           <div style="width: 200px;height:70px;margin: 0 auto;margin-top: 40px">
           <input type="text" class="text-input" value="1" name="goods-number">
           <div style="height: 36px;width: 17px;float: left">
           <button style="float: left;height: 18px;width: 17px" name="add">+</button>
           <button style="float: left;height: 18px;width: 17px" name="subtract">-</button>
           </div>
           <input type="button" id="add-to-cart" name="add-to-cart">
           </div>

          </div>
          </div>
        </div>
    <div id="bigPic" class="bigPic"></div>
      `;
    var oAdd=document.querySelector("button[name=add]");
    var oSubtract=document.querySelector("button[name=subtract]");
    var oNumber=document.querySelector("input[name=goods-number]");
    var oAddCard=document.querySelector("input[name=add-to-cart]");

    oAdd.onclick=function(){

        oNumber.value++;
        if( oNumber.value>=10){
            oNumber.value=10
        }
    }
    oSubtract.onclick=function () {
        oNumber.value--;
        if(oNumber.value<=1){
            oNumber.value=1
        }
    }
    zoom(obj.goods_thumb);

    oAddCard.onclick=function(){
        myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
            {goods_id, number: oNumber.value},
            function(err, responseText) {
                var json = JSON.parse(responseText);
                console.log(json);
                if (json.code === 0) {
                    alert('添加到购物车成功');
                    location.href="商城首页.html"
                } if (json.code !== 0) {
                    alert('已经添加到购物车');
                    location.href="商城首页.html"
                }

            })
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