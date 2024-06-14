<template>
  <div class="container">
    <!-- Conditionally render the list or the form based on showList and showCreateForm -->
    <VenueList v-if="showList" @selectVenue="selectVenue" @createNewVenue="showCreateForm = true" />
    <VenueForm v-else @cancel="showCreateForm = false" @created="onVenueCreated" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VenueList from '@/components/lists/gigs/VenueList.vue'
import VenueForm from '@/components/forms/gigs/VenueForm.vue'

export default defineComponent({
  name: 'VenueView',
  components: {
    VenueList,
    VenueForm
  },
  setup() {
    const showList = ref(true)
    const showCreateForm = ref(false)

    const selectVenue = (venue: any) => {
      console.log('Selected venue:', venue)
      showList.value = false
    }

    const onVenueCreated = () => {
      showList.value = true
    }

    return {
      showList,
      showCreateForm,
      selectVenue,
      onVenueCreated
    }
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
