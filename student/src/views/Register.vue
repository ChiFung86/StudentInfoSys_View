<template>
	<div class="register_control">
    <h1>账号注册</h1><br><br>
    <hr class="dottedLine" />
    <el-form 
      :model="RegisterForm" 
      status-icon
      ref="RegisterForm" 
      label-width="0"
      class="register-form">
      <h3>注册</h3>
      <el-form-item prop="userId">
        <el-input 
          type="text" 
          v-model="RegisterForm.userId" 
          placeholder="用户ID" ref="userId">
        </el-input>
      </el-form-item>
      <el-form-item prop="userName">
        <el-input 
          type="userName" 
          v-model="RegisterForm.userName" 
          placeholder="用户名" ref="userName">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input 
          type="password" 
          v-model="RegisterForm.password" 
          placeholder="密码" ref="password">
        </el-input>
      </el-form-item>
      <el-form-item prop="password2">
        <el-input 
          type="password" 
          v-model="RegisterForm.password2" 
          placeholder="再次输入密码" ref="password2">
        </el-input>
      </el-form-item>
      <el-form-item prop="phoneNum">
        <el-input 
          type="text" 
          v-model="RegisterForm.phoneNum" 
          placeholder="电话号码" ref="phoneNum">
        </el-input>
      </el-form-item>
      <el-form-item prop="mail" >
        <el-input 
          type="text" 
          v-model="RegisterForm.mail" 
          placeholder="邮箱" ref="mail">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="danger" 
          class="submitBtn"
          round
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

export default {
	props: {
		
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
		register:function(RegisterForm){
            var str_id = this.$refs.userId.value;
            var str_name = this.$refs.userName.value;
            var str_tel = this.$refs.phoneNum.value;
            var str_email = this.$refs.mail.value;
            var reg_pwd= /^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[a-zA-Z~!@#$%^&*]{8,30}$/;
            var str_pwd1 = this.$refs.password.value;
            var str_pwd2 = this.$refs.password2.value;
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
                this.RegisterForm = RegisterForm;            
                this.$axios.post('http://localhost:8081/user/register',this.RegisterForm).then((response) => {
                
              if(response.data.result == "注册成功") {
                  alert(response.data.result);
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

        register2:function(RegisterForm){
            this.RegisterForm = RegisterForm;            
            this.$axios.post('http://localhost:8081/user/register',this.RegisterForm).then((response) => {
                
              if(response.data.result == "注册成功") {
                  alert(response.data.result);
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
    background-color: gold;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    
    height: 100%;
    width: 100%;
    position: fixed;
}
.register-form {
  margin: 0 auto;
  width: 380px;
  background: #fff;
  box-shadow: 0 0 10px #B4BCCC;
  padding: 20px 30px 0 30px;
  border-radius: 25px; 
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