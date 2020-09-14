<template>
  <div class="page-home">
    <Navbar/>

    <div class="main-wrapper">
      <Banner />
    </div>

    <div class="layout__community">
      <Community />
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar';
import Banner from './page-home/Banner';
import Feature from './Feature';
import Community from './Community';
import Links from './Links';
import Copyright from './Copyright';

import Vue from 'vue';
import VueParticles from 'vue-particles';

Vue.use(VueParticles);

export default {
  components: {
    Navbar,
    Banner,
    Feature,
    Community,
    Links,
    Copyright,
  },
};
</script>

<style lang="less" scoped>
@import '../styles/content.less';

body {
  background-color: #f9f9f9;
}

.theme-container {
  background-color: #f9f9f9;
}

.main-wrapper{
  flex: 1 0 auto;
  margin-top: 100px;
}
</style>
