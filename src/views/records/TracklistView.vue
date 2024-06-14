<template>
  <div class="container">
    <!-- Conditionally render the list or the form based on showList and showCreateForm -->
    <TracklistList v-if="showList" @selectTracklist="selectTracklist" @createNewTracklist="showCreateForm = true" />
    <TracklistForm v-else @cancel="showCreateForm = false" @created="onTracklistCreated" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TracklistList from '@/components/lists/records/TracklistList.vue'
import TracklistForm from '@/components/forms/records/TracklistForm.vue'

export default defineComponent({
  name: 'TracklistView',
  components: {
    TracklistList,
    TracklistForm
  },
  setup() {
    const showList = ref(true)
    const showCreateForm = ref(false)

    const selectTracklist = (tracklist: any) => {
      console.log('Selected tracklist:', tracklist)
      showList.value = false
      showCreateForm.value = false
    }

    const onTracklistCreated = () => {
      showList.value = true
      showCreateForm.value = false
    }

    return {
      showList,
      showCreateForm,
      selectTracklist,
      onTracklistCreated
    }
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
