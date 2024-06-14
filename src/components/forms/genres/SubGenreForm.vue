<template>
  <div class="container">
    <h1>Create New Sub-Genre</h1>
    <form @submit.prevent="createSubGenre">
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" v-model="newSubGenre.subGenreName" required>
      </div>
      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="newSubGenre.subGenreDescription"></textarea>
      </div>
      <div>
        <label for="styles">Styles</label>
        <select id="styles" v-model="newSubGenre.subGenreStyles" multiple>
          <option v-for="style in styles" :key="style.id" :value="style.id">{{ style.styleName }}</option>
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
import { ISubGenre } from '@/interfaces/genres/ISubGenre'
import { IStyle } from '@/interfaces/genres/IStyle'
import styleService from '@/services/genres/styleService'
import subGenreService from '@/services/genres/subGenreService'

export default defineComponent({
  name: 'SubGenreForm',
  emits: ['cancel', 'created'],
  setup (_, { emit }) {
    const newSubGenre = ref<Partial<ISubGenre>>({
      subGenreName: '',
      subGenreDescription: '',
      subGenreStyles: [],
      subGenrePhoto: ''
    })

    const styles = ref<IStyle[]>([])

    const fetchStyles = async () => {
      try {
        styles.value = await styleService.getStyles()
      } catch (error) {
        console.error('Error fetching styles:', error)
      }
    }

    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target.files && target.files[0]) {
        const file = target.files[0]
        newSubGenre.value.subGenrePhoto = URL.createObjectURL(file)
      }
    }

    const createSubGenre = async () => {
      try {
        const formData = new FormData()
        formData.append('subGenreName', newSubGenre.value.subGenreName as string)
        formData.append('subGenreDescription', newSubGenre.value.subGenreDescription as string)
        newSubGenre.value.subGenreStyles?.forEach(styleId => formData.append('subGenreStyles', styleId.toString()))
        if (newSubGenre.value.subGenrePhoto) {
          formData.append('subGenrePhoto', newSubGenre.value.subGenrePhoto)
        }

        await subGenreService.createSubGenre(formData)
        // Emit created event to notify parent component
        emit('created')
      } catch (error) {
        console.error('Error creating sub-genre:', error)
      }
    }

    onMounted(() => {
      fetchStyles()
    })

    return {
      newSubGenre,
      styles,
      handleFileUpload,
      createSubGenre
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
