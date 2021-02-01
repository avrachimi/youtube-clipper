<template>
  <div>
    <form @submit.prevent="createClip" class="mb-3">
      <div v-if="error" class="alert alert-dismissible alert-warning">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4 class="alert-heading">Error!</h4>
        <p class="mb-0">{{error}}</p>
      </div>
      <div class="form-group">
        <label for="youtubeId">Youtube Video ID: </label>
        <input
          v-model="clip.youtubeId"
          type="text"
          class="form-control"
          id="youtubeId" required>
      </div>
      <div class="form-group">
        <label for="startTime">Start Time (seconds): </label>
        <input
          v-model="clip.startTime"
          type="number"
          name="startTime"
          class="form-control"
          id="startTime" required>
      </div>
      <div class="form-group">
        <label for="duration">Duration of Clip (seconds): </label>
        <input
          v-model="clip.duration"
          type="number"
          name="duration"
          class="form-control"
          id="duration" required>
      </div>
      <button type="submit" class="btn btn-primary">Create Clip</button>
    </form>
    <div>
      <template v-if="clip.youtubeId != ''">
        <!-- <a v-bind:href="'http://localhost:3000/' + clip._id" target="_blank">{{ 'http://localhost:3000/' + clip._id }}</a> -->
        <p>Your Clip ID is {{ this.clip._id }}</p>
      </template>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:3000/create';

export default {
  name: 'newClip',
  data: () => ({
    error: '',
    clip: {
      youtubeId: '',
      startTime: null,
      duration: null,
    },
  }),
  methods: {
    createClip() {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          youtubeId: this.clip.youtubeId.toString(),
          startTime: this.clip.startTime,
          duration: this.clip.duration,
        }),
      };

      fetch(API_URL, requestOptions)
        .then(async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }

          this.clip = data;
          return data;
        })
        .catch((error) => {
          this.errorMessage = error;
          // eslint-disable-next-line
          console.error('There was an error!', error);
        });
    },
  },
};
</script>

<style>

</style>
