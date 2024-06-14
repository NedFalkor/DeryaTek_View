<template>
  <div class="container">
    <h1>Instruments List</h1>
    <ul>
      <li v-for="instrument in instruments" :key="instrument.id" @click="$emit('selectInstrument', instrument)">
        <strong>{{ instrument.instrument_name }}</strong>
      </li>
    </ul>
    <button class="button is-primary" @click="$emit('createNewInstrument')">Add New Instrument</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { IInstrument } from '@/interfaces/bands/IInstrument'
import instrumentService from '@/services/bands/instrumentService'

export default defineComponent({
  name: 'InstrumentList',
  emits: ['selectInstrument', 'createNewInstrument'],
  setup () {
    const instruments = ref<IInstrument[]>([])

    const fetchInstruments = async () => {
      try {
        const data = await instrumentService.getInstruments()
        instruments.value = data
      } catch (error) {
        console.error('Error fetching instruments:', error)
      }
    }

    onMounted(() => {
      fetchInstruments()
    })

    return {
      instruments
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
