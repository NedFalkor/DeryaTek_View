<template>
  <div class="container">
    <!-- Conditionally render the list or the form based on showList and showCreateForm -->
    <InstrumentList v-if="showList" @selectInstrument="selectInstrument" @createNewInstrument="showCreateForm = true" />
    <InstrumentForm v-else @cancel="showCreateForm = false" @created="onInstrumentCreated" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import InstrumentList from '@/components/lists/bands/InstrumentList.vue'
import InstrumentForm from '@/components/forms/bands/InstrumentForm.vue'

export default defineComponent({
  name: 'InstrumentView',
  components: {
    InstrumentList,
    InstrumentForm
  },
  setup () {
    const showList = ref(true)
    const showCreateForm = ref(false)

    const selectInstrument = (instrument: any) => {
      console.log('Selected instrument:', instrument)
      showList.value = false
    }

    const onInstrumentCreated = () => {
      showList.value = true
    }

    return {
      showList,
      showCreateForm,
      selectInstrument,
      onInstrumentCreated
    }
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
