<template>
  <div class="add_control container">
  
    <span class="title">GBA学生信息管理系统-新增学生</span>
    <router-link to="/" class="back">
            <el-button type="" >返回</el-button>
        </router-link>
    <br /><br />
    <hr />

    <div class="">
       
      <div class="row row-cols-3 row1">
        <div class="col-md-4">
          <div class="editText">
            <label><span class="star">*</span>学生姓名:</label>
            <el-input v-model="stuName" maxlength="30" ref="studentName" id="stuName" ></el-input>
          </div>
        </div>
        <div class="col-md-4">
          <div class="editText">
            <label><span class="star">*</span>学号:</label>
            <el-input  v-model="stuNum" placeholder="学号必须填写" maxlength="30" ref="studentNumber" id="stuNum"></el-input>
          </div>
        </div>
        <div class="col-md-4">
          <div class="editText">
            <label><span class="star">*</span>出生日期:</label> 
              <el-input  v-model="birth" type="date" ref="birth" id="birth"></el-input>
          </div>
        </div>
      </div>

      <div class="row row-cols-3">
        <div class="col-md-4">
          <div class="editText">
            <b><span class="star">*</span>性别:</b>
            <select class="DropDwonList" v-model="sex" @change="getSex($event)" id="sex">
              <option v-for="(item, index) in sexList" v-bind:key="index" >
                {{ item.columnName }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="editText">
            <label><span class="star">*</span>手机号码:</label>
            <el-input v-model="add_tel"  type="text" id="add_tel" maxlength="11" ref="phone" ></el-input>
          </div>
        </div>
        <div class="col-md-4">
          <div class="editText">
            <label><span class="star">*</span>班级:</label>
            <el-input  v-model="stuCls" maxlength="30" ref="className" id="stuCls"><br></el-input>
          </div>
        </div>
      </div>

      <div class="row row-cols-3">
        <div class="col-md-4">
          <div class="editText">
            <span class="third"><b><span class="star">*</span>系部:</b></span>
            <select
              class="DropDwonList"
              v-model="department"
              @change="getDepart($event)"
              id="dep"
            >
              <option v-for="(item, index) in list" v-bind:key="index" >
                {{ list[index].columnName }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-8">
          <div class="editText">
            <label><span class="star">*</span>信息录入时间:</label>
            <el-input type="text" disabled="disabled" v-model="date"></el-input>
          </div>
        </div>
<div class="col-md-2 photo"><label>头像:</label></div>
        <div class="col-md-3 line4">
          
          <div class="imgBox" >
            <el-upload
              ref="upload"
              :action="uploadUrl"
              accept="image/png,image/gif,image/jpg,image/jpeg"
              list-type="picture-card"
              :limit="limitNum"
              :auto-upload="autoUp"
              :before-upload="handleBeforeUpload"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
          <el-button size="small" type="primary" @click="uploadFile"
            >立即上传</el-button
          >
        </div>
<div class="col-md-3 line4">
          <el-button type="primary submit"  value="提交" @click="checkAdd" >提交</el-button>
        </div>
      </div>
    
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      date: new Date(),
      stuName:'',
      stuNum:'',
      add_tel:'',
      stuCls:'',
      birth:'',
      list: [], //院系列表
      sexList: [], //性别列表
      sex: "", //性别
      department: "", //院系
      dialogImageUrl: "", //图片显示地址
      dialogVisible: false,
      autoUp: false,
      formLabelWidth: "80px",
      limitNum: 1, //图片上传限制个数
      uploadUrl: "http://localhost:8081/upLoadImg", //图片上传地址
      photoUrl: "", //图片地址
      uploadShow: true, //控制上传图片框显示/隐藏
    };
  },
  created() {
    axios
      .all([axios.get("/data/depart.json"), axios.get("/data/add.json")])
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
    //提交
  checkAdd: function () {
      var str_stuName = document.getElementById("stuName").value.trim(); 
      var str_stuNum = document.getElementById('stuNum').value.trim(); 
      var str_birth = document.getElementById("birth").value.trim();
      var str_sex = document.getElementById("sex").value.trim();;
      var str_tel = document.getElementById("add_tel").value.trim();
      var str_stuCls = document.getElementById("stuCls").value.trim();
      var str_dep = document.getElementById("dep").value.trim();
      var reg_stuName = /^[\u4e00-\u9fa5A-Za-z]*$/;
      var reg_tel = /^[0-9]*$/;
      if(str_stuName.length==0||str_stuNum.length==0||str_tel.length==0||str_sex.length==0||str_dep.length==0||str_birth.length==0||
      str_stuCls.length==0){
        this.$message({
                  type:'warning',
                  message:'信息未补全！'
                });   
      }
      else if(!reg_stuName.test(str_stuName)){
                this.$message({
                  type:'warning',
                  message:'姓名只能为中文或英文！'
                });   
            }
      else if (!reg_tel.test(str_tel)) {
         this.$message({
                  type:'warning',
                  message:'手机号码只能输入数字'
                });   
      }else {
      axios({
        method: "post",
        url: "http://localhost:8081/save",
        data: {
          name: this.$refs.studentName.value,
          studentNumber: this.$refs.studentNumber.value,
          birth: this.$refs.birth.value,
          className: this.$refs.className.value,
          sex: this.sex,
          department: this.department,
          phoneNumber: this.$refs.phone.value,
          photo: this.photoUrl,
          entryTime:new Date(),
        },
        //   dataType:JSON,
      })
        .then((response) => {
          console.log(response.data);
          this.$message({
                  type:'success',
                  message:'新增成功！'
                });   
          this.$router.push("/");
        })
        .catch((err) => {
          console.log("err...", err);
        });
      }

    },
    //获取性别
    getSex(event) {
      this.sex = event.target.value;
    },

    //获取学院
    getDepart(event) {
      this.department = event.target.value;
    },

    // 上传文件之前的钩子
    handleBeforeUpload(file) {
      console.log("before");
      console.log(file.type);
      if (
        !(
          file.type === "image/png" ||
          file.type === "image/gif" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg"
        )
      ) {
        this.$notify.warning({
          title: "警告",
          message:
            "请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片",
        });
      }
      let size = file.size / 1024 / 1024 / 2;
      if (size > 2) {
        this.$notify.warning({
          title: "警告",
          message: "图片大小必须小于2M",
        });
      }
    },

    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      axios({
        method: "post",
        url: "http://localhost:8081/deleteImg",
        params: {
          imgSrc:this.photoUrl,
        },
        //   dataType:JSON,
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log("err...", err);
        });
      console.log(file, fileList);
    },

    //文件上传成功后的钩子
    handleSuccess(response) {
      this.photoUrl = response;
      console.log("-----------" + this.photoUrl);
    },
    //立即上传
    uploadFile() {
      this.$refs.upload.submit();
    },
  },
};
</script>

