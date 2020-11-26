<template>
	<div class="register_control container">
    
    <el-form 
      :model="RegisterForm" 
      status-icon
      ref="RegisterForm" 
      label-width="0"
      class="register-form">
      <h2>GBA学生信息管理系统</h2>
      <h3>注册</h3>
      <el-form-item prop="userId">
        <el-input 
        prefix-icon="el-icon-aliid"
          type="text" 
          v-model="RegisterForm.userId" 
          placeholder="用户ID" maxlength="30" ref="userId" clearable>
        </el-input>
      </el-form-item>
      <el-form-item prop="userName">
        <el-input 
        prefix-icon="el-icon-alitubiao211"
          type="userName" 
          v-model="RegisterForm.userName" 
          placeholder="用户名" maxlength="20" ref="userName" clearable>
        </el-input>
      </el-form-item>
     
      <el-form-item prop="phoneNum">
        <el-input 
        prefix-icon="el-icon-ali3"
          type="text" 
          v-model="RegisterForm.phoneNum" 
          placeholder="电话号码"  ref="phoneNum" maxlength="11" clearable>
        </el-input>
      </el-form-item>
      <el-form-item prop="mail" >
        <el-input 
        prefix-icon="el-icon-aliyouxiang"
          type="text" 
          v-model="RegisterForm.mail" 
          placeholder="邮箱" ref="mail" maxlength="30" clearable>
        </el-input>
      </el-form-item>
       <el-form-item prop="password">
        <el-input
        id="pw1" 
        prefix-icon="el-icon-alimima"
          type="password" 
          v-model="RegisterForm.password" 
          placeholder="密码" maxlength="30" ref="password" clearable>
          <i id="icon1" slot="suffix" class="el-icon-lock" v-on:click="showPw"></i>
        </el-input>
         <password-strength  v-model="RegisterForm.password" style="padding-top: 10px;"></password-strength>
      </el-form-item>
      <el-form-item prop="password2">
        <el-input 
        id="pw2"
        prefix-icon="el-icon-alimima"
          type="password" 
          v-model="RegisterForm.password2" 
          placeholder="再次输入密码" maxlength="30" ref="password2" clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="danger" 
          class="submitBtn"
          round
          :plain="true"
          @click="register(RegisterForm)">
          注册
        </el-button>
        <hr>
        <!-- <p>已有账号，马上去&nbsp;<span class="to" @click="login">登陆</span></p> -->
      </el-form-item>
    </el-form>
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
            RegisterForm :{
                userId:"",
                password:"",
                password2:"",
                userName:"",
                phoneNum:"",
                mail:"",
            },
            list:[]
		}
	},
	methods:{
     showPw(){
      if(document.getElementById("pw1").type=="password"){
        document.getElementById("pw1").type="text"
        document.getElementById("pw2").type="text"
        document.getElementById("icon1").className="el-icon-unlock"
      }else{
        document.getElementById("pw1").type="password"
        document.getElementById("pw2").type="password"
        document.getElementById("icon1").className="el-icon-lock"
      }
},
		register:function(RegisterForm){
            var str_id = this.$refs.userId.value;
            var str_name = this.$refs.userName.value;
            var str_tel = this.$refs.phoneNum.value;
            var str_email = this.$refs.mail.value;
            var reg_pwd=/^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,30}$/;
            var str_pwd1 = this.$refs.password.value;
            var str_pwd2 = this.$refs.password2.value;
            var reg_tel = /^[0-9]*$/;
            var reg_email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if(str_id.length==0){
                this.$message({
                message: 'id不能为空！',
                type: 'warning'
                 });
            }else if(str_name.length==0){
              this.$message({
                message: '用户名不能为空！',
                type: 'warning'
                 });
            }else if(str_tel.length==0){
              this.$message({
                message: '手机号不能为空！',
                type: 'warning'
                 });
            }else if (!reg_tel.test(str_tel)) {
              this.$message({
                        type:'warning',
                        message:'手机号码只能输入数字！'
                      });   
            }else if(str_email.length==0){
                this.$message({
                message: '邮箱不能为空！',
                type: 'warning'
                 });
            }else if(!reg_email.test(str_email)){
                this.$message({
                message: '邮箱格式有误！',
                type: 'warning'
                 });
            }
            else if(str_pwd1.length==0){
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
                message: '确认密码长度至少为八位！！',
                type: 'warning'
                 });
            }else if(!reg_pwd.test(str_pwd2)){
                this.$message({
                message: '确认密码必须包含大小写和特殊字符！',
                type: 'warning'
                 });  
            }
            else if(str_pwd1!=str_pwd2){
              this.$message({
                message: '密码必须包含新密码与确认密码必须一致！',
                type: 'warning'
                 }); 
            }else{
                this.RegisterForm = RegisterForm;            
                this.$axios.post('http://localhost:8081/user/register',this.RegisterForm).then((response) => {
                
              if(response.data.result == "注册成功") {
                 this.$message({
                  type:'success',
                  message:response.data.result
                });
                  
                    this.$router.push('/login');
                  
              } else if(response.data.result =="该用户名已存在"){
                 this.$message({
                  type:'error',
                  message:'该用户名已存在，请重新输入'
                });

              }else if(response.data.result =="用户名和密码不能为空"){
                 this.$message({
                  type:'error',
                  message:'用户ID和密码不能为空，请重新输入'
                });

              }else{
                  this.$message({
                  type:'error',
                  message:'密码不一致或者格式有错，请重新输入'
                });
              }
              }).catch((error) => {
                console.log(error);
              });
            }
            
        },

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
.to {
  color: #67C23A;
  cursor: pointer;
}

.register_control{
  background-image:url('../assets/img/hero/4.jpg');
      background-size: 70%;

    height: 100%;
    width: 100%;
    position: fixed;
}
.register-form {
  margin: 0 auto;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 10px #B4BCCC;
  padding: 20px 30px 0 30px;
  border-radius: 25px; 
  margin-top: 3%;
}
.dottedLine {
        height: 70px;
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
.el-icon-lock{
  cursor: pointer;  /*鼠标悬停变小手*/
}
.el-icon-unlock{
  cursor: pointer;  /*鼠标悬停变小手*/
}
hr{
 width:100%;
 height:1px;
 background-color:#fff;
}
.title{
  position: fixed;
  left: 0;
  font-size: 40px;
  color: rgb(233, 174, 134);
  font-weight: bold;
}

</style>