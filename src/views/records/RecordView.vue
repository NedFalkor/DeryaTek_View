<template>
  <div class="container">
    <!-- Conditional rendering for form and list -->
    <RecordForm v-if="showForm" @cancel="showForm = false" @created="onRecordCreated" />
    <RecordList v-else @selectRecord="onRecordSelected" @createNewRecord="showForm = true" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import RecordForm from '@/components/forms/records/RecordForm.vue'
import RecordList from '@/components/lists/records/RecordList.vue'

export default defineComponent({
  name: 'RecordView',
  components: {
    RecordForm,
    RecordList
  },
  setup () {
    const showForm = ref(false)

    const onRecordCreated = () => {
      showForm.value = false
    }

    const onRecordSelected = (record: any) => {
      // handle record selection
    }

    return {
      showForm,
      onRecordCreated,
      onRecordSelected
    }
  }
})
</script>

<style scoped>
.container {
  margin: 20px;
}
</style>
