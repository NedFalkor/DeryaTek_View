<template>
  <div class="container">
    <!-- Liste des labels -->
    <div v-if="showList">
      <h1>Labels List</h1>
      <ul>
        <li v-for="label in labels" :key="label.id" @click="$emit('selectLabel', label)">
          <strong>{{ label.labelName }}</strong>
        </li>
      </ul>
      <button @click="$emit('createNewLabel')">Add New Label</button>
    </div>

    <!-- Détails du label -->
    <div v-if="showDetail">
      <button @click="goBack">Back to List</button>
      <h1>{{ selectedLabel?.labelName }}</h1>
      <p>Address: {{ selectedLabel?.labelAddress }}</p>
      <p>Country: {{ selectedLabel?.labelCountry }}</p>
      <p>Description: {{ selectedLabel?.labelDescription }}</p>
      <p>Founding Date: {{ selectedLabel?.labelFoundingDate }}</p>
      <p>Phone Number: {{ selectedLabel?.labelPhoneNumber }}</p>
      <p>Postal Code: {{ selectedLabel?.labelPostalCode }}</p>
      <p>Status: {{ selectedLabel?.labelStatus }}</p>
      <p>Genres: {{ selectedLabel?.labelGenres.map(g => g.name).join(', ') }}</p>
      <p>Sub-Genres: {{ selectedLabel?.labelSubGenres.map(sg => sg.name).join(', ') }}</p>
      <p>Styles: {{ selectedLabel?.labelStyles.map(s => s.name).join(', ') }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { ILabel } from '@/interfaces/records/ILabel'
import labelService from '@/services/records/labelService'

export default defineComponent({
  name: 'LabelList',
  emits: ['selectLabel', 'createNewLabel'],
  setup () {
    const labels = ref<ILabel[]>([])
    const selectedLabel = ref<ILabel | null>(null)
    const showList = ref(true)
    const showDetail = ref(false)

    const fetchLabels = async () => {
      try {
        const data = await labelService.getLabels()
        labels.value = data
      } catch (error) {
        console.error('Error fetching labels:', error)
      }
    }

    const selectLabel = (label: ILabel) => {
      selectedLabel.value = label
      showList.value = false
      showDetail.value = true
    }

    const goBack = () => {
      showDetail.value = false
      showList.value = true
    }

    onMounted(() => {
      fetchLabels()
    })

    return {
      labels,
      selectedLabel,
      showList,
      showDetail,
      selectLabel,
      goBack
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
