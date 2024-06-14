<template>
  <div class="container">
    <!-- Conditionally render the list or the form based on showList and showCreateForm -->
    <FestivalList v-if="showList" @selectFestival="selectFestival" @createNewFestival="showCreateForm = true" />
    <FestivalForm v-else @cancel="showCreateForm = false" @created="onFestivalCreated" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import FestivalList from '@/components/lists/gigs/FestivalList.vue'
import FestivalForm from '@/components/forms/gigs/FestivalForm.vue'

export default defineComponent({
  name: 'FestivalView',
  components: {
    FestivalList,
    FestivalForm
  },
  setup() {
    const showList = ref(true)
    const showCreateForm = ref(false)

    const selectFestival = (festival: any) => {
      console.log('Selected festival:', festival)
      showList.value = false
    }

    const onFestivalCreated = () => {
      showList.value = true
    }

    return {
      showList,
      showCreateForm,
      selectFestival,
      onFestivalCreated
    }
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
