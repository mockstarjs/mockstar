<template>
  <div class="page-home">
    <Navbar/>

    <div class="main-wrapper">
      <Banner />
      <Feature />
      <AdvantageOne />
      <AdvantageTwo />
      <Community />
    </div>

    <Footer/>
  </div>
</template>

<script>
import Navbar from './Navbar';
import Banner from './page-home/Banner';
import Feature from './page-home/Feature';
import AdvantageOne from './page-home/AdvantageOne';
import AdvantageTwo from './page-home/AdvantageTwo';
import Community from './Community';
import Links from './Links';
import Copyright from './Copyright';
import Footer from './Footer';

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
    Footer,
    AdvantageOne,
    AdvantageTwo
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
