<template>
  <div class="container">
    <h1 class="title">Bands List</h1>
    <ul>
      <li v-for="band in bands" :key="band.id" @click="$emit('selectBand', band)">
        <strong>{{ band.bandName }}</strong>
      </li>
    </ul>
    <button class="button is-primary" @click="$emit('createNewBand')">Add New Band</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import bandService from '@/services/bands/bandService'
import { IBand } from '@/interfaces/bands/IBand'

export default defineComponent({
  name: 'BandList',
  emits: ['selectBand', 'createNewBand'],
  setup (props, { emit }) {
    const bands = ref<IBand[]>([])

    const fetchBands = async () => {
      try {
        const data = await bandService.getBands()
        bands.value = data
      } catch (error) {
        console.error('Error fetching bands:', error)
      }
    }

    onMounted(() => {
      fetchBands()
    })

    return {
      bands
    }
  }
})
</script>

<style scoped>
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
