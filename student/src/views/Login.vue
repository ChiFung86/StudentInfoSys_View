<template>
	<div class="land_control">
    <h1>账号登陆</h1><br><br>
    <hr class="dottedLine" />
        <form class="block">
        <label for="username" ><span class="required">*</span>登陆ID： </label>
        <input   type="text" class="textTop" id="login_id" maxlength="30"><br>
        <label for="username" ><span class="required">*</span>输入密码：</label>
         <input  type="password" id="login_pwd" maxlength="30"><br>
        <input type="submit" class="submit" value="登陆" @click="checkLog">
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
		checkLog:function(){
            var str_id = document.getElementById('login_id').value.trim(); 
            var reg_id = /^\d{1,30}$/;
            var str_pwd = document.getElementById('login_pwd').value.trim(); 
            var reg_pwd = /^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[a-zA-Z~!@#$%^&*]{8,30}$/;
            if(str_id.length==0){
                alert("用户名不能为空！");
            }else if(!reg_id.test(str_id)){
                alert("用户名格式不正确！");
            }
            else if(str_pwd.length==0){
                alert("密码不能为空！");
            }else if(str_pwd.length<8 || str_pwd.length>30){
                alert("密码长度至少为八位！");
            }else if(!reg_pwd.test(str_pwd)){
                alert("密码必须包含大小写和特殊字符！");   
            }else{
                this.$router.push({
                  path: '/',
                  params:{
                      

                  }
                });}
                 
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
.land_control{
    background-image:url('../assets/img/hero/14.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 18px;
    height: 800px;
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
    margin-bottom: 10%;
    font-size: 100%;
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