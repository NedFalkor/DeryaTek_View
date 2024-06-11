<template>
  <div class="container">
    <!-- Liste des enregistrements -->
    <div v-if="showList">
      <h1 class="title">Records List</h1>
      <ul>
        <li v-for="record in records" :key="record.id" @click="selectRecord(record)" class="box">
          <strong>{{ record.recordTitle }}</strong> by <span>{{ record.recordBand.name }}</span>
        </li>
      </ul>
    </div>

    <!-- Détails de l'enregistrement -->
    <div v-if="selectedRecord">
      <button class="button is-info" @click="goBack">Back to List</button>
      <div class="box">
        <h1 class="title">{{ selectedRecord.recordTitle }}</h1>
        <p>Band: <span>{{ selectedRecord.recordBand.name }}</span></p>
        <p>Condition: <span>{{ selectedRecord.recordCondition }}</span></p>
        <p>Format: <span>{{ selectedRecord.recordFormat }}</span></p>
        <p>Year: <span>{{ selectedRecord.recordYear }}</span></p>
        <p>Type: <span>{{ selectedRecord.recordType }}</span></p>
        <p>Label: <span>{{ selectedRecord.recordLabel.name }}</span></p>
        <p>Genres: <span>{{ selectedRecord.recordGenres.map(g => g.name).join(', ') }}</span></p>
        <p>Sub-Genres: <span>{{ selectedRecord.recordSubGenres.map(sg => sg.name).join(', ') }}</span></p>
        <p>Styles: <span>{{ selectedRecord.recordStyles.map(s => s.name).join(', ') }}</span></p>
        <p>Tracklist: <span>{{ selectedRecord.recordTracklist }}</span></p>
        <p>Tracklist Side B: <span>{{ selectedRecord.recordTracklistSideB }}</span></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import recordService from '@/services/records/recordService'
import { IRecord } from '@/interfaces/records/IRecord'

export default defineComponent({
  data () {
    return {
      records: [] as IRecord[],
      selectedRecord: null as IRecord | null,
      showList: true
    }
  },
  methods: {
    fetchRecords () {
      recordService.getRecords().then(data => {
        this.records = data
      })
    },
    selectRecord (record: IRecord) {
      this.selectedRecord = record
      this.showList = false
    },
    goBack () {
      this.selectedRecord = null
      this.showList = true
    }
  },
  created () {
    this.fetchRecords()
  }
})
</script>

<style>
@import '../../../../node_modules/bulma/css/bulma.css';

.container {
  margin-top: 20px;
}

.box {
  cursor: pointer;
  transition: background-color 0.3s;
}

.box:hover {
  background-color: #f0f0f0;
}
</style>