<style scoped>
.star{
   color: red;
}
h1{
    position:absolute;
   
}
.dottedLine {
        height: 30px;
        border: none;
        border-top: 4px dotted #636568;
    }
.add_control{
   
    background-image:url();
    background-size: cover;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-bottom:20%;
     font-size: 18px;
}
.container{
   background-image: url(../assets/img/hero/4.jpg);
    position:fixed;
    width: 100%;
    height: 100%;
   background-color: rgb(129, 143, 158);
  
}
.title{
  position: fixed;
  left: 0;
   font-size: 40px;
  color: rgb(233, 174, 134);
  font-weight: bold;
}
.back{
  position: fixed;
  top:2%;
  right: 2%;
 
}
.row{
    height: 10%;
   text-align: right;
   margin-right:10%;
   
}
.editText input {
  line-height: 30px;
  width: 250px;
  margin-right: 40px;
  margin-bottom: 30px;
  text-align: left;
}
.row1{
    margin-top: 100px;
}
.el-input{
    width: 300px;
    margin: 15px;
}
.DropDwonList{
    font-size: 15px;
   margin: 15px;
    width: 300px;
    height: 35px;
    border-radius: 5px;
    border: white;
}

.photo{
  margin-top: 25px;
  padding-right: 70px;
  
}
.img{
    height: 100px;
}

.line4{
    text-align: center;
}
</style>

<style>
.el-upload__input {
  display: none !important;
}
hr{
 width:100%;
 height:1px;
 background-color:#fff;
}
</style>