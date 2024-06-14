<template>
  <div class="container">
    <h1>Create New Record</h1>
    <form @submit.prevent="createRecord">
      <div>
        <label for="title">Title</label>
        <input type="text" id="title" v-model="newRecord.recordTitle" required>
      </div>
      <div>
        <label for="band">Band</label>
        <select id="band" v-model="newRecord.recordBandId" required>
          <option v-for="band in bands" :key="band.id" :value="band.id">{{ band.bandName }}</option>
        </select>
      </div>
      <div>
        <label for="condition">Condition</label>
        <select id="condition" v-model="newRecord.recordCondition" required>
          <option value="New">New</option>
          <option value="Used">Used</option>
          <option value="Damaged">Damaged</option>
          <option value="Broken">Broken</option>
        </select>
      </div>
      <div>
        <label for="format">Format</label>
        <select id="format" v-model="newRecord.recordFormat" required>
          <option value="CD">CD</option>
          <option value="Vinyl 33 RPM">Vinyl 33 RPM</option>
          <option value="Vinyl 45 RPM">Vinyl 45 RPM</option>
          <option value="Audio Live Concert">Audio Live Concert</option>
          <option value="Video Live Concert">Video Live Concert</option>
        </select>
      </div>
      <div>
        <label for="year">Year</label>
        <input type="date" id="year" v-model="newRecord.recordYear" required>
      </div>
      <div>
        <label for="type">Type</label>
        <select id="type" v-model="newRecord.recordType" required>
          <option value="Official">Official</option>
          <option value="Bootleg">Bootleg</option>
          <option value="Burned">Burned</option>
        </select>
      </div>
      <div>
        <label for="label">Label</label>
        <select id="label" v-model="newRecord.recordLabelId" required>
          <option v-for="label in labels" :key="label.id" :value="label.id">{{ label.labelName }}</option>
        </select>
      </div>
      <div>
        <label for="genres">Genres</label>
        <select id="genres" v-model="newRecord.recordGenreIds" multiple required>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.genreName }}</option>
        </select>
      </div>
      <div>
        <label for="sub_genres">Sub-Genres</label>
        <select id="sub_genres" v-model="newRecord.recordSubGenreIds" multiple required>
          <option v-for="sub_genre in subGenres" :key="sub_genre.id" :value="sub_genre.id">{{ sub_genre.subGenreName }}</option>
        </select>
      </div>
      <div>
        <label for="styles">Styles</label>
        <select id="styles" v-model="newRecord.recordStyleIds" multiple required>
          <option v-for="style in styles" :key="style.id" :value="style.id">{{ style.styleName }}</option>
        </select>
      </div>
      <div>
        <label for="tracklist">Tracklist</label>
        <textarea id="tracklist" v-model="newRecord.recordTracklistInput" required></textarea>
      </div>
      <div>
        <label for="tracklist_side_b">Tracklist Side B</label>
        <textarea id="tracklist_side_b" v-model="newRecord.recordTracklistSideBInput" required></textarea>
      </div>
      <div>
        <label for="band_members">Band Members</label>
        <select id="band_members" v-model="newRecord.recordBandMemberIds" multiple required>
          <option v-for="member in bandMembers" :key="member.id" :value="member.id">{{ member.bandMemberFirstName }}</option>
        </select>
      </div>
      <button type="submit">Create</button>
      <button type="button" @click="$emit('cancel')">Cancel</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { IRecord } from '@/interfaces/records/IRecord'
import { IBand } from '@/interfaces/bands/IBand'
import { ILabel } from '@/interfaces/records/ILabel'
import { IGenre } from '@/interfaces/genres/IGenre'
import { ISubGenre } from '@/interfaces/genres/ISubGenre'
import { IStyle } from '@/interfaces/genres/IStyle'
import { IBandMember } from '@/interfaces/bands/IBandMember'
import bandService from '@/services/bands/bandService'
import labelService from '@/services/records/labelService'
import genreService from '@/services/genres/genreService'
import subGenreService from '@/services/genres/subGenreService'
import styleService from '@/services/genres/styleService'
import bandMemberService from '@/services/bands/bandMemberService'
import { ITracklist } from '@/interfaces/records/ITracklist'
import recordService from '@/services/records/recordService'

