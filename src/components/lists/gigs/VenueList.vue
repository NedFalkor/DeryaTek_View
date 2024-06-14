<template>
  <div class="container">
    <!-- List of venues -->
    <div v-if="showList">
      <h1>Venues List</h1>
      <ul>
        <li v-for="venue in venues" :key="venue.id" @click="$emit('selectVenue', venue)">
          <strong>{{ venue.venueName }}</strong> ({{ venue.venueCity }}, {{ venue.venueCountry }})
        </li>
      </ul>
      <button class="button is-primary" @click="$emit('createNewVenue')">Add New Venue</button>
    </div>

    <!-- Venue details -->
    <div v-if="showDetail">
      <button @click="goBack">Back to List</button>
      <h1>{{ selectedVenue?.venueName }}</h1>
      <p>Address: {{ selectedVenue?.venueAddress }}</p>
      <p>City: {{ selectedVenue?.venueCity }}</p>
      <p>Country: {{ selectedVenue?.venueCountry }}</p>
      <p>Capacity: {{ selectedVenue?.venueCapacity }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { IVenue } from '@/interfaces/gigs/IVenue'
import venueService from '@/services/gigs/venueService'

export default defineComponent({
  name: 'VenueList',
  emits: ['selectVenue', 'createNewVenue'],
  setup () {
    const venues = ref<IVenue[]>([])
    const selectedVenue = ref<IVenue | null>(null)
    const showList = ref(true)
    const showDetail = ref(false)

    const fetchVenues = async () => {
      try {
        const data = await venueService.getVenues()
        venues.value = data
      } catch (error) {
        console.error('Error fetching venues:', error)
      }
    }

    const selectVenue = (venue: IVenue) => {
      selectedVenue.value = venue
      showList.value = false
      showDetail.value = true
    }

    const goBack = () => {
      showDetail.value = false
      showList.value = true
    }

    onMounted(() => {
      fetchVenues()
    })

    return {
      venues,
      selectedVenue,
      showList,
      showDetail,
      selectVenue,
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
