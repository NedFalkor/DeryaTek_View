<template>
  <div class="container">
    <!-- Conditionally render the list or the form based on showList and showCreateForm -->
    <GigList v-if="showList" @selectGig="selectGig" @createNewGig="showCreateForm = true" />
    <GigForm v-else @cancel="showCreateForm = false" @created="onGigCreated" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import GigList from '@/components/lists/gigs/GigList.vue'
import GigForm from '@/components/forms/gigs/GigForm.vue'

export default defineComponent({
  name: 'GigView',
  components: {
    GigList,
    GigForm
  },
  setup() {
    const showList = ref(true)
    const showCreateForm = ref(false)

    const selectGig = (gig: any) => {
      console.log('Selected gig:', gig)
      showList.value = false
    }

    const onGigCreated = () => {
      showList.value = true
    }

    return {
      showList,
      showCreateForm,
      selectGig,
      onGigCreated
    }
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
