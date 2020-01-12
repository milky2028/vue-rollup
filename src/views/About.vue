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
    console.log('About it');
    console.log('bird' + 1);
    const array: string[] = ['weird'];
    console.log(array.flat());
    console.log(environment.prop1);
    const w = new Worker('../worker/worker.ts');
    w.postMessage('hey!');
  }
});
</script>
