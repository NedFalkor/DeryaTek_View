<template>
  <div class="container">
    <h1>Create New Tracklist</h1>
    <form @submit.prevent="createTracklist">
      <div>
        <label for="songNumber">Song Number</label>
        <input type="number" id="songNumber" v-model="newTracklist.songNumber" required>
      </div>
      <div>
        <label for="songTitle">Song Title</label>
        <input type="text" id="songTitle" v-model="newTracklist.songTitle" required>
      </div>
      <div>
        <label for="songDuration">Song Duration</label>
        <input type="text" id="songDuration" v-model="newTracklist.songDuration" required>
      </div>
      <div>
        <label for="side">Side</label>
        <select id="side" v-model="newTracklist.side" required>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
      </div>
      <button type="submit">Create</button>
      <button type="button" @click="$emit('cancel')">Cancel</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ITracklist } from '@/interfaces/records/ITracklist'
import tracklistService from '@/services/records/tracklistService'

export default defineComponent({
  name: 'TracklistForm',
  emits: ['cancel', 'created'],
  setup (_, { emit }) {
    const newTracklist = ref<Partial<ITracklist>>({
      songNumber: 0,
      songTitle: '',
      songDuration: '',
      side: 'A'
    })

    const createTracklist = async () => {
      try {
        const tracklistData: ITracklist = {
          songNumber: newTracklist.value.songNumber as number,
          songTitle: newTracklist.value.songTitle as string,
          songDuration: newTracklist.value.songDuration,
          side: newTracklist.value.side as 'A' | 'B'
        }
        await tracklistService.createTracklist(tracklistData)
        emit('created')
      } catch (error) {
        console.error('Error creating tracklist:', error)
      }
    }

    return {
      newTracklist,
      createTracklist
    }
  }
})
</script>

<style scoped>
.container {
  margin: 20px;
}

form div {
  margin-bottom: 10px;
}

button {
  margin-right: 10px;
}
</style>
