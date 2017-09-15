var oUsername = document.querySelector('input[name=loginUserName]');
var oPassword = document.querySelector('input[name=loginPassword]');
var oBtn = document.querySelector('.J_Submit');
var oError=document.querySelector(".login-error");
var oB=document.querySelector("b");
oBtn.onclick = function() {
    //js校验
    //直接调用登录的接口
    myajax.post('http://h6.duchengjiu.top/shop/api_user.php',
        {
            status: 'login',
            username: oUsername.value,
            password: oPassword.value
        }, function(error, responseText){
            var json = JSON.parse(responseText);
            if(json.message==="登录成功"){
                oError.style.display="none";
                localStorage.token = json.data.token;
                localStorage.username = json.data.username;
                alert('登陆成功');
                location.href="商城首页.html";
            }
            else if(json.message==="用户名不存在"){
                oError.innerText="用户名不存在，请重新输入";
                oError.style.display="block";
                var oB=document.createElement("b");
                oError.appendChild(oB);
            }
            else if(json.message==="密码错误"){
                oError.innerText="密码错误，请重新输入";
                oError.style.display="block";
                var oB=document.createElement("b");
                oError.appendChild(oB);
            }
            else if(json.message==="密码最小长度为6位"){
                oError.innerText+="密码最小长度为6位，请重新输入";
                oError.style.display="block";
                var oB=document.createElement("b");
                oError.appendChild(oB);
            }
            else if(json.message==="用户名不合法，请填写3-20位的英文数字下划线"){
                oError.innerText="用户名不合法，请填写3-20位的英文数字下划线";
                oError.style.display="block";
                var oB=document.createElement("b");
                oError.appendChild(oB);
            }
            console.log(json);
            console.log(localStorage.token);
            console.log(localStorage.username);
        });
}