<template>
	<div class="query_control" >
    <h1>条件查询</h1><br><br>
    <hr class="dottedLine" />
	
    <div class="container" >
    <form>
        <div class="row row-cols-3">
            <div class="col-md-4">
                <label>姓名:</label>
                <input   type="text" class="textTop" maxlength="30">
            </div>
            <div class="col-md-4">    
                <label>学号:</label>
                <input   type="text" maxlength="30">
            </div>
            <div class="col-md-4"> 
                <label>班级:</label>
                <input   type="text" maxlength="30">
            </div> 
        </div>
        <div class="row row-cols-3">
            <div class="col-md-4">  
                <b>性别:</b>
                    <select  class="DropDwonList">
                        <option v-for="(item,index) in sexList" v-bind:key="index" >
                        {{item.sex}}
                        </option>
                    </select>
            </div> 
            <div class="col-md-4">
                <b>系部:</b>
                    <select class="DropDwonList">
                        <option v-for="(item,index) in list" v-bind:key="index" >
                        {{list[index].departName}}
                        </option>
                    </select>
            </div>
        </div>
        <div class="row">
            <div class=".col-md-12">  
                <button type="submit" class="submitquery" >
                <router-link to="/" class="">查询</router-link>
                </button>
                <button type="reset" class="submitclear" >清空</button>
            </div>
        </div>
        </form>
	</div>	

  

	</div>
</template>

<script>
import axios from "axios"
export default {
  data(){
        return {
            showList:false,
            list:[],
            sexList:[],
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
            console.log(this.list);
        }).catch(err=>{
            console.log("err...",err)
        });
    },
}
</script>

<style scoped>
h1{
    position:absolute;
   
}
.dottedLine {
        height: 150px;
        border: none;
        border-top: 4px dotted #636568;
    }
.query_control{
    background-image:url('../assets/img/hero/15.jpg');
    background: cover;
    background-size: auto 100%;
    font-size: 18px;
    margin-bottom: 0px;
    padding-bottom:40%;
}
.container{
   height: 100px;
   width: 100%;
   
}
.row{
    height: 150px;
   width: 100%;
}
input{
    line-height: 30px;
    width: 200px;
    margin-right: 40px;
    margin-bottom: 2%;
}
.DropDwonList{
    line-height: 30px;
    font-size: 20px;
    margin-right: 40px;
    width: 200px;
    margin-bottom: 2%;
}
.submitquery{
    font-size: 18px;
    width: 10%;
    height: 50px;
    color:white;
    background-color: blue;
    border-radius: 15%;
}
.submitclear{
    font-size: 18px;
    width: 10%;
    height: 50px;
    background-color: white;
    border-radius: 15%;
    border-color: blue;
}

</style>