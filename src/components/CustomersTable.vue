<script setup lang="ts">
import { ref } from 'vue'
import { Customer } from '@/types'

const { customers } = defineProps<{
  customers: Customer[]
}>()

const emit = defineEmits<{
  (event: 'delete', value: number, done: () => void): void
  (event: 'edit', value: Customer): void
}>()

const isLoading = ref(false)
const confirmDelete = ref(false)
const selectedCustomerId = ref<number>()
const headers = ref([
  {
    title: 'First name',
    align: 'start',
    key: 'firstName',
  },
  { title: 'Last name', key: 'lastName' },
  { title: 'City', key: 'city' },
  { title: 'Birthday', key: 'birthday' },
  { title: 'Actions', key: 'actions', sortable: false, align: 'end' },
])

const toggleConfirmModal = (id?: number) => {
  selectedCustomerId.value = id

  confirmDelete.value = !!id
}

const handleDelete = () => {
  isLoading.value = true
  emit('delete', selectedCustomerId.value, () => {
    isLoading.value = false
    toggleConfirmModal()
  })
}

const handleEdit = (customer: Customer) => {
  emit('edit', customer)
}
</script>

<template>
  <v-data-table :headers="headers" :items="customers" class="px-4 sm:px-8">
    <template v-slot:item.actions="{ item }">
      <div class="d-flex flex-nowrap justify-end">
        <v-btn
        density="compact"
        class="me-2"
        variant="text"
        icon=" mdi-pencil"
        color="primary"
        @click="handleEdit(item)"
      />
      <v-btn
        density="compact"
        variant="text"
        icon=" mdi-delete"
        color="red"
        @click="toggleConfirmModal(item.id)"
      />
      </div>
    </template>
  </v-data-table>

  <v-dialog v-model="confirmDelete" max-width="600px">
    <v-card>
      <v-card-title class="text-lg">Are you sure you want to delete this customer?</v-card-title>
      <v-card-actions class="mt-4">
        <v-btn variant="text" @click="toggleConfirmModal()">Cancel</v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          @click="handleDelete"
          :loading="isLoading"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.v-data-table-header__content {
  white-space: nowrap;
  font-weight: bold !important;
}
</style>
