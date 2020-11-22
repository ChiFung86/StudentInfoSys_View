<template>
	<div class="statistics_control">
    <h1>信息统计</h1><br><br>
    <hr class="dottedLine" />
    <table class="table_control">
        <tr class="line1">
            <td>202001班</td>
            <td>202002班</td>
            <td>202003班</td>
            <td>202004班</td>
            <td>202005班</td>
            <td>管理系</td>
            <td>计算机系</td>
            <td>土木系</td>
            <td>男</td>
            <td>女</td>
        </tr>
        <tr class="line2">
            <td>50人</td>
            <td>50人</td>
            <td>50人</td>
            <td>50人</td>
            <td>50人</td>
            <td>500人</td>
            <td>500人</td>
            <td>500人</td>
            <td>3000人</td>
            <td>3000人</td>
        </tr>
    </table>
    
        <p class="total"><b>合计共6000人</b></p>
		
	</div>
</template>

<script>
export default {
	props: {
		
	},
	data(){
		
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