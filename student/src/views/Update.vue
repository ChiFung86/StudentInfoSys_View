<template>
  <div class="add_control container">
   <span class="title">GBA学生信息管理系统-修改学生</span>
    <router-link to="/" class="back">
            <el-button type="" >返回</el-button>
        </router-link>
    <br /><br />
    <hr />

    <div class="container">
      <div class="row row-cols-3">
        <div class="col-md-4">
          <label for="stuName">姓名：</label>
          <el-input
            id="stuName"
            type="text"
            maxlength="30"
            value="stu_name"
            v-model="stu_name"
          ></el-input>
        </div>
        <div class="col-md-4">
          <label for="stuNum">学号:</label>
          <el-input
            id="stuNum"
            type="text"
            maxlength="30"
            disabled="disabled"
            value="stu_num"
            v-model="stu_num"
          ></el-input>
        </div>
        <div class="col-md-4">
          <label>出生日期:</label>
          <el-input type="date" value="stu_birth" v-model="stu_birth"></el-input
          ><br />
        </div>
      </div>

      <div class="row row-cols-3">
        <div class="col-md-4">
          <b>性别:</b>
          <select name="性别" class="DropDwonList" v-model="stu_sex">
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="add_tel">手机号码:</label>
          <el-input
            type="text"
            id="add_tel"
            value="stu_tel"
            v-model="stu_tel"
          ></el-input>
        </div>
        <div class="col-md-4">
          <label for="stuCls">班级:</label>
          <el-input
            id="stuCls"
            type="text"
            maxlength="30"
            value="stu_class"
            v-model="stu_class"
          ></el-input><br />
        </div>
      </div>

      <div class="row row-cols-3">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <span class="third"><b>系部:</b></span
          ><select name="系部" class="DropDwonList" v-model="stu_dep">
            <option value="智能制造学部">智能制造学部</option>
            <option value="经济管理学院">经济管理学院</option>
            <option value="艺术设计学院">艺术设计学院</option>
            <option value="政法学院">政法学院</option>
            <option value="文学院">文学院</option>
            <option value="外国语学院">外国语学院</option>
            <option value="数学与计算科学学院">数学与计算科学学院</option>
            <option value="物理学院">物理学院</option>
          </select>
        </div>
        <div class="col-md-4">
          <label>信息录入时间:</label>
          <el-input type="text" disabled="disabled" v-model="date" ></el-input>
        </div>
      </div>

<div class="col-md-2 photo"><label>头像:</label></div>
        <div class="col-md-3 line4">
          <div class="imgBox">
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
              :file-list="defaultImg"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
          <el-button size="small" type="primary" @click="uploadFile"
            >立即上传</el-button
          >
        </div>
        <div class="col-md-3 line4">
              <el-button type="primary"  @click="checkAdd">提交</el-button>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      stu_name: "",
      stu_num: "",
      stu_class: "",
      stu_tel: "",
      stu_sex: "",
      stu_birth: "",
      stu_dep: "",
      date: new Date(),
      autoUp: false,
      formLabelWidth: "80px",
      limitNum: 1, //图片上传限制个数
      uploadUrl: "http://localhost:8081/upLoadImg", //图片上传地址
      photoUrl: "", //图片地址
      uploadShow: true, //控制上传图片框显示/隐藏
      defaultImg: [],
    };
  },
  created() {
    let params = this.$route.params;

    this.stu_name = params.student.name;
    this.stu_num = params.student.studentNumber;
    this.stu_class = params.student.className;
    this.stu_tel = params.student.phoneNumber;
    this.stu_sex = params.student.sex;
    this.stu_birth = params.student.birth;
    this.stu_dep = params.student.department;
    this.defaultImg = [
      {
        url: params.student.photo,
      },
    ];
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
    checkAdd: function () {
      var str_tel = this.stu_tel;
      var reg_tel = /^[0-9]*$/;
      if (!reg_tel.test(str_tel)) {
        alert("手机号码只能输入数字！");
      }
      if(this.photoUrl ==""){
        this.photoUrl = this.defaultImg[0].url;
      }
      axios({
        method: "put",
        url: "http://localhost:8081/update",
        data: {
          name: this.stu_name,
          studentNumber: this.stu_num,
          birth: this.stu_birth,
          className: this.stu_class,
          sex: this.stu_sex,
          department: this.stu_dep,
          phoneNumber: this.stu_tel,
          photo: this.photoUrl,
          entryTime: new Date(),
        },
        //   dataType:JSON,
      })
        .then((response) => {
          console.log(response.data);
          alert("修改成功");
          if (this.defaultImg[0].url != this.photoUrl) {
            axios({
              method: "post",
              url: "http://localhost:8081/deleteImg",
              params: {
                imgSrc: this.defaultImg[0].url,
              },
              //   dataType:JSON,
            })
              .then((response) => {
                console.log(response.data);
              })
              .catch((err) => {
                console.log("err...", err);
              });
          }

          this.$router.push("/");
        })
        .catch((err) => {
          console.log("err...", err);
        });
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
    handleRemove() {
      if (this.photoUrl == "") {
        console.log("不用删除！");
      } else {
        axios({
          method: "post",
          url: "http://localhost:8081/deleteImg",
          params: {
            imgSrc: this.photoUrl,
          },
          //   dataType:JSON,
        })
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => {
            console.log("err...", err);
          });
        console.log();
      }
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
.container {
  background-image: url("../assets/img/hero/4.jpg");
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: 70%;
}
h1 {
  position: absolute;
}
.dottedLine {
  height: 30px;
  border: none;
  border-top: 4px dotted #636568;
}

.container {
  height: 90%;
  width: 100%;
}
.row {
  height: 10%;
  text-align: right;
  margin-right: 10%;
}
.el-input {
  width: 300px;
  margin: 15px;
}
.DropDwonList {
 font-size: 15px;
   margin: 15px;
    width: 300px;
    height: 35px;
    border-radius: 5px;
    border: white;
}

.img {
  height: 100px;
}

.submit {
  font-size: 18px;
  width: 13%;
  color: white;
  background-color: blue;
  border-radius: 15%;
  margin-top: 6%;
}
.line4 {
  text-align: center;
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
.photo{
  margin-top: 25px;
  padding-right: 70px;
  
}
</style>

<style>
.el-upload__input {
  display: none !important;
}
</style>