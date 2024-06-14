<template>
  <div class="container">
    <h1 class="title">Records List</h1>
    <ul>
      <li v-for="record in records" :key="record.id" @click="$emit('selectRecord', record)" class="box">
        <strong>{{ record.recordTitle }}</strong> by <span>{{ record.recordBand.name }}</span>
      </li>
    </ul>
    <button @click="$emit('createNewRecord')">Add New Record</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import recordService from '@/services/records/recordService'
import { IRecord } from '@/interfaces/records/IRecord'

export default defineComponent({
  name: 'RecordList',
  emits: ['selectRecord', 'createNewRecord'],
  setup (props, { emit }) {
    const records = ref<IRecord[]>([])

    const fetchRecords = async () => {
      try {
        const data = await recordService.getRecords()
        records.value = data
      } catch (error) {
        console.error('Error fetching records:', error)
      }
    }

    onMounted(() => {
      fetchRecords()
    })

    return {
      records
    }
  }
})
</script>

<style scoped>
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
