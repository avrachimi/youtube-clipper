<template>
  <div class="view-clip">
    <h1>View Youtube Clip</h1>
  </div>
</template>

<script>
const API_URL = 'http://localhost:3000/view/clips';

export default {
  name: 'viewClip',
  data: () => ({
    error: '',
    clips: [],
  }),

  mounted() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => {
        this.clips = result;
      });
  },
  methods: {},
};
</script>

<style>

</style>
