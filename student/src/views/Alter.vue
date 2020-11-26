<template>
	<div class="modify_control container">
    <span class="title">GBA学生信息管理系统</span><br><br>
    <hr >
        <form class="login-form" 
        :model="UserForm" 
        status-icon 
        ref="UserForm"
        >
        <h3>修改用户信息</h3>
        <label for="textTop">登陆ID： </label>     
        <el-input   
            placeholder=""
            v-model="UserForm.userId"
            class="textTop"
            disabled="disabled"
            value="UserForm.userId"
            ref="userId" 
            ></el-input><br>
        <label for="name"><span class="required">*</span>姓名： </label>
        <el-input 
            id="name"  
            type="text" 
            maxlength="30" 
            v-model="UserForm.userName"
            ref="userName"
            clearable></el-input><br>
        <label for="tel"><span class="required">*</span>手机号码： </label>
         <el-input
            id="tel"
            type="text" 
            maxlength="30" 
            v-model="UserForm.phoneNum"
            ref="phoneNum"
            clearable></el-input><br>
        <label for="email"><span class="required">*</span>邮箱： </label>
         <el-input
         id="email"
            type="text" 
            maxlength="30" 
            v-model="UserForm.mail"
            ref="mail"
            clearable></el-input><br>
        <label for="pwd1"><span class="required">*</span>修改密码：</label>
         <el-input
            id="pwd1"
            type="password" 
            maxlength="30" 
            v-model="UserForm.password"
            ref="password"
            clearable>
            <i id="icon1" slot="suffix" class="el-input__icon el-icon-lock" v-on:click="showPw1"></i>
            </el-input>
            <password-strength  v-model="UserForm.password" style="padding-top: 10px;"></password-strength>
            
            <br>
        <label for="pwd2"><span class="required">*</span>确认密码：</label>
         <el-input
         id="pwd2"
            type="password" 
            maxlength="30" 
            v-model="UserForm.password2"
            ref="password2"
            clearable></el-input><br>
            <router-link to="/" class="back">
              <el-button type="primary" round >返回</el-button>
            </router-link> 
         <el-button type="success submit"  round :plain="true"
         class="submit" value="完成" @click="checkAlter(UserForm)">完成</el-button>
      
        </form>
		
	</div>
</template>
 
