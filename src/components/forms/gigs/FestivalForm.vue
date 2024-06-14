<template>
  <div class="container">
    <h1>Create New Festival</h1>
    <form @submit.prevent="createFestival">
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" v-model="newFestival.festivalName" required>
      </div>
      <div>
        <label for="start_date">Start Date</label>
        <input type="date" id="start_date" v-model="newFestival.festivalStartDate" required>
      </div>
      <div>
        <label for="end_date">End Date</label>
        <input type="date" id="end_date" v-model="newFestival.festivalEndDate" required>
      </div>
      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="newFestival.festivalDescription"></textarea>
      </div>
      <div>
        <label for="link">Link</label>
        <input type="url" id="link" v-model="newFestival.festivalLink">
      </div>
      <div>
        <label for="ticket_price">Ticket Price</label>
        <input type="number" step="0.01" id="ticket_price" v-model="newFestival.festivalTicketPrice">
      </div>
      <div>
        <label for="venues">Venues</label>
        <select id="venues" v-model="newFestival.venues" multiple>
          <option v-for="venue in venues" :key="venue.id" :value="venue.id">{{ venue.venueName }}</option>
        </select>
      </div>
      <div>
        <label for="bands">Bands</label>
        <select id="bands" v-model="newFestival.bands" multiple>
          <option v-for="band in bands" :key="band.id" :value="band.id">{{ band.bandName }}</option>
        </select>
      </div>
      <button type="submit">Create</button>
      <button type="button" @click="$emit('cancel')">Cancel</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { IFestival } from '@/interfaces/gigs/IFestival'
import { IVenue } from '@/interfaces/gigs/IVenue'
import { IBand } from '@/interfaces/bands/IBand'
import festivalService from '@/services/gigs/festivalService'
import venueService from '@/services/gigs/venueService'
import bandService from '@/services/bands/bandService'

export default defineComponent({
  name: 'FestivalForm',
  emits: ['cancel', 'created'],
  setup (_, { emit }) {
    const newFestival = ref<Partial<IFestival>>({
      festivalName: '',
      festivalStartDate: '',
      festivalEndDate: '',
      festivalDescription: '',
      festivalLink: '',
      festivalTicketPrice: 0,
      venues: [], // Use correct property names
      bands: [] // Use correct property names
    })

    const venues = ref<IVenue[]>([])
    const bands = ref<IBand[]>([])

    const fetchVenues = async () => {
      try {
        venues.value = await venueService.getVenues()
      } catch (error) {
        console.error('Error fetching venues:', error)
      }
    }

    const fetchBands = async () => {
      try {
        bands.value = await bandService.getBands()
      } catch (error) {
        console.error('Error fetching bands:', error)
      }
    }

    const createFestival = async () => {
      try {
        const festivalData: IFestival = {
          id: 0,
          festivalName: newFestival.value.festivalName as string,
          festivalStartDate: newFestival.value.festivalStartDate as string,
          festivalEndDate: newFestival.value.festivalEndDate as string,
          festivalDescription: newFestival.value.festivalDescription || '',
          festivalLink: newFestival.value.festivalLink || '',
          festivalTicketPrice: newFestival.value.festivalTicketPrice as number,
          venues: newFestival.value.venues as number[], // Convert to number array
          bands: newFestival.value.bands as number[], // Convert to number array
          gig: [] // Assuming the gig field is an array, you need to define it properly
        }

        await festivalService.createFestival(festivalData)
        // Emit created event to notify parent component
        emit('created')
      } catch (error) {
        console.error('Error creating festival:', error)
      }
    }

    onMounted(() => {
      fetchVenues()
      fetchBands()
    })

    return {
      newFestival,
      venues,
      bands,
      createFestival
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
