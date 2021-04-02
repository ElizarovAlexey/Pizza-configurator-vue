<template>
  <div id="app">
    <Nav/>
    <router-view/>
    <Footer/>
  </div>
</template>

<style>
  @import 'assets/css/style.css';
</style>

<script>
import Nav from "./components/Nav";
import Footer from "./components/Footer";
export default {
  components: {Footer, Nav}
}
</script>