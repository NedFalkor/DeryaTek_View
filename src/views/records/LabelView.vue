<template>
  <div class="container">
    <!-- Conditionally render the list or the form based on showList and showCreateForm -->
    <LabelList v-if="showList" @selectLabel="selectLabel" @createNewLabel="showCreateForm = true" />
    <LabelForm v-else @cancel="showCreateForm = false" @created="onLabelCreated" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LabelList from '@/components/lists/records/LabelList.vue'
import LabelForm from '@/components/forms/records/LabelForm.vue'

export default defineComponent({
  name: 'LabelView',
  components: {
    LabelList,
    LabelForm
  },
  setup() {
    const showList = ref(true)
    const showCreateForm = ref(false)

    const selectLabel = (label: any) => {
      console.log('Selected label:', label)
      showList.value = false
    }

    const onLabelCreated = () => {
      showList.value = true
    }

    return {
      showList,
      showCreateForm,
      selectLabel,
      onLabelCreated
    }
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
