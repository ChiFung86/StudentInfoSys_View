<template>
  <div class="home">
    <EnterPage title="GBA学生信息管理系统"/>
    <!-- <div class="ops">
      <button ><router-link to="/hero" class="">登录</router-link></button>
      <button ><router-link to="/myself" class="">注册</router-link></button>

    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import EnterPage from '@/components/EnterPage.vue'; 

export default {
  name: 'Home',
  components: {
    EnterPage
  }
}
</script>
<style >
.home{
  color: rgb(234, 241, 235);

}
</style>