export default defineComponent({
  name: 'RecordForm',
  emits: ['cancel', 'created'],
  setup (props, { emit }) {
    const newRecord = ref<Partial<IRecord & { recordBandId: number, recordLabelId: number, recordGenreIds: number[], recordSubGenreIds: number[], recordStyleIds: number[], recordTracklistInput: string, recordTracklistSideBInput: string, recordBandMemberIds: number[] }>>({
      recordTitle: '',
      recordBandId: 0, // Change to ID
      recordCondition: 'New',
      recordFormat: 'CD',
      recordYear: '',
      recordType: 'Official',
      recordLabelId: 0, // Change to ID
      recordGenreIds: [], // Change to array of IDs
      recordSubGenreIds: [], // Change to array of IDs
      recordStyleIds: [], // Change to array of IDs
      recordTracklistInput: '', // Temporary input string for Tracklist
      recordTracklistSideBInput: '', // Temporary input string for Tracklist Side B
      recordBandMemberIds: [], // Change to array of IDs
      recordLength: 'Full-length' // or 'EP' if this is the default
    })

    const bands = ref<IBand[]>([])
    const labels = ref<ILabel[]>([])
    const genres = ref<IGenre[]>([])
    const subGenres = ref<ISubGenre[]>([])
    const styles = ref<IStyle[]>([])
    const bandMembers = ref<IBandMember[]>([])

    const fetchBands = async () => {
      try {
        const data = await bandService.getBands()
        bands.value = data
      } catch (error) {
        console.error('Error fetching bands:', error)
      }
    }

    const fetchLabels = async () => {
      try {
        const data = await labelService.getLabels()
        labels.value = data
      } catch (error) {
        console.error('Error fetching labels:', error)
      }
    }

    const fetchGenres = async () => {
      try {
        const data = await genreService.getGenres()
        genres.value = data
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }

    const fetchSubGenres = async () => {
      try {
        const data = await subGenreService.getSubGenres()
        subGenres.value = data
      } catch (error) {
        console.error('Error fetching sub-genres:', error)
      }
    }

    const fetchStyles = async () => {
      try {
        const data = await styleService.getStyles()
        styles.value = data
      } catch (error) {
        console.error('Error fetching styles:', error)
      }
    }

    const fetchBandMembers = async () => {
      try {
        const data = await bandMemberService.getBandMembers()
        bandMembers.value = data
      } catch (error) {
        console.error('Error fetching band members:', error)
      }
    }

    const createRecord = async () => {
      try {
        const recordData: IRecord = {
          id: 0,
          recordTitle: newRecord.value.recordTitle as string,
          recordBand: bands.value.find(b => b.id === newRecord.value.recordBandId) as IBand,
          recordCondition: newRecord.value.recordCondition as 'New' | 'Used' | 'Damaged' | 'Broken',
          recordFormat: newRecord.value.recordFormat as 'CD' | 'Vinyl 33 RPM' | 'Vinyl 45 RPM' | 'Audio Live Concert' | 'Video Live Concert',
          recordYear: newRecord.value.recordYear as string,
          recordType: newRecord.value.recordType as 'Official' | 'Bootleg' | 'Burned',
          recordLabel: labels.value.find(l => l.id === newRecord.value.recordLabelId) as ILabel,
          recordGenres: genres.value.filter(g => newRecord.value.recordGenreIds?.includes(g.id)),
          recordSubGenres: subGenres.value.filter(sg => newRecord.value.recordSubGenreIds?.includes(sg.id)),
          recordStyles: styles.value.filter(s => newRecord.value.recordStyleIds?.includes(s.id)),
          recordTracklist: JSON.parse(newRecord.value.recordTracklistInput as unknown as string) as ITracklist[],
          recordTracklistSideB: JSON.parse(newRecord.value.recordTracklistSideBInput as unknown as string) as ITracklist[],
          recordBandMembers: bandMembers.value.filter(bm => newRecord.value.recordBandMemberIds?.includes(bm.id)),
          recordLength: newRecord.value.recordLength as 'Full-length' | 'EP'
        }
        await recordService.createRecord(recordData)
        emit('created')
      } catch (error) {
        console.error('Error creating record:', error)
      }
    }

    onMounted(() => {
      fetchBands()
      fetchLabels()
      fetchGenres()
      fetchSubGenres()
      fetchStyles()
      fetchBandMembers()
    })

    return {
      newRecord,
      bands,
      labels,
      genres,
      subGenres,
      styles,
      bandMembers,
      createRecord
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
