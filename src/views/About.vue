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
import Vue from 'vue';
import environment from '../environment';

export default Vue.extend({
  mounted() {
    const array: string[] = ['weird'];
    console.log(array.flat());
    console.log(environment.prop);
  }
});
</script>
