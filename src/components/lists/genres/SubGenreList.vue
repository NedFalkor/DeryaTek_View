<template>
  <div class="container">
    <h1>Sub-Genres List</h1>
    <ul>
      <li v-for="subGenre in subGenres" :key="subGenre.id" @click="$emit('selectSubGenre', subGenre)">
        <strong>{{ subGenre.subGenreName }}</strong>
      </li>
    </ul>
    <button class="button is-primary" @click="$emit('createNewSubGenre')">Add New Sub-Genre</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { ISubGenre } from '@/interfaces/genres/ISubGenre'
import subGenreService from '@/services/genres/subGenreService'

export default defineComponent({
  name: 'SubGenreList',
  emits: ['selectSubGenre', 'createNewSubGenre'],
  setup () {
    const subGenres = ref<ISubGenre[]>([])

    const fetchSubGenres = async () => {
      try {
        const data = await subGenreService.getSubGenres()
        subGenres.value = data
      } catch (error) {
        console.error('Error fetching sub-genres:', error)
      }
    }

    onMounted(() => {
      fetchSubGenres()
    })

    return {
      subGenres
    }
  }
})
</script>

<style scoped>
.container {
  margin: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  margin: 5px 0;
  padding: 10px;
  background: #f4f4f4;
  border: 1px solid #ddd;
}

li:hover {
  background: #e4e4e4;
}

h1 {
  margin-bottom: 20px;
}
</style>
