<template>
    <div class=" container">
        <div class="list-part"  >

    <h1 align="center">{{title}}</h1>
        <div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">目录 ></el-menu-item>
            <el-menu-item index="2">
              <router-link to="/register" class="">用户注册  |</router-link>
            </el-menu-item>
            <el-menu-item index="3">
               <router-link to="/alter" class="">修改用户信息  |</router-link>
            </el-menu-item>
            <el-menu-item index="4">
               <router-link to="/add" class="">新增学生信息  |</router-link>
            </el-menu-item>
            <el-menu-item index="5">
               <router-link to="/total" class="">学生信息统计  |</router-link>
            </el-menu-item>
            <el-menu-item index="6">
               <router-link to="/query" class="">学生信息查询</router-link>
            </el-menu-item>
            <div class="el-btn">
            <router-link to="/login" class="">
            <el-button size="small" round >登录</el-button>
            </router-link>
            <router-link to="/register" class="" >
            <el-button size="small" round v-show="!isShow">注册</el-button>
            </router-link>
            <p v-text="welcome" v-show="isShow"></p>
            </div>
            </el-menu>
       
        </div >
         <!-- 未登录--> 
         <div v-show="!display"> <img src="./wyu.jpg" alt="" class="body" > </div>

         <!-- 已登录-->       
        <div v-show="display">
        <hr>
        <div>
            <el-table :data="tableData" :key="currentPage" style="width: 100%" >
                <el-table-column prop="id" label="序号" width="150">
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
                <el-table-column prop="action" label="操作">
                    <template slot-scope="scope">
                        <router-link to="/add" class="">
                        <el-button type="primary" icon="el-icon-edit"></el-button>
                        </router-link>  
                        <el-button @click="deleteStudent(scope.row.studentNumber)" type="primary" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <div class="block" style="margin-top:15px;">
                <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                 :current-page="currentPage" :page-sizes="[1,5,10,20]" :page-size="pageSize" 
                layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
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
            display:true,
            isShow:false,
            activeIndex: '1',
            activeIndex2: '1',
            welcome:"Welcome!",
            tableData:[],
            currentPage: 1, // 当前页码
            total: 0, // 总条数
            pageSize: 10, // 每页的数据条数
            }
    },

        created() {
            this.getTableData();
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
                }).then(response=>{
                    alert(response.data);
                    this.getTableData();
                }).catch(err=>{
                    console.log("err...",err)
                });
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
                },
                //   dataType:params,
                }).then(response=>{
                    this.tableData = response.data.list;
                    this.total = response.data.total;
                }).catch(err=>{
                    console.log("err...",err)
                });
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
    overflow-x: scroll; 
    white-space: nowrap;
}
.el-menu-demo{
    width: 100%;
}
.el-btn{
    float: right;
    margin-top: 15px;
    
}
    
.el-menu-item{
    font-size: 17px;
}

</style>

<style>

</style>