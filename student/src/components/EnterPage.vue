<template>
    <div class=" container">
        <div class="list-part"  >

    <h1 align="center">{{title}}</h1>
    <div class="time">时间：{{date}}</div>
        <div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
             
          <router-link to="/register" class=""><el-menu-item index="2">用户注册<el-divider direction="vertical"></el-divider> </el-menu-item></router-link>          
          <router-link to="/alter" class=""><el-menu-item index="3">修改用户信息<el-divider direction="vertical"></el-divider> </el-menu-item></router-link>
          <router-link to="/add" class=""><el-menu-item index="4">新增学生信息<el-divider direction="vertical"></el-divider> </el-menu-item></router-link>
          <router-link to="/total" class=""> <el-menu-item index="5">学生信息统计<el-divider direction="vertical"></el-divider> </el-menu-item></router-link>
          <router-link to="/query" class=""><el-menu-item index="6">学生信息查询</el-menu-item></router-link>
          <el-menu-item >
          <el-upload
                    ref="upload"
                    :action="importUrl"
                    accept=".xls,.xlsx"
                    :auto-upload="autoUp"
                    :on-success="handleSuccess"
                    :show-file-list= false
                    class="upload"
                    >   
                    <el-button size="small" type="success" @click="uploadFile" v-show="!isShow" >导入学生信息</el-button >                   
                 </el-upload>
          </el-menu-item>
          <el-menu-item ><el-button size="small" type="success" @click="exportFile" class="output" v-show="!isShow">导出学生信息</el-button > 
</el-menu-item>
            <div class="el-btn">
            <router-link to="/login" class="">
            <el-button size="small" round v-show="isShow" >登录</el-button>
            </router-link>
            <div v-show="!isShow"  class="welcome">Welcome! {{userName()}}</div>
            <router-link to="/register" class="" >
            <el-button size="small" round v-show="isShow">注册</el-button>
            </router-link>
            <el-button size="small" round v-show="!isShow" @click="loginout">退出</el-button>
            </div>
            </el-menu>
       
        </div >
         <!-- 未登录--> 
        <!--走马灯-->
        <div v-show="!display">
        <el-carousel :interval="4000" type="" height="1000px" width="800px" indicator-position="outside"> 
        <el-carousel-item v-for="item in imagesBox" :key="item.id">
            <img :src="item.idView" class="image">
        </el-carousel-item>
        </el-carousel>
        </div>

         <!-- 已登录-->       
        <div v-show="display">
        <hr>
        <div>
            <el-table :data="tableData" :key="currentPage" style="width: 100%"  @sort-change="sort">
                <el-table-column prop="id" label="序号" width="150" sortable="custom">
                </el-table-column>
                <el-table-column prop="studentNumber" label="学号" width="150" >
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                 <el-table-column prop="birth" label="出生日期" width="150">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="150">
                </el-table-column>
                <el-table-column prop="phoneNumber" label="手机号码">
                </el-table-column>
                 <el-table-column prop="className" label="班级" width="150">
                </el-table-column>
                <el-table-column prop="department" label="系部" width="150">
                </el-table-column>
                 <el-table-column prop="photo" label="头像" width="150" v-if="false">
                </el-table-column>
                <el-table-column prop="action" label="操作">
                    <template slot-scope="scope">
                        <div>
                            <el-button @click="update(scope.row)" type="primary" icon="el-icon-edit"></el-button>
                            <el-button @click="deleteStudent(scope.row.studentNumber)" type="primary" icon="el-icon-delete"></el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <div class="block" style="margin-top:15px;">
                <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                 :current-page="currentPage" :page-sizes="[1,5,10,20]" :page-size="pageSize" 
                layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>

            <!--    <el-upload
                    ref="upload"
                    :action="importUrl"
                    accept=".xls,.xlsx"
                    :auto-upload="autoUp"
                    :on-success="handleSuccess"
                    class="upload"
                    >   
                    <el-button size="small" type="success" @click="uploadFile" >导入学生信息</el-button >                   
                 </el-upload>
                  <el-button size="small" type="success" @click="exportFile" class="output">导出学生信息</el-button > -->
            </div>
            
        </div>
        </div>
        </div>    
        

    </div>
</template>

