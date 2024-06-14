<template>
  <div class="container">
    <h1>Band Members List</h1>
    <ul>
      <li v-for="member in bandMembers" :key="member.id" @click="$emit('selectMember', member)">
        <strong>{{ member.band_member_first_name + ' ' + member.band_member_last_name }}</strong>
      </li>
    </ul>
    <button class="button is-primary" @click="$emit('createNewMember')">Add New Member</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { IBandMember } from '@/interfaces/bands/IBandMember'
import bandMemberService from '@/services/bands/bandMemberService'

export default defineComponent({
  name: 'BandMemberList',
  emits: ['selectMember', 'createNewMember'],
  setup () {
    const bandMembers = ref<IBandMember[]>([])

    const fetchBandMembers = async () => {
      try {
        const data = await bandMemberService.getBandMembers()
        bandMembers.value = data
      } catch (error) {
        console.error('Error fetching band members:', error)
      }
    }

    onMounted(() => {
      fetchBandMembers()
    })

    return {
      bandMembers
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
