<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style scoped>
.about {
  font-size: 40px;
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  mounted() {
    const array: string[] = [[10], 40, 50, 60];
    console.log(array.flat());
  }
})
</script>