<template>
    <div class="flower-container container">
        <div class="list-part"  >

    <h1 align="center">{{title}}</h1>
        <div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">目录</el-menu-item>
            <el-menu-item index="2">
              <router-link to="/register" class="">用户注册</router-link>
            </el-menu-item>
            <el-menu-item index="3">
               <router-link to="/alter" class="">修改用户信息</router-link>
            </el-menu-item>
            <el-menu-item index="4">
               <router-link to="/add" class="">新增学生信息</router-link>
            </el-menu-item>
            <el-menu-item index="5">
               <router-link to="/total" class="">学生信息统计</router-link>
            </el-menu-item>
            <el-menu-item index="6">
               <router-link to="/query" class="">学生信息查询</router-link>
            </el-menu-item>
            <div class="el-btn">
            <el-button size="small" round><router-link to="/login" class="">登录</router-link></el-button>
            <el-button size="small" round v-show="!isShow"><router-link to="/register" class="" >注册</router-link></el-button>
            <p v-text="welcome" v-show="isShow"></p>
            </div>
            </el-menu>
            
        </div>
            <img src="./wyu.jpg" alt="" class="body">         
        </div>    
        

    </div>
</template>

<script>

export default {
    props:["title"],
    data(){
        return {
            isShow:false,
            activeIndex: '1',
            activeIndex2: '1',
            welcome:"Welcome!",
            }
    },

        created() {
            },
        methods: {
           handleSelect(key, keyPath) {
                console.log(key, keyPath);
      }
           
    },
    }

</script>

<style scoped>
.container{  
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgb(26, 50, 95);
    background-size: 100%;
}
.el-menu-demo{
    width: 100%;
}
.el-btn{
    float: right;
    margin-top: 15px;
    
}
    


</style>

<style>

</style>