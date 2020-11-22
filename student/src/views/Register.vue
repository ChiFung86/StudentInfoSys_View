<template>
	<div class="logon_control">
    <h1>账号注册</h1><br><br>
    <hr class="dottedLine" />
        <form class="block">
        <label for="username"><span class="required">*</span>登陆ID： </label>
        <input   type="text" class="textTop" maxlength="30" id="register_id"><br>
        <label for="username"><span class="required">*</span>姓名： </label>
        <input  type="text" maxlength="20" id="register_name"><br>
        <label for="username"><span class="required">*</span>手机号码： </label>
        <input  type="text" maxlength="11" id="register_tel"><br>
        <label for="username"><span class="required">*</span>邮箱： </label>
        <input   type="text" maxlength="30" id="register_email"><br>
        <label for="username"><span class="required">*</span>输入密码：</label>
        <input  type="password" maxlength="30"  id="pwd1"><br>
        <label for="username"><span class="required">*</span>确认密码：</label>
        <input   type="password" maxlength="30"  id="pwd2"><br>
        <input type="submit" class="submit" value="注册" @click="checkReg">
        </form>
	</div>
</template>
 
 
<script>

export default {
	props: {
		
	},
	data(){
		return{
			
		}
	},
	methods:{
		checkReg:function(){
            var str_id = document.getElementById('register_id').value.trim(); 
            var str_name = document.getElementById('register_name').value.trim();
            var str_tel = document.getElementById('register_tel').value.trim();
            var str_email = document.getElementById('register_email').value.trim();
            var reg_pwd= /^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[a-zA-Z~!@#$%^&*]{8,30}$/;
            var str_pwd1 = document.getElementById('pwd1').value.trim();
            var str_pwd2 = document.getElementById('pwd2').value.trim();
            if(str_id.length==0){
                alert("id不能为空！");
            }else if(str_name.length==0){
                alert("用户名不能为空！");
            }else if(str_tel.length==0){
                alert("手机号不能为空！");
            }else if(str_email.length==0){
                alert("邮箱不能为空！");
            }
            else if(str_pwd1.length==0){
                alert("密码不能为空！");
            }else if(str_pwd1.length<8){
                alert("密码长度至少为八位！");
            }else if(!reg_pwd.test(str_pwd1)){
                alert("密码必须包含大小写和特殊字符！"); 
            } else if(str_pwd2.length==0){
                alert("确认密码不能为空！");
            }else if(str_pwd2.length<8){
                alert("确认密码长度至少为八位！");
            }else if(!reg_pwd.test(str_pwd2)){
                alert("确认密码必须包含大小写和特殊字符！"); 
            }
            else if(str_pwd1!=str_pwd2){
                alert("新密码与确认密码必须一致！"); 
            }else{
                this.$router.push('/');
            }
        }
	}
}
</script>

<style scoped>
.required{
    color: red;
}
label {
        display: inline-block;
        width: 100px;
        text-align: right;
}
.logon_control{
    background-color: gold;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    
    height: 100%;
    width: 100%;
    position: fixed;
}
.dottedLine {
        height: 150px;
        border: none;
        border-top: 4px dotted #636568;
    }
.submit{
    height: 50px;
    width: 150px;
    color:white;
    background-color: blue;
    border-radius: 15%;
    margin-left: 5%;
}
input{
    line-height: 30px;
    margin-top: 30px;
    width: 300px;
}
.textTop{
    margin-top: 0px;
}
h1{
    position:absolute;
   
}




</style>