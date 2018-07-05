<template>
  <div id="webApp">
    <router-view v-if="isRouterAlive"/>
    <Footer></Footer>
  </div>
</template>

<script>
import "./../css/common.css";
// import "./../fonts/icon/iconfont.css";
import Footer from "./../index/common/footer.vue";
export default {
  name: 'App',
  components: {
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
#webApp{
  padding-top:53px;
}
</style>