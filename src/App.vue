<template>
  <v-header/>
  <div class="container">
    <div class="container__inner">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="less">

</style>
<script>

import VHeader from './components/v-header.vue';

export default {
  components: { VHeader },
  mounted() {
    this.$store.dispatch('loadPostsList');
  },
};
</script>
