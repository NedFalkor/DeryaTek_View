<template>
  <div class="container">
    <h1>Create New Venue</h1>
    <form @submit.prevent="createVenue">
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" v-model="newVenue.venueName" required>
      </div>
      <div>
        <label for="address">Address</label>
        <input type="text" id="address" v-model="newVenue.venueAddress" required>
      </div>
      <div>
        <label for="city">City</label>
        <input type="text" id="city" v-model="newVenue.venueCity" required>
      </div>
      <div>
        <label for="country">Country</label>
        <input type="text" id="country" v-model="newVenue.venueCountry" required>
      </div>
      <div>
        <label for="capacity">Capacity</label>
        <input type="number" id="capacity" v-model="newVenue.venueCapacity" required>
      </div>
      <button type="submit">Create</button>
      <button type="button" @click="$emit('cancel')">Cancel</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IVenue } from '@/interfaces/gigs/IVenue'
import venueService from '@/services/gigs/venueService'

export default defineComponent({
  name: 'VenueForm',
  emits: ['cancel', 'created'],
  setup (_, { emit }) {
    const newVenue = ref<Partial<IVenue>>({
      venueName: '',
      venueAddress: '',
      venueCity: '',
      venueCountry: '',
      venueCapacity: 0
    })

    const createVenue = async () => {
      try {
        const venueData: IVenue = {
          id: 0,
          venueName: newVenue.value.venueName as string,
          venueAddress: newVenue.value.venueAddress as string,
          venueCity: newVenue.value.venueCity as string,
          venueCountry: newVenue.value.venueCountry as string,
          venueCapacity: newVenue.value.venueCapacity as number
        }
        await venueService.createVenue(venueData)
        // Emit created event to notify parent component
        emit('created')
      } catch (error) {
        console.error('Error creating venue:', error)
      }
    }

    return {
      newVenue,
      createVenue
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
