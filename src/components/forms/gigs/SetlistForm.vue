<template>
  <div class="container">
    <h1>Create New Setlist</h1>
    <form @submit.prevent="createSetlist">
      <div>
        <label for="gig">Gig ID</label>
        <input type="number" id="gig" v-model="newSetlist.gig" required>
      </div>
      <div>
        <label for="songNumber">Song Number</label>
        <input type="number" id="songNumber" v-model="newSetlist.songNumber" required>
      </div>
      <div>
        <label for="songTitle">Song Title</label>
        <input type="text" id="songTitle" v-model="newSetlist.songTitle" required>
      </div>
      <div>
        <label for="songDuration">Song Duration</label>
        <input type="text" id="songDuration" v-model="newSetlist.songDuration">
      </div>
      <div>
        <label for="albumName">Album Name</label>
        <input type="text" id="albumName" v-model="newSetlist.albumName">
      </div>
      <button type="submit">Create</button>
      <button type="button" @click="$emit('cancel')">Cancel</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ISetlist } from '@/interfaces/gigs/ISetlist'
import setlistService from '@/services/gigs/setlistService'

export default defineComponent({
  name: 'SetlistForm',
  emits: ['cancel', 'created'],
  setup (_, { emit }) {
    const newSetlist = ref<Partial<ISetlist>>({
      gig: 0,
      songNumber: 0,
      songTitle: '',
      songDuration: '',
      albumName: ''
    })

    const createSetlist = async () => {
      try {
        const setlistData: ISetlist = {
          id: 0,
          gig: newSetlist.value.gig as number,
          songNumber: newSetlist.value.songNumber as number,
          songTitle: newSetlist.value.songTitle as string,
          songDuration: newSetlist.value.songDuration,
          albumName: newSetlist.value.albumName
        }
        await setlistService.createSetlist(setlistData)
        // Emit created event to notify parent component
        emit('created')
      } catch (error) {
        console.error('Error creating setlist:', error)
      }
    }

    const goBack = () => {
      emit('cancel')
    }

    return {
      newSetlist,
      createSetlist
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
