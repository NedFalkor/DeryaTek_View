<template>
  <div class="container">
    <h1>Create New Gig</h1>
    <form @submit.prevent="createGig">
      <div>
        <label for="band">Band</label>
        <select id="band" v-model="selectedBandId" required>
          <option v-for="band in bands" :key="band.id" :value="band.id">{{ band.bandName }}</option>
        </select>
      </div>
      <div>
        <label for="venue">Venue</label>
        <select id="venue" v-model="selectedVenueId" required>
          <option v-for="venue in venues" :key="venue.id" :value="venue.id">{{ venue.venueName }}</option>
        </select>
      </div>
      <div>
        <label for="date">Date</label>
        <input type="datetime-local" id="date" v-model="newGig.gigDate" required>
      </div>
      <div>
        <label for="ticket_price">Ticket Price</label>
        <input type="number" step="0.01" id="ticket_price" v-model="newGig.gigTicketPrice" required>
      </div>
      <div>
        <label for="link">Link</label>
        <input type="url" id="link" v-model="newGig.gigLink">
      </div>
      <div>
        <label for="additional_info">Additional Info</label>
        <textarea id="additional_info" v-model="newGig.gigAdditionalInfo"></textarea>
      </div>
      <button type="submit">Create</button>
      <button type="button" @click="$emit('cancel')">Cancel</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { IGig } from '@/interfaces/gigs/IGig'
import { IBand } from '@/interfaces/bands/IBand'
import { IVenue } from '@/interfaces/gigs/IVenue'
import gigService from '@/services/gigs/gigService'
import bandService from '@/services/bands/bandService'
import venueService from '@/services/gigs/venueService'

export default defineComponent({
  name: 'GigForm',
  emits: ['cancel', 'created'],
  setup (_, { emit }) {
    const newGig = ref<Partial<IGig>>({
      gigDate: '',
      gigTicketPrice: 0,
      gigLink: '',
      gigAdditionalInfo: ''
    })

    const selectedBandId = ref<number | null>(null)
    const selectedVenueId = ref<number | null>(null)

    const bands = ref<IBand[]>([])
    const venues = ref<IVenue[]>([])

    const fetchBands = async () => {
      try {
        bands.value = await bandService.getBands()
      } catch (error) {
        console.error('Error fetching bands:', error)
      }
    }

    const fetchVenues = async () => {
      try {
        venues.value = await venueService.getVenues()
      } catch (error) {
        console.error('Error fetching venues:', error)
      }
    }

    const createGig = async () => {
      try {
        if (!newGig.value.gigDate) {
          throw new Error('Gig date is required')
        }

        const selectedBand = bands.value.find(band => band.id === selectedBandId.value)
        const selectedVenue = venues.value.find(venue => venue.id === selectedVenueId.value)

        if (!selectedBand || !selectedVenue) {
          throw new Error('Band or Venue not found')
        }

        const gigData: IGig = {
          id: 0,
          band: selectedBand,
          venue: selectedVenue,
          gigDate: new Date(newGig.value.gigDate).toISOString(),
          gigTicketPrice: newGig.value.gigTicketPrice as number,
          gigLink: newGig.value.gigLink,
          gigAdditionalInfo: newGig.value.gigAdditionalInfo,
          setlist: []
        }

        await gigService.createGig(gigData)
        emit('created')
      } catch (error) {
        console.error('Error creating gig:', error)
      }
    }

    const goBack = () => {
      emit('cancel')
    }

    onMounted(() => {
      fetchBands()
      fetchVenues()
    })

    return {
      newGig,
      selectedBandId,
      selectedVenueId,
      bands,
      venues,
      createGig,
      goBack
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
