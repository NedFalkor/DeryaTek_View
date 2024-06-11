<template>
  <div class="container">
    <div v-if="showCreate">
      <h1 class="title">Create New Band</h1>
      <form @submit.prevent="createBand">
        <div class="field">
          <label class="label" for="name">Name</label>
          <div class="control">
            <input class="input" type="text" id="name" v-model="newBand.band_name">
          </div>
        </div>
        <div class="field">
          <label class="label" for="country">Country</label>
          <div class="control">
            <input class="input" type="text" id="country" v-model="newBand.band_country">
          </div>
        </div>
        <div class="field">
          <label class="label" for="formed_in">Formed In</label>
          <div class="control">
            <input class="input" type="number" id="formed_in" v-model="newBand.band_formed_in">
          </div>
        </div>
        <div class="field">
          <label class="label" for="description">Description</label>
          <div class="control">
            <textarea class="textarea" id="description" v-model="newBand.band_description"></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label" for="genre">Genre</label>
          <div class="control">
            <div class="select">
              <select id="genre" v-model="newBand.band_genre">
                <option v-for="genre in genres" :key="genre.id" :value="genre">{{ genre.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label" for="status">Status</label>
          <div class="control">
            <div class="select">
              <select id="status" v-model="newBand.band_status">
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
            <input class="input" type="date" id="separation_date" v-model="newBand.band_separation_date">
          </div>
        </div>
        <div class="field">
          <label class="label" for="members">Members</label>
          <div class="control">
            <div class="select is-multiple">
              <select id="members" v-model="newBand.band_members" multiple>
                <option v-for="member in band_members" :key="member.id" :value="member">{{ member.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" type="submit">Create</button>
          </div>
          <div class="control">
            <button class="button is-link is-light" @click="goBack">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import bandService from '@/services/bands/bandService'
import { IBand } from '@/interfaces/bands/IBand'
import { IGenre } from '@/interfaces/genres/IGenre'
import { IBandMember } from '@/interfaces/bands/IBandMember'

export default defineComponent({
  data () {
    return {
      genres: [] as IGenre[],
      band_members: [] as IBandMember[],
      newBand: {
        band_name: '',
        band_country: '',
        band_formed_in: 0,
        band_description: '',
        band_genre: {} as IGenre,
        band_status: 'active',
        band_separation_date: '',
        band_members: [] as IBandMember[]
      },
      showCreate: true
    }
  },
  methods: {
    fetchGenres () {
      fetch('/api/genres/')
        .then(response => response.json())
        .then(data => {
          this.genres = data
        })
    },
    fetchBandMembers () {
      fetch('/api/bandmembers/')
        .then(response => response.json())
        .then(data => {
          this.band_members = data
        })
    },
    createBand () {
      const bandPayload: Partial<IBand> = {
        ...this.newBand,
        band_genre: this.newBand.band_genre.id,
        band_members: this.newBand.band_members.map(member => member.id)
      }
      bandService.createBand(bandPayload as IBand).then(() => {
        console.log('Band created successfully')
        this.goBack()
      }).catch(error => {
        console.error('Error creating band:', error)
      })
    },
    goBack () {
      console.log('Going back to the list')
      this.$emit('back')
    }
  },
  created () {
    this.fetchGenres()
    this.fetchBandMembers()
  }
})
</script>

<style>
@import '../../../../node_modules/bulma/css/bulma.css';
.container {
  padding: 20px;
}
</style>
