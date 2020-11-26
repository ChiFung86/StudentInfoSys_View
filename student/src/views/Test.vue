<template>
<div>
   <h2>nihao</h2>
   <div class="box" v-for="(num,index) in numList " :key="index" :style="{width:num*10 + 'px'}">{{num}}</div>
</div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      sum:0,
      inforList:[],
      numList:[],
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
        this.sum = list[len - 1].num;
        console.log(list);
        for(let i=0;i<len - 1;i++){
            this.inforList[i] = list[i];
            this.numList[i] = list[i].num;
        }
        
    }).catch(err=>{
      console.log("err......",err)
    });

    },
}

</script>

<style scoped>
.box{
  background: yellow;
  height: 30px;
}

</style> 
