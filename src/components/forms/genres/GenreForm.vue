<template>
  <div class="container">
    <h1>Create New Style</h1>
    <form @submit.prevent="createStyle">
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" v-model="newStyle.styleName" required>
      </div>
      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="newStyle.styleDescription"></textarea>
      </div>
      <div>
        <label for="genres">Genres</label>
        <select id="genres" v-model="newStyle.styleGenres" multiple>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.genreName }}</option>
        </select>
      </div>
      <div>
        <label for="photo">Photo</label>
        <input type="file" id="photo" @change="handleFileUpload">
      </div>
      <button type="submit">Create</button>
      <button type="button" @click="$emit('cancel')">Cancel</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { IStyle } from '@/interfaces/genres/IStyle'
import { IGenre } from '@/interfaces/genres/IGenre'
import styleService from '@/services/genres/styleService'
import genreService from '@/services/genres/genreService'

export default defineComponent({
  name: 'StyleForm',
  emits: ['cancel', 'created'],
  setup (_, { emit }) {
    const newStyle = ref<Partial<IStyle>>({
      styleName: '',
      styleDescription: '',
      styleGenres: [],
      stylePhoto: ''
    })

    const genres = ref<IGenre[]>([])
    const selectedFile = ref<File | null>(null)

    const fetchGenres = async () => {
      try {
        genres.value = await genreService.getGenres()
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }

    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target.files && target.files[0]) {
        selectedFile.value = target.files[0]
      }
    }

    const createStyle = async () => {
      try {
        const formData = new FormData()
        formData.append('styleName', newStyle.value.styleName as string)
        formData.append('styleDescription', newStyle.value.styleDescription || '')
        newStyle.value.styleGenres?.forEach(genreId => formData.append('styleGenres', genreId.toString()))
        if (selectedFile.value) {
          formData.append('stylePhoto', selectedFile.value)
        }

        await styleService.createStyle(formData)
        // Emit created event to notify parent component
        emit('created')
      } catch (error) {
        console.error('Error creating style:', error)
      }
    }

    onMounted(() => {
      fetchGenres()
    })

    return {
      newStyle,
      genres,
      handleFileUpload,
      createStyle
    }
  }
})
</script>

<style scoped>
.container {
  margin: 20px;
}

form div {
  margin-bottom: 10px;
}

button {
  margin-right: 10px;
}
</style>
