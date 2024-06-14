<template>
  <div class="container">
    <!-- Conditionally render the list or the form based on showList and showCreateForm -->
    <SetlistList v-if="showList" @selectSetlist="selectSetlist" @createNewSetlist="showCreateForm = true" />
    <SetlistForm v-else @cancel="showCreateForm = false" @created="onSetlistCreated" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SetlistList from '@/components/lists/gigs/SetlistList.vue'
import SetlistForm from '@/components/forms/gigs/SetlistForm.vue'

export default defineComponent({
  name: 'SetlistView',
  components: {
    SetlistList,
    SetlistForm
  },
  setup() {
    const showList = ref(true)
    const showCreateForm = ref(false)

    const selectSetlist = (setlist: any) => {
      console.log('Selected setlist:', setlist)
      showList.value = false
    }

    const onSetlistCreated = () => {
      showList.value = true
    }

    return {
      showList,
      showCreateForm,
      selectSetlist,
      onSetlistCreated
    }
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
