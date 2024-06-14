<template>
  <div class="container">
    <h1>Create New Label</h1>
    <form @submit.prevent="createLabel">
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" v-model="newLabel.labelName" required>
      </div>
      <div>
        <label for="address">Address</label>
        <input type="text" id="address" v-model="newLabel.labelAddress">
      </div>
      <div>
        <label for="country">Country</label>
        <input type="text" id="country" v-model="newLabel.labelCountry">
      </div>
      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="newLabel.labelDescription"></textarea>
      </div>
      <div>
        <label for="founding_date">Founding Date</label>
        <input type="date" id="founding_date" v-model="newLabel.labelFoundingDate">
      </div>
      <div>
        <label for="phone_number">Phone Number</label>
        <input type="text" id="phone_number" v-model="newLabel.labelPhoneNumber">
      </div>
      <div>
        <label for="postal_code">Postal Code</label>
        <input type="text" id="postal_code" v-model="newLabel.labelPostalCode">
      </div>
      <div>
        <label for="status">Status</label>
        <select id="status" v-model="newLabel.labelStatus">
          <option value="Actif">Actif</option>
          <option value="Inactif">Inactif</option>
          <option value="Temporairement indisponible">Temporairement indisponible</option>
        </select>
      </div>
      <div>
        <label for="genres">Genres</label>
        <select id="genres" v-model="newLabel.labelGenres" multiple>
          <option v-for="genre in genres" :key="genre.id" :value="genre">{{ genre.name }}</option>
        </select>
      </div>
      <div>
        <label for="sub_genres">Sub-Genres</label>
        <select id="sub_genres" v-model="newLabel.labelSubGenres" multiple>
          <option v-for="subGenre in subGenres" :key="subGenre.id" :value="subGenre">{{ subGenre.name }}</option>
        </select>
      </div>
      <div>
        <label for="styles">Styles</label>
        <select id="styles" v-model="newLabel.labelStyles" multiple>
          <option v-for="style in styles" :key="style.id" :value="style">{{ style.name }}</option>
        </select>
      </div>
      <button type="submit">Create</button>
      <button type="button" @click="goBack">Cancel</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { ILabel } from '@/interfaces/records/ILabel'
import { IGenre } from '@/interfaces/genres/IGenre'
import { ISubGenre } from '@/interfaces/genres/ISubGenre'
import { IStyle } from '@/interfaces/genres/IStyle'
import genreService from '@/services/genres/genreService'
import subGenreService from '@/services/genres/subGenreService'
import styleService from '@/services/genres/styleService'
import labelService from '@/services/records/labelService'

export default defineComponent({
  name: 'LabelForm',
  emits: ['cancel', 'created'],
  setup (_, { emit }) {
    const newLabel = ref<Partial<ILabel>>({
      labelName: '',
      labelAddress: '',
      labelCountry: '',
      labelDescription: '',
      labelFoundingDate: '',
      labelPhoneNumber: '',
      labelPostalCode: '',
      labelStatus: 'Actif',
      labelGenres: [],
      labelSubGenres: [],
      labelStyles: []
    })

    const genres = ref<IGenre[]>([])
    const subGenres = ref<ISubGenre[]>([])
    const styles = ref<IStyle[]>([])

    const fetchGenres = async () => {
      try {
        genres.value = await genreService.getGenres()
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }

    const fetchSubGenres = async () => {
      try {
        subGenres.value = await subGenreService.getSubGenres()
      } catch (error) {
        console.error('Error fetching sub-genres:', error)
      }
    }

    const fetchStyles = async () => {
      try {
        styles.value = await styleService.getStyles()
      } catch (error) {
        console.error('Error fetching styles:', error)
      }
    }

    const createLabel = async () => {
      try {
        const labelData: ILabel = {
          id: 0, // This will be ignored by the backend
          labelName: newLabel.value.labelName as string,
          labelAddress: newLabel.value.labelAddress,
          labelCountry: newLabel.value.labelCountry,
          labelDescription: newLabel.value.labelDescription,
          labelFoundingDate: newLabel.value.labelFoundingDate,
          labelPhoneNumber: newLabel.value.labelPhoneNumber,
          labelPostalCode: newLabel.value.labelPostalCode,
          labelStatus: newLabel.value.labelStatus as 'Actif' | 'Inactif' | 'Temporairement indisponible',
          labelGenres: newLabel.value.labelGenres as IGenre[],
          labelSubGenres: newLabel.value.labelSubGenres as ISubGenre[],
          labelStyles: newLabel.value.labelStyles as IStyle[]
        }
        await labelService.createLabel(labelData)
        emit('created')
      } catch (error) {
        console.error('Error creating label:', error)
      }
    }

    const goBack = () => {
      emit('cancel')
    }

    onMounted(() => {
      fetchGenres()
      fetchSubGenres()
      fetchStyles()
    })

    return {
      newLabel,
      genres,
      subGenres,
      styles,
      createLabel,
      goBack
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
