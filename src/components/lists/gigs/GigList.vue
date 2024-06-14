<template>
  <div class="container">
    <h1>Gigs List</h1>
    <ul>
      <li v-for="gig in gigs" :key="gig.id" @click="$emit('selectGig', gig)">
        <strong>{{ gig.band.bandName }}</strong> at <strong>{{ gig.venue.venueName }}</strong> on <span>{{ formatDate(gig.gigDate) }}</span>
      </li>
    </ul>
    <button class="button is-primary" @click="$emit('createNewGig')">Add New Gig</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { IGig } from '@/interfaces/gigs/IGig'
import gigService from '@/services/gigs/gigService'

export default defineComponent({
  name: 'GigList',
  emits: ['selectGig', 'createNewGig'],
  setup () {
    const gigs = ref<IGig[]>([])

    const fetchGigs = async () => {
      try {
        const data = await gigService.getGigs()
        gigs.value = data
      } catch (error) {
        console.error('Error fetching gigs:', error)
      }
    }

    const formatDate = (dateString: string | undefined) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleString()
    }

    onMounted(() => {
      fetchGigs()
    })

    return {
      gigs,
      formatDate
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
