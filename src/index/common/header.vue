<template>
  <header class="navbar-fixed-top">
    <navbar class="container hph-navbar">
      <a class="navbar-brand logo-link" slot="brand" href="/index.html#/website/Index">
        <img src="../../../static/img/index/logo.png" class="img-responsive">
      </a>
      <template slot="collapse">
        <navbar-nav right>
          <li v-for="(menu,index) in menuItems" :class="{'df-active':$store.state.flag==index}" class="submenu-box">
            <router-link :to="menu.tablink">{{menu.title}}</router-link>
          </li>
        </navbar-nav>
      </template>
    </navbar>
  </header>
</template>
<script>
export default {
  data () {
    return {
      menuItems:[
      {title:'首页',tablink:'/website/Index'},
      {title:'健康资源',tablink:'/website/healthInfo'},
      {title:'资讯',tablink:'/website/infoList'},
      {title:'关于我们',tablink:'/website/aboutUs'},
      ],
      flag:this.$store.state.flag,
    }
  },
  created () {
  },
  mounted (){
  },
  methods: {
    selected:function(title){
      this.currentName=title
    },
  },
  components: {},
}
</script>
<style scoped>
header{
  border-bottom:1px solid #e5e5e5;
  width:100%;
  height: 53px;
  background: #fff;
}
.hph-navbar{
  background: #fff;
  border: none;
  margin-bottom: 6px;
}
.logo-link {
  padding: 4px 6px;
}
.logo-link img {
  /* padding: 4px 6px; */
  height: 100%;
}
.submenu-box:hover{
	border-bottom: 2px solid #34b8de;
}
.submenu-box>a{
  color:#525252!important;
  font-size: 1.6rem;
}
.df-active{
  border-bottom: 2px solid #34b8de;
}
.df-active>a{
	background-color: #fff!important;
  color:#34b8de!important;
}
</style>
