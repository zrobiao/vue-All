<template>
  <div>
    <Header></Header>
    <router-view v-if="isRouterAlive"/>
    <Footer></Footer>
  </div>
</template>

<script>
import "./../css/common.css";
// import "./../fonts/icon/iconfont.css";
import Header from "./../index/common/header.vue"; 
import Footer from "./../index/common/footer.vue";
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  provide(){
    return {
      reload:this.reload
    }
  },
  data (){
    return {
      isRouterAlive:true
    }
  },
  methods:{
    reload (){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style>
#app{
  padding-top:53px;
}
</style>