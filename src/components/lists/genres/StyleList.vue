<template>
  <div class="container">
    <h1>Styles List</h1>
    <ul>
      <li v-for="style in styles" :key="style.id" @click="$emit('selectStyle', style)">
        <strong>{{ style.styleName }}</strong>
      </li>
    </ul>
    <button class="button is-primary" @click="$emit('createNewStyle')">Add New Style</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { IStyle } from '@/interfaces/genres/IStyle'
import styleService from '@/services/genres/styleService'

export default defineComponent({
  name: 'StyleList',
  emits: ['selectStyle', 'createNewStyle'],
  setup () {
    const styles = ref<IStyle[]>([])

    const fetchStyles = async () => {
      try {
        const data = await styleService.getStyles()
        styles.value = data
      } catch (error) {
        console.error('Error fetching styles:', error)
      }
    }

    onMounted(() => {
      fetchStyles()
    })

    return {
      styles
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
