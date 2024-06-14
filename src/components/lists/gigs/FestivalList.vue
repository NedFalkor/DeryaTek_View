<template>
  <div class="container">
    <h1>Festivals List</h1>
    <ul>
      <li v-for="festival in festivals" :key="festival.id" @click="$emit('selectFestival', festival)">
        <strong>{{ festival.festivalName }}</strong> ({{ festival.festivalStartDate }} - {{ festival.festivalEndDate }})
      </li>
    </ul>
    <button class="button is-primary" @click="$emit('createNewFestival')">Add New Festival</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { IFestival } from '@/interfaces/gigs/IFestival'
import festivalService from '@/services/gigs/festivalService'

export default defineComponent({
  name: 'FestivalList',
  emits: ['selectFestival', 'createNewFestival'],
  setup () {
    const festivals = ref<IFestival[]>([])

    const fetchFestivals = async () => {
      try {
        const data = await festivalService.getFestivals()
        festivals.value = data
      } catch (error) {
        console.error('Error fetching festivals:', error)
      }
    }

    onMounted(() => {
      fetchFestivals()
    })

    return {
      festivals
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
