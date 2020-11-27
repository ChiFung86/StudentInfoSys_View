<template>
	<div class="statistics_control container">
    <span class="title">GBA学生信息管理系统-信息统计</span>
    <router-link to="/" class="back">
            <el-button type="" >返回</el-button>
        </router-link>
        <br><br>
    <hr >
    <table class="table_control">
        <tr class="line1">
            <td v-for="(cIndex,index) in inforList" v-bind:key="index">
                {{inforList[index].columnName}}
            </td>
        </tr>
        <tr class="line2">
            <td v-for="(cIndex,index) in inforList" v-bind:key="index">
                {{cIndex.num}}人
            </td>
        </tr>
        <br/>
        <tr class="line3">
          <td v-for="(cIndex,index) in classList" :key="index">
              {{classList[index].columnName}}班
          </td>
        </tr>
        <tr class="line4">
            <td v-for="(cIndex,index) in classList" :key="index">
               {{cIndex.num}}人
            </td>
        </tr>
        <br/>
        <tr class="line5">
          <td v-for="(cIndex,index) in sexList" :key="index">
              {{sexList[index].columnName}}
          </td>
        </tr>
        <tr class="line6">
            <td v-for="(cIndex,index) in sexList" :key="index">
               {{cIndex.num}}人
            </td>
        </tr>
    </table>
    
        <p class="total"><b>合计{{sum}}人</b></p>
		
	</div>
</template>

<script>
import axios from "axios"
export default {
	props: {
		
    },
    
	data(){
		return{
            inforList:[],
            sexList:[],
            classList:[],
            sum:0,
        }
    },
    
    created() {
    const url="http://localhost:8081/getInfors";
    axios({
      method:"get",
      url:url
    }).then(response=>{
        let list = response.data;
        let len = list.length;
        this.sum = list[len - 1].num
        let tip = 0;
        for(let i=0;i<len - 1;i++){
            if(list[i].columnName == "-1"){
                tip = -1;
                continue;
            }
            if(tip == -1&&i < len - 3){
                this.classList.push(list[i]);
            }
            else if(i >= len-3){
               this.sexList.push(list[i]);
            }else{
                this.inforList[i] = list[i];
            }
            
        }
        
    }).catch(err=>{
      console.log("err......",err)
    });

    },

	methods:{
		
	}
}
</script>


<style scoped>
.container{
    background-image:url('../assets/img/hero/4.jpg');
    position:fixed;
    width: 100%;
    height: 100%;
   background-color: rgb(129, 143, 158);
  

}
.statistics_control{
    background-size: cover;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 18px;
}
h1{
    position:absolute;
}
.title{
  position: fixed;
  left: 0;
  font-size: 40px;
  color: rgb(233, 174, 134);
  font-weight: bold;
}
.dottedLine {
    height: 150px;
    border: none;
    border-top: 4px dotted #636568;
}
.table_control{
text-align: center;
font-family: verdana,arial,sans-serif;
font-size:11px;
border:black  solid 0px;
border-collapse: collapse;
width: 80%;
height: 25%;
margin-top:5%;
margin-left: 10%;
}
th{
    border-width: 1px;
    padding: 8px;
    height: 50%;
    border-style: solid 0px;
    border-color:black;
}
td{
    border-width: 1px;
    padding: 8px;
    width: 10%;
    border-style: solid ;
    border-color:rgb(84, 120, 141);
    overflow: auto;
}
.line1, .line3, .line5{
    background: rgb(91, 126, 146);
    color: white;
    font-size: 15px;
}
.line2, .line4, .line6{
    background: white;
    font-size: 15px;
    
}
.total{
    margin-right: -70%;
    margin-top: 2%;
    font-size: 30px;
    
}
.back{
    position: fixed;
    top:2%;
    right: 2%;
 
}
hr{
 width:100%;
 height:1px;
 background-color:#fff;
}
</style>