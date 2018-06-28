<template>
    <div class="Main">
        <v-header></v-header>
        <router-view></router-view>
    </div>
</template>
<script>
import vHeader from './common/Header.vue';
export default {
    components: {
      vHeader    
    }
  }
</script>