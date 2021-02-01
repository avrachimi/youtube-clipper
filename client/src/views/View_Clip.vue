<template>
  <div>
    <form @submit.prevent="showClip" class="mb-3">
        <div v-if="error" class="alert alert-dismissible alert-warning">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          <h4 class="alert-heading">Error!</h4>
          <p class="mb-0">{{error}}</p>
        </div>
        <div class="form-group">
          <label for="youtubeId">Clip ID: </label>
          <input
            v-model="clip.id"
            type="text"
            class="form-control"
            id="youtubeId" required>
        </div>
        <br>
        <button type="submit" class="btn btn-primary">View Clip</button>
      </form>
      <div>
        <br>
        <br>
        <template v-if="clip.youtubeURL != null">
          {{ this.clip }} <br>
          <a v-bind:href="clip.youtubeURL" target="_blank">Watch Clip</a>
          <youtube :video-id="videoId" :player-vars="{ autoplay: 1}"></youtube>
        </template>
      </div>
  </div>
</template>
<script>
import Vue from 'vue';
import VueYouTubeEmbed from 'vue-youtube-embed';

Vue.use(VueYouTubeEmbed, { global: false });

const API_URL = 'http://localhost:3000/clip/';

export default {
  name: 'viewClip',
  data: () => ({
    error: '',
    clip: {
      youtubeId: '',
      startTime: 0,
      duration: 0,
    },
  }),
  methods: {
    showClip() {
      fetch(API_URL + this.clip.id)
        .then((response) => response.json())
        .then((result) => {
          this.clip = result;
          this.videoId = this.clip.youtubeId;
          this.startTime = this.clip.startTime;
        });
    },
  },
};
</script>

<style>

</style>
