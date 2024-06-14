<template>
  <div class="container">
    <!-- Conditionally render the list or the form based on showList and showCreateForm -->
    <GenreList v-if="showList" @selectGenre="selectGenre" @createNewGenre="showCreateForm = true" />
    <GenreForm v-else @cancel="showCreateForm = false" @created="onGenreCreated" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import GenreList from '@/components/lists/genres/GenreList.vue'
import GenreForm from '@/components/forms/genres/GenreForm.vue'

export default defineComponent({
  name: 'GenreView',
  components: {
    GenreList,
    GenreForm
  },
  setup () {
    const showList = ref(true)
    const showCreateForm = ref(false)

    const selectGenre = (genre: any) => {
      console.log('Selected genre:', genre)
      showList.value = false
    }

    const onGenreCreated = () => {
      showList.value = true
    }

    return {
      showList,
      showCreateForm,
      selectGenre,
      onGenreCreated
    }
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