<script>
import PasswordStrength from '@/components/PasswordStrength'
export default {
	props: {
		
    },
    components:{
    PasswordStrength
    },
	data(){
		return{
            UserForm :{
                userId:sessionStorage.getItem("userId"),
                password:"",
                password2:"",
                userName:"",
                phoneNum:"",
                mail:"",
            },
			
		}
    },
    created(){

    },
	methods:{
		checkAlter:function(UserForm){

            //    判断输入框输入的数值是否符合要求
            var str_name = this.$refs.userName.value;
            var str_tel = this.$refs.phoneNum.value;
            var str_mail = this.$refs.mail.value;
            var str_pwd1 = this.$refs.password.value;
            var str_pwd2 = this.$refs.password2.value;
            var reg_pwd= /^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,30}$/;
            var reg_mail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            var reg_tel = /^[0-9]*$/;
            if(str_name.length==0){
               this.$message({
                message: '姓名不能为空！',
                type: 'warning'
                 });
            }else if(str_tel.length==0){
                this.$message({
                message: '手机号不能为空！',
                type: 'warning'
                 });
            }else if(!reg_tel.test(str_tel)){
                this.$message({
                message: '手机号码只能输入数字！',
                type: 'warning'
                 });
            }else if(str_mail.length==0){
                this.$message({
                message: '邮箱不能为空！',
                type: 'warning'
                 });
            }else if(!reg_mail.test(str_mail)){
                this.$message({
                message: '邮箱格式有误！',
                type: 'warning'
                 });
            }else if(str_pwd1.length==0){
                this.$message({
                message: '密码不能为空！',
                type: 'warning'
                 });
            }else if(str_pwd1.length<8){
                this.$message({
                message: '密码长度至少为八位！',
                type: 'warning'
                 });
            }else if(!reg_pwd.test(str_pwd1)){
                this.$message({
                message: '密码必须包含大小写和特殊字符！',
                type: 'warning'
                 });
            } else if(str_pwd2.length==0){
                this.$message({
                message: '确认密码不能为空！',
                type: 'warning'
                 });
            }else if(str_pwd2.length<8){
                 this.$message({
                message: '密码长度至少为八位！',
                type: 'warning'
                 });
            }else if(!reg_pwd.test(str_pwd2)){
                 this.$message({
                message: '密码必须包含大小写和特殊字符！',
                type: 'warning'
                 });
            }
            else if(str_pwd1!=str_pwd2){
                 this.$message({
                message: '新密码与确认密码必须一致！',
                type: 'warning'
                 });
            }else{
                //获取session值“userId”
                this.UserForm = UserForm;  
                UserForm.userId = sessionStorage.getItem('userId');          
                this.$axios.put('http://localhost:8081/user/update',this.UserForm).then((response) => {

                // 对从后端传来的result值进行判断
              if(response.data.result == "修改成功") {
                  this.$message({
                  type:'success',
                  message:'修改完成，请重新登录'
                });
                  sessionStorage.setItem("userId", response.data.userId);
                  sessionStorage.setItem("userName", response.data.userName);
                  this.loginout();
                    this.$router.push('/');
                  
              } else if(response.data.result =="修改失败"){
                 this.$message({
                  type:'error',
                  message:'修改失败'
                });

              }else{
                  this.$message({
                  type:'error',
                  message:'密码不一致或者格式有错，请重新输入'
                });
              }
              }).catch((error) => {
                console.log(error);
                this.$router.push('/');
              });
            }
        },

        showPw1(){
      if(document.getElementById("pwd1").type=="password"){
        document.getElementById("pwd1").type="text"
        document.getElementById("pwd2").type="text"
        document.getElementById("icon1").className="el-input__icon el-icon-unlock"
      }else{
        document.getElementById("pwd1").type="password"
        document.getElementById("pwd2").type="password"
        document.getElementById("icon1").className="el-input__icon el-icon-lock"
      }
    },
    //修改用户信息后退出登录
    loginout:function(){
                sessionStorage.removeItem('result')
                sessionStorage.removeItem('userName');
                sessionStorage.removeItem('userId');
                sessionStorage.setItem("token","false");
                this.isShow=!this.isShow;
                this.display=!this.display;
            },
	}
}
</script>

<style scoped>
.container{
     background-image:url('../assets/img/hero/4.jpg');
    position:fixed;
    width: 100%;
    height: 100%;
    background-size: 80%;
   background-color: rgb(129, 143, 158);
  
}
.login-form{
  margin: 0 auto;
  width: 470px;
  height: 600px;
  background: #fff;
  box-shadow: 0 0 10px #B4BCCC;
  padding: 20px 30px 0 10px;
  border-radius: 25px; 
}
.required{
    color: red;
}
label {
        display: inline-block;
        width: 100px;
        text-align: right;
}

.dottedLine {
        height: 70px;
        border: none;
        border-top: 4px dotted #636568;
    }
.back{
    margin: 50px;
}
h1{
    position:absolute;
   
}
.el-input{
    width: 300px;
    margin: 15px;
}
.submit{
    background-color: rgb(69, 196, 80);
    color: white;
    
}
.el-icon-lock{
  cursor: pointer;  /*鼠标悬停变小手*/
}
.el-icon-unlock{
  cursor: pointer;  /*鼠标悬停变小手*/
}

password-strength{
    margin-left: 50px;
}

.title{
   position: fixed;
  left: 0;
  font-size: 40px;
  color: rgb(233, 174, 134);
  font-weight: bold;
}

</style>