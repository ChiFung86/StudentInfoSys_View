<template>
	<div class="modify_control">
    <h1>修改信息</h1><br><br>
    <hr class="dottedLine" />
        <form class="block">
        <label>登陆ID： </label>
        <input   type="text" class="textTop" disabled="disabled" id="alter_id"><br>
        <label><span class="required">*</span>姓名： </label>
        <input   type="text" maxlength="30" id="alter_name"><br>
        <label><span class="required">*</span>手机号码： </label>
         <input   type="text" maxlength="30" id="alter_tel"><br>
        <label><span class="required">*</span>修改密码：</label>
         <input   type="password" maxlength="30" id="alter_pwd1"><br>
        <label><span class="required">*</span>确认密码：</label>
         <input   type="password" maxlength="30" id="alter_pwd2"><br>
        <input type="submit" class="submit" value="完成" @click="checkAlter">
        </form>
		
	</div>
</template>
 
<script>
export default {
	props: {
		value: {
			default: ""
		}
	},
	data(){
		return{
			
		}
	},
	methods:{
		checkAlter:function(){
            var str_name = document.getElementById('alter_name').value.trim();
            var str_tel = document.getElementById('alter_tel').value.trim();
            var str_pwd1 = document.getElementById('alter_pwd1').value.trim();
            var str_pwd2 = document.getElementById('alter_pwd2').value.trim();
            var reg_pwd= /^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[a-zA-Z~!@#$%^&*]{8,30}$/;
            if(str_name.length==0){
                alert("姓名不能为空！");
            }else if(str_tel.length==0){
                alert("手机号不能为空！");
            }else if(str_pwd1.length==0){
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
                alert("修改成功");
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
.modify_control{
    background-image:url('../assets/img/hero/16.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 18px;
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
    margin-bottom: 1.5%;
}
.textTop{
    margin-top: 0px;
}
h1{
    position:absolute;
   
}
</style>