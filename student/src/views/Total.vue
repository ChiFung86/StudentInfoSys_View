<template>
	<div class="statistics_control">
    <h1>信息统计</h1><br><br>
    <hr class="dottedLine" />
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
    </table>
    
        <p class="total"><b>合计共{{sum}}人</b></p>
		
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
        console.log(list.length);
        for(let i=0;i<len;i++){
            if(i == len-1){
                this.sum = list[i].num;
                break;
            }
            this.inforList[i] = list[i];
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
.statistics_control{
    background-size: cover;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 18px;
}
h1{
    position:absolute;
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
border:black solid 1px;
border-collapse: collapse;
width: 80%;
height: 25%;
margin-bottom:25%;
margin-left: 10%;
}
th{
    border-width: 1px;
    padding: 8px;
    height: 50%;
    border-style: solid;
    border-color:black;
}
td{
    border-width: 1px;
    padding: 8px;
    width: 10%;
    border-style: solid;
    border-color:black;
    overflow: auto;
}
.line1{
    background: rgb(19, 129, 192);
    color: white;
    font-size: 15px;
}
.line2{
    background: white;
    font-size: 15px;
    
}
.total{
    margin-right: 70%;
    margin-top: 5%;
    font-size: 30px;
    
}
</style>