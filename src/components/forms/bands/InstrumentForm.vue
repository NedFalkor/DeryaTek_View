<template>
  <div class="container">
    <h1>Create New Instrument</h1>
    <form @submit.prevent="createInstrument">
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" v-model="newInstrument.instrumentName" required>
      </div>
      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="newInstrument.instrumentDescription"></textarea>
      </div>
      <div>
        <label for="category">Category</label>
        <select id="category" v-model="newInstrument.instrumentCategory" required>
          <option value="wind">Wind</option>
          <option value="strings">Strings</option>
          <option value="percussion">Percussion</option>
          <option value="electronic">Electronic</option>
          <option value="keyboard">Keyboard</option>
          <option value="brass">Brass</option>
          <option value="woodwind">Woodwind</option>
          <option value="vocal">Vocal</option>
        </select>
      </div>
      <button type="submit">Create</button>
      <button type="button" @click="$emit('cancel')">Cancel</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IInstrument } from '@/interfaces/bands/IInstrument'
import instrumentService from '@/services/bands/instrumentService'

export default defineComponent({
  name: 'InstrumentForm',
  emits: ['cancel', 'created'],
  setup (_, { emit }) {
    const newInstrument = ref<Partial<IInstrument>>({
      instrumentName: '',
      instrumentDescription: '',
      instrumentCategory: 'wind'
    })

    const createInstrument = async () => {
      try {
        await instrumentService.createInstrument(newInstrument.value as IInstrument)
        // Emit created event to notify parent component
        emit('created')
      } catch (error) {
        console.error('Error creating instrument:', error)
      }
    }

    return {
      newInstrument,
      createInstrument
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