<script>
import axios from "axios"
export default {
    props:["title"],
    data(){
        return {
            importUrl:"http://localhost:8081/test/ImportByUpload",
            autoUp:true,
            date: new Date(),
            display:false,
            isShow:true,
            activeIndex: '1',
            activeIndex2: '1',
            welcome:"Welcome!",
            tableData:[],
            currentPage: 1, // 当前页码
            total: 0, // 总条数
            pageSize: 10, // 每页的数据条数
            student:{},
             sortWay:"DESC",

            imagesBox:[{id:0,idView:require("./1.jpg")},
            {id:1,idView:require("./2.jpg")},
            {id:2,idView:require("./3.jpg")},
            {id:3,idView:require("./4.jpg")},],
            fiveNews: []
            }
    },

        created() {
            this.getTableData();
            //判断是否登录状态
            this.isLogin();
            let userName = sessionStorage.getItem('userName');
            return userName ? userName :this.userName;
        },
        mounted(){
            //显示实时时间
            let that= this;
            this.timer = setInterval(function() {
            that.date = new Date().toLocaleString();
            });
            },
            beforeDestroy: function() {
            if (this.timer) {
            clearInterval(this.timer);
            }
  
        },

        methods: {
                

           handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },

            //页大小监听函数
            handleSizeChange(val) {
                this.pageSize = val;
                this.getTableData();
            },
            
            //页码监听函数
            handleCurrentChange(val) {
                 this.currentPage = val;
                 this.getTableData();
            },
            //排序
             sort(){
                // this.currentPage = 1;
                // this.pageSize = 10;
                if(this.sortWay == "DESC"){
                    this.sortWay = "";
                }else{
                    this.sortWay = "DESC";
                }
                this.getTableData();
                console.log(this.tableData);
            },
            //删除信息
            deleteStudent(studentNumber){
                const url = "http://localhost:8081/delete"
                axios({
                    method:"delete",
                    url:url,
                    params:{
                        studentNumber:studentNumber,
                },
                //   dataType:params,
                })
                   this.$confirm('确认删除该学生的信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    })
                .then(response=>{
                    console.log(response.data);
                    this.getTableData();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(err=>{
                    console.log("err...",err)
                    this.$message({
                        type: 'success',
                        message: '删除失败!'
                    });
                });
            },

            //修改信息
            update(row){
                this.student=row;
                this.$router.push({name:'Update',params:{
                    student:this.student,
                    }
                }
            )
            },

            //获取信息列表
            getTableData(){
                const url="http://localhost:8081/page";
                axios({
                method:"post",
                url:url,
                params:{
                    pageNum:this.currentPage,
                    pageSize:this.pageSize,
                    way:this.sortWay,
                },
                //   dataType:params,
                }).then(response=>{
                    this.tableData = response.data.list;
                    this.total = response.data.total;
                }).catch(err=>{
                    console.log("err...",err)
                });
            },

            //退出登陆销毁session
            loginout:function(){
                sessionStorage.removeItem('result')
                sessionStorage.removeItem('userName');
                sessionStorage.removeItem('userId');
                sessionStorage.setItem("token","false");
                this.isShow=!this.isShow;
                this.display=!this.display;
            },

            //显示userName
            userName:function() {
            let userName = sessionStorage.getItem('userName');
            console.log(userName);
            return userName ? userName :this.userName;
            },

            //判断是否登陆状态
            isLogin:function(){
                let result = sessionStorage.getItem('result');
                if(result=="登陆成功"){
                    sessionStorage.setItem("token","true");
                    this.display=true;
                    this.isShow=false;
                    console.log("登陆成功");
                }
                // console.log("111");
            },
            exportFile:function(){
                 this.$axios.get('http://localhost:8081/test/export').then((response) => {
                // 对从后端传来的result值进行判断
                if(response.data == "导出成功") {
                    this.$message({
                    type:'success',
                    message:"学生信息已导出到电脑桌面，请查看'students.xls'"
                });
                }else{
                  this.$message({
                  type:'error',
                  message:'导出失败'
                });
              }
              }).catch((error) => {
                console.log(error);
              });
            },
             //文件上传成功后的钩子
            handleSuccess() {
                this.$message({
                    type:'success',
                    message:'录入成功'
                    });
                
            },
            //立即上传
            uploadFile() {
                this.$refs.upload.submit();
            },
        },
    }

</script>

<style scoped>
.container {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(101, 190, 202);
  background-size: 100%;
  overflow-x: scroll;
  white-space: nowrap;
}
.el-menu-demo {
  width: 100%;
  
}
.time{
    font-size: 20px;
    color: rgb(255, 255, 255);
}
.el-btn {
  float: right;
  margin-top: 15px;
}

.el-menu-item {
  float: left;
  font-size: 15px;
  width: 120px;
}
.welcome{
    color: black;
}
.upload{
    margin-left: 500px;
}
.output{
    margin-left: 500px;
}
</style>

<style>
.el-upload__input{
    display: none !important;
}

</style>