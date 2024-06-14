<template>
  <div class="container">
    <!-- Conditionally render the list or the form based on showList and showCreateForm -->
    <BandMemberList v-if="showList" @selectMember="selectMember" @createNewMember="showCreateForm = true" />
    <BandMemberForm v-else @cancel="showCreateForm = false" @created="onMemberCreated" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BandMemberList from '@/components/lists/bands/BandMemberList.vue'
import BandMemberForm from '@/components/forms/bands/BandMemberForm.vue'

export default defineComponent({
  name: 'BandMemberView',
  components: {
    BandMemberList,
    BandMemberForm
  },
  setup() {
    const showList = ref(true)
    const showCreateForm = ref(false)

    const selectMember = (member: any) => {
      console.log('Selected member:', member)
      showList.value = false
    }

    const onMemberCreated = () => {
      showList.value = true
    }

    return {
      showList,
      showCreateForm,
      selectMember,
      onMemberCreated
    }
  }
})
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
