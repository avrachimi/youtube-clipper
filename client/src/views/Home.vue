<template>
  <div class="allClips">
    <hr>
    <div class="list-unstyled" v-for="clip in clips" :key="clip.id">
      <ol>
        <div>
          <a v-bind:href="'https://youtu.be/' + clip.youtubeId + '?t=' + clip.startTime" target="_blank">{{ clip._id }}</a>
        </div>
      </ol>
      <hr>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:3000/view/clips';

export default {
  name: 'home',
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
img {
  max-width: 300px;
  height: auto;
}
</style>
