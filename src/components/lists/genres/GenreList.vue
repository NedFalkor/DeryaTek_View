<template>
  <div class="container">
    <h1>Genres List</h1>
    <ul>
      <li v-for="genre in genres" :key="genre.id" @click="$emit('selectGenre', genre)">
        <strong>{{ genre.genre_name }}</strong>
      </li>
    </ul>
    <button class="button is-primary" @click="$emit('createNewGenre')">Add New Genre</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { IGenre } from '@/interfaces/genres/IGenre'
import genreService from '@/services/genres/genreService'

export default defineComponent({
  name: 'GenreList',
  emits: ['selectGenre', 'createNewGenre'],
  setup () {
    const genres = ref<IGenre[]>([])

    const fetchGenres = async () => {
      try {
        const data = await genreService.getGenres()
        genres.value = data
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }

    onMounted(() => {
      fetchGenres()
    })

    return {
      genres
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
