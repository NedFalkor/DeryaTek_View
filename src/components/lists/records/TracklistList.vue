<template>
  <div class="container">
    <!-- Liste des pistes -->
    <div v-if="showList">
      <h1>Tracklists</h1>
      <ul>
        <li v-for="tracklist in tracklists" :key="tracklist.songNumber" @click="$emit('selectTracklist', tracklist)">
          <strong>{{ tracklist.songNumber }}. {{ tracklist.songTitle }}</strong>
        </li>
      </ul>
      <button class="button is-primary" @click="$emit('createNewTracklist')">Add New Tracklist</button>
    </div>

    <!-- Détails de la piste -->
    <div v-if="showDetail">
      <button @click="goBack">Back to List</button>
      <h1>{{ selectedTracklist?.songNumber }}. {{ selectedTracklist?.songTitle }}</h1>
      <p>Duration: {{ selectedTracklist?.songDuration || 'N/A' }}</p>
      <p>Side: {{ selectedTracklist?.side }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { ITracklist } from '@/interfaces/records/ITracklist'
import tracklistService from '@/services/records/tracklistService'

export default defineComponent({
  name: 'TracklistList',
  emits: ['selectTracklist', 'createNewTracklist'],
  setup () {
    const tracklists = ref<ITracklist[]>([])
    const selectedTracklist = ref<ITracklist | null>(null)
    const showList = ref(true)
    const showDetail = ref(false)

    const fetchTracklists = async () => {
      try {
        const data = await tracklistService.getTracklists()
        tracklists.value = data
      } catch (error) {
        console.error('Error fetching tracklists:', error)
      }
    }

    const selectTracklist = (tracklist: ITracklist) => {
      selectedTracklist.value = tracklist
      showList.value = false
      showDetail.value = true
    }

    const goBack = () => {
      showDetail.value = false
      showList.value = true
    }

    onMounted(() => {
      fetchTracklists()
    })

    return {
      tracklists,
      selectedTracklist,
      showList,
      showDetail,
      selectTracklist,
      goBack
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
