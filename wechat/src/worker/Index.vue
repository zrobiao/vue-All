<template>
    <div class="Main">
        <router-view></router-view>
        <v-footer></v-footer>
    </div>
</template>
<script>
import vFooter from './common/Footer.vue';
export default {
    components: {
      vFooter
    }
  }
</script>