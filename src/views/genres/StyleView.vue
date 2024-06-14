<template>
  <div class="container">
    <!-- Conditionally render the list or the form based on showList and showCreateForm -->
    <StyleList v-if="showList" @selectStyle="selectStyle" @createNewStyle="showCreateForm = true" />
    <StyleForm v-else @cancel="showCreateForm = false" @created="onStyleCreated" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import StyleList from '@/components/lists/genres/StyleList.vue'
import StyleForm from '@/components/forms/genres/StyleForm.vue'

export default defineComponent({
  name: 'StyleView',
  components: {
    StyleList,
    StyleForm
  },
  setup() {
    const showList = ref(true)
    const showCreateForm = ref(false)

    const selectStyle = (style: any) => {
      console.log('Selected style:', style)
      showList.value = false
    }

    const onStyleCreated = () => {
      showList.value = true
    }

    return {
      showList,
      showCreateForm,
      selectStyle,
      onStyleCreated
    }
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
