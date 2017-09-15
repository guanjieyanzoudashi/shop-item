var oUsername = document.querySelector('input[name=username]');
var oPassword = document.querySelector('input[name=password]');
var oSubmit = document.querySelector('input[type=submit]');

oSubmit.onclick = function(){
    //先进行js校验用户名和密码符合规范，js校验通过
    //请求ajax进行校验用户名是否可用,当这个校验通过才能请求注册接口

    myajax.post('http://h6.duchengjiu.top/shop/api_user.php',
        {
            status: 'register',
            username: oUsername.value,
            password: oPassword.value
        }, function(err, responseText){
            var json = JSON.parse(responseText);
            if(json.message==="注册成功"){
//                    alert("注册成功");
                location.href="商城首页.html";
            }
            console.log(json);
        });
};
//    var oInput = document.querySelector('input');
var oSpan = document.querySelector('span');
oUsername.onblur = function() {
    myajax.post('http://h6.duchengjiu.top/shop/api_user.php',
        {status: 'check', username: oUsername.value},
        function(error, responseText) {
            var json = JSON.parse(responseText);
            oSpan.innerText = json.message;
            oSpan.style.display = 'block';
            if (json.code === 0) {
                oSpan.className = "right";
            } else {
                oSpan.className = "error";
            }

        });

}