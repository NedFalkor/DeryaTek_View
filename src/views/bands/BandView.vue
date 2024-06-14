<template>
  <div class="container">
    <!-- Conditionally render the list or the form based on showList and showCreateForm -->
    <BandList v-if="showList" @selectBand="selectBand" @createNewBand="showCreateForm = true" />
    <BandForm v-else @cancel="showCreateForm = false" @created="onBandCreated" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BandList from '@/components/lists/bands/BandList.vue'
import BandForm from '@/components/forms/bands/BandForm.vue'

export default defineComponent({
  name: 'BandView',
  components: {
    BandList,
    BandForm
  },
  setup() {
    const showList = ref(true)
    const showCreateForm = ref(false)

    const selectBand = (band: any) => {
      console.log('Selected band:', band)
      showList.value = false
    }

    const onBandCreated = () => {
      showList.value = true
    }

    return {
      showList,
      showCreateForm,
      selectBand,
      onBandCreated
    }
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
