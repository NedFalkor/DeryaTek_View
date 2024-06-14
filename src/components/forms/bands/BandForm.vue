<template>
  <div class="container">
    <h1 class="title">Create New Band</h1>
    <form @submit.prevent="createBand">
      <div class="field">
        <label class="label" for="name">Name</label>
        <div class="control">
          <input class="input" type="text" id="name" v-model="newBand.bandName">
        </div>
      </div>
      <div class="field">
        <label class="label" for="country">Country</label>
        <div class="control">
          <input class="input" type="text" id="country" v-model="newBand.bandCountry">
        </div>
      </div>
      <div class="field">
        <label class="label" for="formed_in">Formed In</label>
        <div class="control">
          <input class="input" type="number" id="formed_in" v-model="newBand.bandFormedIn">
        </div>
      </div>
      <div class="field">
        <label class="label" for="description">Description</label>
        <div class="control">
          <textarea class="textarea" id="description" v-model="newBand.bandDescription"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label" for="genre">Genre</label>
        <div class="control">
          <div class="select">
            <select id="genre" v-model="newBand.genreId">
              <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.genreName }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label" for="status">Status</label>
        <div class="control">
          <div class="select">
            <select id="status" v-model="newBand.bandStatus">
              <option value="active">Active</option>
              <option value="hiatus">On Hiatus</option>
              <option value="split_up">Split Up</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label" for="separation_date">Separation Date</label>
        <div class="control">
          <input class="input" type="date" id="separation_date" v-model="newBand.bandSeparationDate">
        </div>
      </div>
      <div class="field">
        <label class="label" for="members">Members</label>
        <div class="control">
          <div class="select is-multiple">
            <select id="members" v-model="newBand.memberIds" multiple>
              <option v-for="member in bandMembers" :key="member.id" :value="member.id">{{ member.bandMemberFirstName }} {{ member.bandMemberLastName }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" type="submit">Create</button>
        </div>
        <div class="control">
          <button class="button is-link is-light" @click="$emit('cancel')">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import bandService from '@/services/bands/bandService'
import { IBand } from '@/interfaces/bands/IBand'
import { IGenre } from '@/interfaces/genres/IGenre'
import { IBandMember } from '@/interfaces/bands/IBandMember'

export default defineComponent({
  name: 'BandForm',
  emits: ['cancel', 'created'],
  setup (_, { emit }) {
    const newBand = ref<Partial<IBand & { genreId: number, memberIds: number[] }>>({
      bandName: '',
      bandCountry: '',
      bandFormedIn: 0,
      bandDescription: '',
      genreId: 0,
      bandStatus: 'active',
      bandSeparationDate: '',
      memberIds: []
    })

    const genres = ref<IGenre[]>([])
    const bandMembers = ref<IBandMember[]>([])

    const fetchGenres = async () => {
      try {
        const data = await bandService.getGenres()
        genres.value = data
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }

    const fetchBandMembers = async () => {
      try {
        const data = await bandService.getBandMembers()
        bandMembers.value = data
      } catch (error) {
        console.error('Error fetching band members:', error)
      }
    }

    const createBand = async () => {
      try {
        const bandPayload: Partial<IBand> = {
          ...newBand.value,
          bandGenre: [{ id: newBand.value.genreId }] as IGenre[],
          bandMembers: newBand.value.memberIds?.map(id => ({ id } as IBandMember)) || []
        }
        await bandService.createBand(bandPayload as IBand)
        emit('created')
      } catch (error) {
        console.error('Error creating band:', error)
      }
    }

    onMounted(() => {
      fetchGenres()
      fetchBandMembers()
    })

    return {
      newBand,
      genres,
      bandMembers,
      createBand
    }
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
