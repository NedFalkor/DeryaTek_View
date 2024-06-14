<template>
  <div class="container">
    <h1>Setlists List</h1>
    <ul>
      <li v-for="setlist in setlists" :key="setlist.id" @click="$emit('selectSetlist', setlist)">
        <strong>{{ setlist.songNumber }}. {{ setlist.songTitle }}</strong>
      </li>
    </ul>
    <button class="button is-primary" @click="$emit('createNewSetlist')">Add New Setlist</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { ISetlist } from '@/interfaces/gigs/ISetlist'
import setlistService from '@/services/gigs/setlistService'

export default defineComponent({
  name: 'SetlistList',
  emits: ['selectSetlist', 'createNewSetlist'],
  setup () {
    const setlists = ref<ISetlist[]>([])

    const fetchSetlists = async () => {
      try {
        const data = await setlistService.getSetlists()
        setlists.value = data
      } catch (error) {
        console.error('Error fetching setlists:', error)
      }
    }

    onMounted(() => {
      fetchSetlists()
    })

    return {
      setlists
    }
  }
})
</script>

<style scoped>
.container {
  margin: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  margin: 5px 0;
  padding: 10px;
  background: #f4f4f4;
  border: 1px solid #ddd;
}

li:hover {
  background: #e4e4e4;
}

h1 {
  margin-bottom: 20px;
}
</style>
