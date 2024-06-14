<template>
  <div class="container">
    <h1>Create New Band Member</h1>
    <form @submit.prevent="createMember">
      <div>
        <label for="first_name">First Name</label>
        <input type="text" id="first_name" v-model="newMember.bandMemberFirstName" required>
      </div>
      <div>
        <label for="last_name">Last Name</label>
        <input type="text" id="last_name" v-model="newMember.bandMemberLastName">
      </div>
      <div>
        <label for="birth_city">Birth City</label>
        <input type="text" id="birth_city" v-model="newMember.bandMemberBirthCity">
      </div>
      <div>
        <label for="birth_country">Birth Country</label>
        <input type="text" id="birth_country" v-model="newMember.bandMemberBirthCountry">
      </div>
      <div>
        <label for="nationality">Nationality</label>
        <input type="text" id="nationality" v-model="newMember.bandMemberNationality">
      </div>
      <div>
        <label for="birth_year">Birth Year</label>
        <input type="number" id="birth_year" v-model="newMember.bandMemberBirthYear">
      </div>
      <div>
        <label for="death_year">Death Year</label>
        <input type="number" id="death_year" v-model="newMember.bandMemberDeathYear">
      </div>
      <div>
        <label for="instruments">Instruments</label>
        <select id="instruments" v-model="newMember.bandMemberInstruments" multiple>
          <option v-for="instrument in instruments" :key="instrument.id" :value="instrument.id">{{ instrument.name }}</option>
        </select>
      </div>
      <button type="submit">Create</button>
      <button type="button" @click="$emit('cancel')">Cancel</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { IBandMember } from '@/interfaces/bands/IBandMember'
import { IInstrument } from '@/interfaces/bands/IInstrument'
import bandMemberService from '@/services/bands/bandMemberService'
import instrumentService from '@/services/bands/instrumentService'

export default defineComponent({
  name: 'BandMemberForm',
  emits: ['cancel', 'created'],
  setup (_, { emit }) {
    const instruments = ref<IInstrument[]>([])
    const newMember = ref<Partial<IBandMember>>({
      bandMemberFirstName: '',
      bandMemberLastName: '',
      bandMemberBirthCity: '',
      bandMemberBirthCountry: '',
      bandMemberNationality: '',
      bandMemberBirthYear: 0,
      bandMemberDeathYear: 0,
      bandMemberInstruments: []
    })

    const fetchInstruments = async () => {
      try {
        const data = await instrumentService.getInstruments()
        instruments.value = data
      } catch (error) {
        console.error('Error fetching instruments:', error)
      }
    }

    const createMember = async () => {
      try {
        await bandMemberService.createBandMember(newMember.value as IBandMember)
        // Emit created event to notify parent component
        emit('created')
      } catch (error) {
        console.error('Error creating band member:', error)
      }
    }

    onMounted(() => {
      fetchInstruments()
    })

    return {
      instruments,
      newMember,
      createMember
    }
  }
})
</script>

<style scoped>
.container {
  margin: 20px;
}

h1 {
  margin-bottom: 20px;
}

form div {
  margin-bottom: 10px;
}

button {
  margin-right: 10px;
}
</style>
