<template>
  <div>
    <div class="query_control container" >
      <span class="title">GBA学生信息管理系统-条件查询</span>
      <router-link to="/" class="back" >
        <el-button type="" >返回</el-button>
      </router-link>
      <br /><br />
      <hr >

      <div class="">
        
        <form>
          <div class="row row-cols-3">
            <div class="col-md-4">
              <label for="stuName">姓名:</label>
              <el-input v-model="stuName" 
              class="textTop" 
              maxlength="30" 
              id="stuName"
              clearable></el-input>
            </div>
            <div class="col-md-4">
              <label for="stuNum">学号:</label>
              <el-input v-model="stuNum" maxlength="30"  id="stuNum" clearable></el-input>
            </div>
            <div class="col-md-4">
              <label for="stuCls">班级:</label>
              <el-input v-model="stuCls" maxlength="30"  id="stuCls" clearable></el-input>
            </div>
          </div>
          <div class="row row-cols-3">
            <div class="col-md-4">
              <b>性别:</b>
              <select class="DropDwonList" @change="getSex($event)">
                <option
                  class="select-opt"
                  v-for="(item, index) in sexList"
                  v-bind:key="index">
                  {{ item.columnName }}
                </option>
              </select>
            </div>
            <div class="col-md-4">
              <b>系部:</b>
              <select class="DropDwonList" @change="getDepart($event)">
                <option
                  v-for="(item, index) in list"
                  v-bind:key="index">
                  {{ list[index].columnName }}
                </option>
              </select>
            </div>
            <div class=".col-md-4">
              
              <el-button type="primary" @click="query" >
                查询
              </el-button>
              <button type="reset" class="reset" @click="clearData">清空</button>
              
            </div>
          </div>
         
        </form>

<div class="dataList" v-show="showList">
    
    
      <div class="querylist">
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="timeStamp" style="width: 100%">
          <el-table-column prop="id" label="序号" width="150">
          </el-table-column>
          <el-table-column prop="studentNumber" label="学号" width="150">
          </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
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
              <el-button @click="update(scope.row)" type="primary" icon="el-icon-edit"></el-button>
              <el-button
                @click="deleteStudent(scope.row.studentNumber)"
                type="primary"
                icon="el-icon-delete"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <div class="block" style="margin-top: 15px">
          <el-pagination
            align="center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>

      </div>
    </div>

    <!-- 列表 -->
    
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      stuName: '',
      stuNum:'',
      stuCls:'',
      showList: false,
      list: [],    
      sexList: [],
      sex: "",
      department: "",
      tableData:[],
       student:{},
      currentPage: 1, // 当前页码
      total: 0, // 总条数
      pageSize: 10, // 每页的数据条数
      timeStamp:"",

    };
  },
  created() {
    axios
      .all([
        axios.get("http://localhost:8081/depart"),
        axios.get("/data/add.json"),
      ])
      .then(
        axios.spread((depart, sex) => {
          this.list = depart.data;
          this.sexList = sex.data;
          this.list.unshift({
            columnName: "",
          });
          this.sexList.unshift({
            columnName: "",
          });
        })
      )
      .catch((err) => {
        console.log("err....", err);
      });
  },

  methods: {
    //返回到查询界面
    queryBack(){
      this.showList = false;
    },

    // 查询
    query() {
      axios({
        method: "post",
        url: "http://localhost:8081/get",
        data: {
          name: this.stuName,
          studentNumber: this.stuNum,
          className: this.stuCls,
          sex: this.sex,
          department: this.department,
        },
        //   dataType:JSON,
      }).then((response) => {
          // if(response.data == null){
          //   this.showList = false;
          // }else{
            this.showList = true;
            this.tableData = response.data;
            this.total = response.data.length;
          // }
        }).catch((err) => {
          console.log("err...", err);
        });
    },
    //清空
    clearData(){
      console.log("------------------");
      this.stuCls = "";
      this.stuName = "";
      this.stuNum = "";
      this.sex = "";
      this.department="";
    },
   back(){
      this.showList = false;
    },

    //获取性别
    getSex(event) {
      this.sex = event.target.value;
      console.log(this.sex);
    },

    //获取学院
    getDepart(event) {
      this.department = event.target.value;
      console.log(this.department);
    },

    //页大小监听函数
    handleSizeChange(val) {
      this.pageSize = val;
    },

    //页码监听函数
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    //删除信息
    deleteStudent(studentNumber) {
      const url = "http://localhost:8081/delete";
      axios({
        method: "delete",
        url: url,
        params: {
          studentNumber: studentNumber,
        },
        //   dataType:params,
      })
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then((response) => {
          for(let i=0;i < this.tableData.length;i++){
            if(this.tableData[i].studentNumber == studentNumber){
              console.log(this.tableData.length);
              console.log(this.tableData.splice(i,1));
              this.timeStamp = this.tableData.length;
              console.log(this.timeStamp);
              break;
            }
          }
          
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch((err) => {
          console.log("err...", err);
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
      }
  },
};
</script>

<style scoped>
hr{
 width:100%;height:1px;
 background-color:#fff;
}
.dottedLine {
  height: 150px;
  border: none;
  border-top: 4px dotted #636568;
}
.back{
   position: fixed;
    top:2%;
    right: 2%;
}
.reset{
  border:1px solid rgb(204, 201, 201);
  border-radius: 5px;
  font-size: 15px;
  color: rgb(255, 255, 255);
  background-color:#3399ff;
  width: 70px;
  height: 40px;
  margin: 20px;
}
.query_control {
  background-image: url("../assets/img/hero/15.jpg");
  background: cover;
  background-size: auto 100%;
  font-size: 18px;
  margin-bottom: 0px;
  padding-bottom: 40%;
}
.container {
 background-image: url(../assets/img/hero/4.jpg);
    position:fixed;
    width: 100%;
    height: 100%;
   background-color: rgb(129, 143, 158);
 
}
.querylist{
  width: 100%;
    height: 500px;
   overflow-x: scroll;
  white-space: nowrap;
}
.row {
  height: 120px;
  width: 100%;
}

.DropDwonList {
  margin: 10px;
  width: 300px;
  height: 40px;
  margin-bottom: 2%;
  border-radius: 5px;
  font-size: 15px;
  border: white;

}

.el-input{
    width: 300px;
    margin: 15px;
}

.title{
  position: fixed;
  left: 0;
  font-size: 40px;
  color: rgb(233, 174, 134);
  font-weight: bold;
}

</style>