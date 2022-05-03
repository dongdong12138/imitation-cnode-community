<template>
  <div id="app">
    <TheHeader />
    <div class="container">
      <router-view name="slideBar"></router-view>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'

export default {
  name: 'App',
  components: { TheHeader }
}
</script>

<style>
* { margin: 0; padding: 0; }
#app {
  min-width: 1000px;
  background-color: #e1e1e1;
}
.container {
  width: 80%;
  margin: 0 auto;
  padding-bottom: 20px;
}
</style>
