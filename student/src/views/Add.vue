<template>
	<div class="add_control">
        <h1>基本信息</h1><br><br>
        <hr class="dottedLine" />
        
        <div class="container">
            <div class="row row-cols-3">
                <div class="col-md-4">
                    <label>学生姓名:</label>
                    <input   type="text" maxlength="30">
                </div>
                <div class="col-md-4">
                    <label>学号:</label>
                    <input   type="text" maxlength="30">
                </div>
                <div class="col-md-4">
                <label>出生年月日:</label>
                <input   type="date"><br>
                </div>
            </div>
            

            <div class="row row-cols-3">
                <div class="col-md-4">
                    <b>性别:</b><select name="性别" class="DropDwonList">
                        <option value="男">男</option>
                        <option value="女">女</option>
                        </select>
                </div>
                <div class="col-md-4">
                    <label>手机号码:</label>
                    <input   type="text" id="add_tel">
                </div>
                <div class="col-md-4">
                    <label>班级:</label>
                    <input   type="text" maxlength="30"><br>
                </div>
            </div>
            
            <div class="row row-cols-3 ">
                <div class="col-md-4">
                </div>
                <div class="col-md-4">
                    <span class="third"><b>系部:</b></span><select name="系部" class="DropDwonList">
                    <option value="智能制造学部">智能制造学部</option>
                    <option value="经济管理学院">经济管理学院</option>
                    <option value="艺术设计学院">艺术设计学院</option>
                    <option value="政法学院">政法学院</option>
                    <option value="文学院">文学院</option>
                    <option value="外国语学院">外国语学院</option>
                    <option value="数学与计算科学学院">数学与计算科学学院</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label>信息录入时间:</label>
                    <input   type="text" placeholder="系统自动生成" disabled="disabled">
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
export default {
    data(){
        return{

        }
    },

    methods:{
        checkAdd:function(){
            var str_tel = document.getElementById('add_tel').value.trim(); 
            var reg_tel =/^[0-9]*$/;
            if(!reg_tel.test(str_tel)){
                alert("手机号码只能输入数字！");    
            }
    },

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
.upload{
   
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