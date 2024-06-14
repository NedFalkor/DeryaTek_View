<template>
  <div class="container">
    <!-- Conditionally render the list or the form based on showList and showCreateForm -->
    <SubGenreList v-if="showList" @selectSubGenre="selectSubGenre" @createNewSubGenre="showCreateForm = true" />
    <SubGenreForm v-else @cancel="showCreateForm = false" @created="onSubGenreCreated" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SubGenreList from '@/components/lists/genres/SubGenreList.vue'
import SubGenreForm from '@/components/forms/genres/SubGenreForm.vue'

export default defineComponent({
  name: 'SubGenreView',
  components: {
    SubGenreList,
    SubGenreForm
  },
  setup() {
    const showList = ref(true)
    const showCreateForm = ref(false)

    const selectSubGenre = (subGenre: any) => {
      console.log('Selected sub-genre:', subGenre)
      showList.value = false
    }

    const onSubGenreCreated = () => {
      showList.value = true
    }

    return {
      showList,
      showCreateForm,
      selectSubGenre,
      onSubGenreCreated
    }
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
