function getQueString(name){
    var search=location.search.substr(1);
    var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var result=search.match(reg);
    if(result===null)return null;
    return decodeURIComponent(result[2]);
}
var cat_id=getQueString('cat_id');
var oUl = document.querySelector('.oul');
var oA=document.querySelector("a[name=cart]");
myajax.get('http://h6.duchengjiu.top/shop/api_cat.php', {}, function(error, responseText){
    var json = JSON.parse(responseText);
    var data = json.data;
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        oUl.innerHTML += `<li><a href="商城首页.html?cat_id=${obj.cat_id}">${ obj.cat_name}</a></li>`;
    }
//        document.querySelector(".top").innerHTML+=`<div class="login"><a href="login.html" name="register">登陆</a><a href="register.html" name="login">注册</a></div>`
    if(localStorage.username){
        var oUsername=document.querySelector("a[name=register]");
        var oLogin=document.querySelector("a[name=login]");
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
var oTable = document.querySelector('table');
var oSum = document.querySelector('#sum');
var oBuy=document.querySelector(".dog");

//    var goodsNumber=document.querySelector('input[name=number]')
myajax.get('http://h6.duchengjiu.top/shop/api_cart.php', {token: localStorage.token}, function(err, responseText){
    var json = JSON.parse(responseText);

    console.log(json);
    var data = json.data;
    oBuy.onclick=function(){
        if(json.message==="购物车数据为空"){
            alert('您还没有添加商品')
        }
        else{
            oBuy.href="checkout.html"
        }
    }
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        console.log(obj)
        //一件商品的总价
        sum+= obj.goods_price * obj.goods_number;
        oTable.innerHTML += `
                          <tr>
                            <td name="goods_id">${obj.goods_id}</td>
                            <td><img src="${obj.goods_thumb}" ></td>
                            <td>${obj.goods_name}</td>
                            <td><input data-id="${obj.goods_id}" type="number"  name="number" value="${obj.goods_number}"min="1" max="10" /></td>
                            <td>${obj.goods_price}</td>
                            <td name="sum">${obj.goods_price*obj.goods_number}</td>
                            <td><input data-id="${obj.goods_id}" type="button" name="delete" value="删除" class="var"></td>
                          </tr>
                          `;
    }
    getSum();
});

oTable.onchange = function(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.name === 'number') {
        console.log(target.value, target.dataset.id);
        var goods_id = target.dataset.id;
        var number = target.value;
        myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
            {goods_id, number},
            function(err, responseText) {
                var json = JSON.parse(responseText);
                console.log(json);
                if (json.code === 0) {
                    // alert('更新购物车成功');
                    //修改总价和小计
                    var goods_price = parseInt(target.parentNode.nextElementSibling.innerText);
                    target.parentNode.nextElementSibling.nextElementSibling.innerText = parseInt((target.value) * goods_price);
                    getSum();
                }
            })
    }
}
oTable.addEventListener('click', function(event){
    event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.name === 'delete') {
        confirm('确认要删除吗？', function(){//当你选择的是取消则不执行任何事情
            var goods_id = target.dataset.id;
            var number = 0;
            myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
                {goods_id, number},
                (err, responseText)  => {
                var json = JSON.parse(responseText);
            console.log(json);
            if (json.code === 0) {
// alert('更新购物车成功');
//删除整个TR
                var tr = target.parentNode.parentNode;
                tr.parentNode.removeChild(tr);
                location.reload()
//显示总价
                getSum();
            }
        })
        }, function(){
            console.log('取消删除');
        });
        //得到商品ID

    }
});

var oClearCart = document.querySelector('#clear-cart');
oClearCart.onclick = function(){
    confirm('确认要删除吗？', function(){
        console.log('删除成功');
        var oGoodsIds = document.querySelectorAll('td[name=goods_id]');
        for (var i = 0; i < oGoodsIds.length; i++) {
            var td = oGoodsIds[i];
            var goods_id = parseInt(td.innerText);
            var number = 0;
            (function(td){
                myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
                    {goods_id, number},
                    (err, responseText) => {
                    var json = JSON.parse(responseText);
                console.log(json);
                if (json.code === 0) {
                    // alert('更新购物车成功');
                    //删除整个TR
                    var tr = td.parentNode;
                    tr.parentNode.removeChild(tr);

                    //显示总价
                    getSum();
                    location.reload()
                }
            });
            })(td);


        }
    }, function(){
        console.log('取消删除');
    });

}
//得到所有的商品ID


//显示出总价
function getSum() {
    var oSums = document.querySelectorAll('td[name=sum]');
    var sum = 0;
    for (var i = 0; i < oSums.length; i++) {
        sum += parseInt(oSums[i].innerText);
    }
    localStorage.sum = sum;
    console.log( localStorage);
    oSum.innerText = "￥" + sum;
}
var oApp=document.querySelector(".app");
var code=document.querySelector(".codeImg");
oApp.onmouseover=function(){
    code.style.display='block';
}
oApp.onmouseout=function(){
    code.style.display='none'
}