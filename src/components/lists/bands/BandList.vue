<template>
  <div class="container">
    <!-- Liste des groupes -->
    <div v-if="showList">
      <h1 class="title">Bands List</h1>
      <ul>
        <li v-for="band in bands" :key="band.id" @click="selectBand(band)">
          <strong>{{ band.bandName }}</strong>
        </li>
      </ul>
      <button class="button is-primary" @click="showCreateForm()">Add New Band</button>
    </div>

    <!-- Détails du groupe -->
    <div v-if="showDetail">
      <button class="button is-link" @click="goBack()">Back to List</button>
      <h1 class="title">{{ selectedBand.bandName }}</h1>
      <p><strong>Country:</strong> {{ selectedBand.bandCountry }}</p>
      <p><strong>Formed In:</strong> {{ selectedBand.bandFormedIn }}</p>
      <p><strong>Description:</strong> {{ selectedBand.bandDescription }}</p>
      <p><strong>Genre:</strong> {{ selectedBand.bandGenre.name }}</p>
      <p><strong>Status:</strong> {{ selectedBand.bandStatus }}</p>
      <p v-if="selectedBand.bandSeparationDate"><strong>Separation Date:</strong> {{ selectedBand.bandSeparationDate }}</p>
      <p><strong>Members:</strong> {{ selectedBand.bandMembers.map(member => member.name).join(', ') }}</p>
      <img :src="selectedBand.bandPhoto" alt="Band Photo" v-if="selectedBand.bandPhoto">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import bandService from '@/services/bands/bandService'
import { IBand } from '@/interfaces/bands/IBand'

export default defineComponent({
  data () {
    return {
      bands: [] as IBand[],
      showList: true
    }
  },
  methods: {
    fetchBands () {
      bandService.getBands().then((data: { id: number; bandName: string; bandCountry: string; bandFormedIn: number;
        bandDescription: string; bandGenre: { id: number; genreName: string; genreDescription: string;
          genrePhoto?: string | undefined }[]; bandMembers: { id: number; bandMemberFirstName: string;
            bandMemberLastName?: string | undefined; bandMemberBirthCity: string;
            bandMemberBirthCountry?: string | undefined; bandMemberNationality?: string | undefined;
            bandMemberBirthYear: number; bandMemberDeathYear?: number | undefined; bandMemberInstruments: { id: number;
              instrumentName: string; instrumentDescription?: string | undefined;
              instrumentCategory?: 'wind' | 'strings' | 'percussion' | 'electronic' | 'keyboard' | 'brass' | 'woodwind' | 'vocal' | undefined }[];
            bandMemberPhoto?: string | undefined }[]; bandPhoto?: string | undefined; bandStatus: 'active' | 'hiatus' | 'split_up';
            bandSeparationDate?: string | undefined }[]) => {
        this.bands = data
      }).catch((error: any) => {
        console.error('Error fetching bands:', error)
      })
    },
    selectBand (band: IBand) {
      console.log('Selected band:', band)
    },
    showCreateForm () {
      console.log('Show create form')
    }
  },
  created () {
    this.fetchBands()
  }
})
</script>

<style>
@import '../../../../node_modules/bulma/css/bulma.css';
.container {
  padding: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}
li:hover {
  background-color: #f0f0f0;
}
.button {
  margin-top: 20px;
}
</style>
