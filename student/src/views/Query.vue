<template>
	<div class="query_control" >
    <h1>查询条件</h1><br><br>
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
                <b>性别:</b><select name="性别" class="DropDwonList">
                    <option value="男">男</option>
                    <option value="女">女</option>
                    </select>
            </div> 
            <div class="col-md-4">
                <b>系部:</b><select name="系部" class="DropDwonList">
                    <option value="智能制造学部">智能制造学部</option>
                    <option value="经济管理学院">经济管理学院</option>
                    <option value="艺术设计学院">艺术设计学院</option>
                    <option value="政法学院">政法学院</option>
                    <option value="文学院">文学院</option>
                    <option value="外国语学院">外国语学院</option>
                    <option value="数学与计算科学学院">数学与计算科学学院</option>
                    </select>
            </div>
        </div>
        <div class="row">
            <div class=".col-md-12 ">  
                <button type="submit" class="submitquery" >
                <router-link to="/" class=""><b>查询</b></router-link>
                </button>
                <button type="reset" class="submitclear" ><b>清空</b></button>
            </div>
        </div>
        </form>
	</div>	

	</div>
</template>

<script>
export default {
  date(){
    return{
      showList:false
    }
  }
    
}
</script>

<style scoped>
h1{
    position:absolute;
   
}
.dottedLine {
        height: 100px;
        border: none;
        border-top: 4px dotted #636568;
    }
.query_control{
    background-image:url('../assets/img/hero/15.jpg');
    background: cover;
    background-size: auto 100%;
    height: 800px;
}
.container{
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
    font-size: 100%;
    width: 10%;
    height: 50px;
    color:white;
    background-color: blue;
    border-radius: 15%;
}
.submitclear{
    font-size: 100%;
    width: 10%;
    height: 50px;
    background-color: white;
    border-radius: 15%;
    border-color: blue;
    margin-left: 10%;
}

</style>