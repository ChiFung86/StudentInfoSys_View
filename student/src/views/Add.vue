<template>
	<div class="add_control">
        <h1>基本信息</h1><br><br>
        <hr class="dottedLine" />
        
        <div class="container">
            <div class="row row-cols-3">
                <div class="col-md-4">
                    <label>学生姓名:</label>
                    <input   type="text" maxlength="30" ref="studentName">
                </div>
                <div class="col-md-4">
                    <label>学号:</label>
                    <input   type="text" maxlength="30" ref="studentNumber">
                </div>
                <div class="col-md-4">
                <label>出生年月日:</label>
                <input   type="date" ref="birth"><br>
                </div>
            </div>
            

            <div class="row row-cols-3">
                <div class="col-md-4">
                    <b>性别:</b>
                    <select  class="DropDwonList"  v-model="sex"  @change="getSex($event)">
                        <option v-for="(item,index) in sexList" v-bind:key="index" >
                        {{item.sex}}
                        </option>
                        </select>
                </div>
                <div class="col-md-4">
                    <label>手机号码:</label>
                    <input   type="text" id="add_tel" ref="phone">
                </div>
                <div class="col-md-4">
                    <label>班级:</label>
                    <input   type="text" maxlength="30" ref="className"><br>
                </div>
            </div>
            
            <div class="row row-cols-3 ">
                <div class="col-md-4">
                    <span class="third"><b>系部:</b></span>
                    <select class="DropDwonList" v-model="department"  @change="getDepart($event)">
                        <option v-for="(item,index) in list" v-bind:key="index" >
                        {{list[index].departName}}
                        </option>
                    </select>
                </div>
                <div class="col-md-8">
                    <label>信息录入时间:</label>
                    <input   type="text" placeholder="系统自动生成" disabled="disabled" ref="inputTime">
                </div>
            </div>
            <div class="row">
                <div class="col-md-4  line4">  
                   
                    
                </div>
                <div class="col-md-4  line4">
                    <input type="file" class="upload" value="上传"> 
                </div>
                <div class="col-md-4  line4">
                    <input type="submit" class="submit" value="提交" @click="checkAdd">
                </div>
            </div>
        </div>	
	</div>
</template>

<script>
import axios from "axios"
export default {
     data(){
        return {
            list:[],
            sexList:[],
            sex:"",
            department:"",
        }
    },
    created(){
        const url="/data/add.json";
        axios({
            method:"get",
            url:url
        }).then(response=>{
            this.list=response.data;
            for(let i=0;i < 3;i++){
                this.sexList[i] = this.list[i];
            }
        }).catch(err=>{
            console.log("err...",err)
        });
    },
    methods:{
        checkAdd:function(){
            var str_tel = document.getElementById('add_tel').value.trim(); 
            var reg_tel =/^[0-9]*$/;
            if(!reg_tel.test(str_tel)){
                alert("手机号码只能输入数字！");    
            }
            // console.log(this.$refs.studentName.value,
            //             this.$refs.studentNumber.value,
            //             this.$refs.birth.value,
            //             this.$refs.phone.value,
            //             this.$refs.className.value,
            //             this.$refs.inputTime.value);
            axios({
              method:"post",
              url:"http://localhost:8081/save",
              data:{
                  "name": this.$refs.studentName.value,
                  "studentNumber":this.$refs.studentNumber.value,
                  "birth":this.$refs.birth.value,
                  "className:":this.$refs.className.value,
                  "sex":this.sex,
                  "department":this.department,
                  "phoneNumber":this.$refs.phone.value
              },
            //   dataType:JSON,
            }).then(response=>{

                console.log(response.data);
             }).catch(err=>{
                 console.log("err...",err)
             });
        },

        //获取性别
        getSex(event){
            this.sex = event.target.value;
        },

        //获取学院
        getDepart(event){
            this.department = event.target.value;
        }

    }   
}
</script>

<style scoped>
h1{
    position:absolute;
   
}
.dottedLine {
        height: 30px;
        border: none;
        border-top: 4px dotted #636568;
    }
.add_control{
   
    background-image:url('../assets/img/hero/pig.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-bottom:20%;
}
.container{
   height: 90%;
   width: 100%;
}
.row{
    height: 10%;
   text-align: right;
   margin-right: 10%;
}
input{
    line-height: 30px;
    width: 250px;
    margin-right: 40px;
    margin-bottom: 30px;
    text-align:left;
}
.DropDwonList{
    line-height: 30px;
    font-size: 20px;
    margin-right: 40px;
    margin-bottom: 30px;
    width: 250px;
}

.img{
    height: 100px;
}
.submit{
    font-size: 18px;
    width: 13%;
    color:white;
    background-color: blue;
    border-radius: 15%;
    margin-top: 6%;
}
.line4{
    text-align: center;
}
</style>