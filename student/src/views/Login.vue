<template>
	<div class="land_control">
    <br><br>
    <hr class="dottedLine" />
        <el-form 
      :model="LoginForm" 
      status-icon
      ref="LoginForm" 
      label-width="0"
      class="login-form">
      <h3>登录</h3>
      <el-form-item prop="userId">
        <el-input 
          type="text" 
          v-model="LoginForm.userId" 
          placeholder="用户名" ref="userId">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input 
          type="password" 
          v-model="LoginForm.password" 
          placeholder="密码" ref="password">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="danger" 
          class="submitBtn"
          round
          @click="checkLog(LoginForm)">
          登录
        </el-button>
        <hr>
        <p>还没有账号，马上去&nbsp;<span class="to" @click="register">注册</span></p>
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
            LoginForm: {
                userId: '',
                password: '',     
            },
		}
	},
	methods:{
        register () {
        this.$router.push('/Register');
    },
		checkLog:function(LoginForm){
            var str_id = this.$refs.userId.value;
            var reg_id = /^\d{1,30}$/;
            var str_pwd = this.$refs.password.value;
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
                this.LoginForm = LoginForm;            
                 this.$axios.post('http://localhost:8081/user/login',this.LoginForm).then((response) => {
                
                if(response.data.result == "登陆成功") {
                    alert(response.data.result);
                    sessionStorage.setItem("userId", response.data.result);
                        this.$router.push('/');
                    
                } else if(response.data.result =="用户ID不存在"){
                    this.$message({
                    type:'error',
                    message:'用户ID不存在，请重新输入'
                    });

                }else if(response.data.result =="用户ID或密码为空"){
                    this.$message({
                    type:'error',
                    message:'用户ID或密码为空，请重新输入'
                    });

                }else{
                    this.$message({
                    type:'error',
                    message:'用户ID或密码输入错误，请重新输入'
                    });
                }
                }).catch((error) => {
                console.log(error);
                });
            }
                 
            },
        login:function(LoginForm){
            this.LoginForm = LoginForm;            
            this.$axios.post('http://localhost:8081/user/login',this.LoginForm).then((response) => {
                
              if(response.data.result == "登陆成功") {
                  alert(response.data.result);
                  sessionStorage.setItem("userId", response.data.result);
                    this.$router.push('/');
                  
              } else if(response.data.result =="用户ID不存在"){
                 this.$message({
                  type:'error',
                  message:'用户ID不存在，请重新输入'
                });

              }else if(response.data.result =="用户ID或密码为空"){
                 this.$message({
                  type:'error',
                  message:'用户ID或密码为空，请重新输入'
                });

              }else{
                  this.$message({
                  type:'error',
                  message:'用户ID或密码输入错误，请重新输入'
                });
              }
            }).catch((error) => {
              console.log(error);
            });
        },
    }
}

</script>

<style scoped>
.land_control{
    background-image:url('../assets/img/hero/14.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 18px;
    height: 800px;
}
.login-form {
  margin: 0 auto;
  width: 380px;
  background: #fff;
  box-shadow: 0 0 10px #B4BCCC;
  padding: 20px 30px 0 30px;
  border-radius: 25px; 
}
.submitBtn {
  width: 65%;
}
.resetBtn {
  width: 30%;
}
.to {
  color: #67C23A;
  cursor: pointer;
}
.validate-code {
  width: 244px;
  margin-right: 20px;
  float: left;
}
.ms-login {
  margin-top: 10%;
}
.code {
  height: 40px;
}
h3 {
  text-align: center;
}
</style>