<template>
  <div class="container">
    <div class="box">
      <h1 class="title">Create New Record</h1>
      <form @submit.prevent="createRecord">
        <div class="field">
          <label class="label" for="title">Title</label>
          <div class="control">
            <input class="input" type="text" id="title" v-model="newRecord.recordTitle" required>
          </div>
        </div>
        <div class="field">
          <label class="label" for="band">Band</label>
          <div class="control">
            <div class="select">
              <select id="band" v-model="newRecord.recordBand" required>
                <option v-for="band in bands" :key="band.id" :value="band.id">{{ band.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label" for="condition">Condition</label>
          <div class="control">
            <div class="select">
              <select id="condition" v-model="newRecord.recordCondition" required>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Damaged">Damaged</option>
                <option value="Broken">Broken</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label" for="format">Format</label>
          <div class="control">
            <div class="select">
              <select id="format" v-model="newRecord.recordFormat" required>
                <option value="CD">CD</option>
                <option value="Vinyl 33 RPM">Vinyl 33 RPM</option>
                <option value="Vinyl 45 RPM">Vinyl 45 RPM</option>
                <option value="Audio Live Concert">Audio Live Concert</option>
                <option value="Video Live Concert">Video Live Concert</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label" for="year">Year</label>
          <div class="control">
            <input class="input" type="date" id="year" v-model="newRecord.recordYear" required>
          </div>
        </div>
        <div class="field">
          <label class="label" for="type">Type</label>
          <div class="control">
            <div class="select">
              <select id="type" v-model="newRecord.recordType" required>
                <option value="Official">Official</option>
                <option value="Bootleg">Bootleg</option>
                <option value="Burned">Burned</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label" for="length">Length</label>
          <div class="control">
            <div class="select">
              <select id="length" v-model="newRecord.recordLength" required>
                <option value="Full-length">Full-length</option>
                <option value="EP">EP</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label" for="label">Label</label>
          <div class="control">
            <div class="select">
              <select id="label" v-model="newRecord.recordLabel" required>
                <option v-for="label in labels" :key="label.id" :value="label.id">{{ label.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label" for="genres">Genres</label>
          <div class="control">
            <div class="select is-multiple">
              <select id="genres" v-model="newRecord.recordGenres" multiple required>
                <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label" for="sub_genres">Sub-Genres</label>
          <div class="control">
            <div class="select is-multiple">
              <select id="sub_genres" v-model="newRecord.recordSubGenres" multiple>
                <option v-for="sub_genre in sub_genres" :key="sub_genre.id" :value="sub_genre.id">{{ sub_genre.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label" for="styles">Styles</label>
          <div class="control">
            <div class="select is-multiple">
              <select id="styles" v-model="newRecord.recordStyles" multiple>
                <option v-for="style in styles" :key="style.id" :value="style.id">{{ style.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label" for="tracklist">Tracklist</label>
          <div class="control">
            <textarea class="textarea" id="tracklist" v-model="newRecord.recordTracklist"></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label" for="tracklist_side_b">Tracklist Side B</label>
          <div class="control">
            <textarea class="textarea" id="tracklist_side_b" v-model="newRecord.recordTracklistSideB"></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label" for="band_members">Band Members</label>
          <div class="control">
            <div class="select is-multiple">
              <select id="band_members" v-model="newRecord.recordBandMembers" multiple>
                <option v-for="member in band_members" :key="member.id" :value="member.id">{{ member.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-primary" type="submit">Create</button>
          </div>
        </div>
      </form>
      <div class="field">
        <div class="control">
          <button class="button is-light" @click="goBack">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {ICreateRecord} from "@/interfaces/records/ICreateRecord";

export default defineComponent({
  data () {
    return {
      bands: [] as Array<{ id: number, name: string }>,
      labels: [] as Array<{ id: number, name: string }>,
      genres: [] as Array<{ id: number, name: string }>,
      sub_genres: [] as Array<{ id: number, name: string }>,
      styles: [] as Array<{ id: number, name: string }>,
      band_members: [] as Array<{ id: number, name: string }>,
      newRecord: {
        recordName: string,
        recordBand: number,
        recordCondition: string,
        recordFormat: string,
        recordYear: string,
        recordType: string,
        recordLength: string,
        recordLabel: number,
        recordGenres: Array<number>,
        recordSubGenres: Array<number>,
        recordStyles: Array<number>,
        recordTracklist: string,
        recordTracklistSideB: string,
        recordBandMembers: Array<number>
      } as ICreateRecord
    }
  },
  methods: {
    fetchBands () {
      fetch('/api/bands/')
        .then(response => response.json())
        .then(data => {
          this.bands = data
        })
    },
    fetchLabels () {
      fetch('/api/labels/')
        .then(response => response.json())
        .then(data => {
          this.labels = data
        })
    },
    fetchGenres () {
      fetch('/api/genres/')
        .then(response => response.json())
        .then(data => {
          this.genres = data
        })
    },
    fetchSubGenres () {
      fetch('/api/subgenres/')
        .then(response => response.json())
        .then(data => {
          this.sub_genres = data
        })
    },
    fetchStyles () {
      fetch('/api/styles/')
        .then(response => response.json())
        .then(data => {
          this.styles = data
        })
    },
    fetchBandMembers () {
      fetch('/api/bandmembers/')
        .then(response => response.json())
        .then(data => {
          this.band_members = data
        })
    },
    createRecord () {
      const recordPayload: ICreateRecord = {
        ...this.newRecord,
        recordBand: this.newRecord.recordBand,
        recordGenres: this.newRecord.recordGenres.map((id: any) => ({ id })),
        recordSubGenres: this.newRecord.recordSubGenres.map((id: any) => ({ id })),
        recordStyles: this.newRecord.recordStyles.map((id: any) => ({ id })),
        recordLabel: { id: this.newRecord.recordLabel },
        recordBandMembers: this.newRecord.recordBandMembers.map((id: any) => ({ id }))
      }
      recordService.createRecord(recordPayload)
        .then(() => {
          console.log('Record created successfully')
          this.goBack()
        })
        .catch((error: any) => {
          console.error('Error creating record:', error)
        })
    },
    goBack () {
      this.$router.push({ name: 'RecordList' }) // Assumes you're using Vue Router
    }
  },
  created () {
    this.fetchBands()
    this.fetchLabels()
    this.fetchGenres()
    this.fetchSubGenres()
    this.fetchStyles()
    this.fetchBandMembers()
  }
})
</script>

<style>
@import 'bulma/css/bulma.css';
</style>
