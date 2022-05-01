<template>
  <div id="app">
    <TheHeader />
    <div class="container">
      <ThePostList />
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import ThePostList from '@/components/ThePostList'
export default {
  name: 'App',
  components: { TheHeader, ThePostList }
}
</script>

<style>
#app {
  background-color: #e1e1e1;
}
.container {
  width: 80%;
  margin: 0 auto;
}
</style>
