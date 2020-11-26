<template>
	<div class="land_control">
    <br><br>
   
        <el-form 
      :model="LoginForm" 
      status-icon
      ref="LoginForm" 
      label-width="0"
      class="login-form">
      <h2>GBA学生信息管理系统</h2>
      <h3>登录</h3>
      <el-form-item prop="userId">
        <el-input 
          type="text" 
          v-model="LoginForm.userId" 
          placeholder="用户名" 
          ref="userId"
          maxlength="30">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input 
          id="pw1"
          type="password" 
          v-model="LoginForm.password" 
          placeholder="密码" 
          ref="password"
          maxlength="30">
          <i id="icon1" slot="suffix" class="el-input__icon el-icon-lock" v-on:click="showPw1"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="danger" 
          class="submitBtn"
          round
          @click="login(LoginForm)">
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
		login:function(LoginForm){
            var str_id = this.$refs.userId.value;
            var str_pwd = this.$refs.password.value;
            if(str_id.length==0){
                this.$message({
                message: '用户名不能为空！',
                type: 'warning'
                 });
            }else if(str_pwd==30){
              this.$message({
                message: '密码不能为空！',
                type: 'warning'
                 });
            }else{
                this.LoginForm = LoginForm;            
                 this.$axios.post('http://localhost:8081/user/login',this.LoginForm).then((response) => {
                
                if(response.data.result == "登陆成功") {
                    this.$message({
                      message: response.data.result,
                      type: 'success'
                      });
                    sessionStorage.setItem("result", response.data.result);
                    sessionStorage.setItem("userId", response.data.userId);
                    sessionStorage.setItem("userName", response.data.userName);
                        this.$router.push('/');
                    
                } else if(response.data.result =="用户ID不存在"){
                    this.$message({
                    type:'error',
                    message:'用户ID或密码输入错误，请重新输入'
                    });

                }else if(response.data.result =="用户ID或密码为空"){
                    this.$message({
                    type:'error',
                    message:'用户ID或密码输入错误，请重新输入'
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
          showPw1(){
      if(document.getElementById("pw1").type=="password"){
        document.getElementById("pw1").type="text"
        document.getElementById("icon1").className="el-input__icon el-icon-unlock"
      }else{
        document.getElementById("pw1").type="password"
        document.getElementById("icon1").className="el-input__icon el-icon-lock"
      }
}      
    }
}

</script>

<style scoped>
.land_control{
    background-image:url('../assets/img/hero/4.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 18px;
    height: 800px;
}
.login-form {
  margin: 0 auto;
  width: 400px;
  height: 450px;
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
.el-icon-lock{
  cursor: pointer;  /*鼠标悬停变小手*/
}
.el-icon-unlock{
  cursor: pointer;  /*鼠标悬停变小手*/
}
h3{
  margin-bottom: 30px;
}
</style>