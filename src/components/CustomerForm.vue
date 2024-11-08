<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Customer } from '@/types'

const { customer } = defineProps<{
  customer?: Customer
}>()

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'save', value: Customer, done: () => void): void
}>()

const defaultCustomer: Customer = {
  firstName: '',
  lastName: '',
  city: '',
  birthday: undefined,
}

const isLoading = ref(false)
const isValid = ref(false)
const form = ref<Customer>({ ...(customer ?? defaultCustomer) })

const getFormTitle = computed(() => (!!customer ? 'Create customer' : 'Edit customer'))

const isValidBirthday = (value: string) => {
  if (!value) return 'Birthday is required'

  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/

  if (!dateRegex.test(value)) return 'Birthday must be in the format MM/DD/YYYY'

  const [month, day, year] = value.split('/').map(Number)
  const date = new Date(year, month - 1, day)

  if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
    return 'Birthday must be a valid date'
  }

  return true
}

const handleClose = () => emit('close')

const handleSave = () => {
  isLoading.value = true

  form.value.birthday = new Date(form.value.birthday).toISOString().split('T')[0]

  emit('save', form.value, () => {
    isLoading.value = false

    handleClose()
  })
}
</script>

<template>
  <v-card :title="getFormTitle">
    <v-form v-model="isValid">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.firstName"
              :rules="[() => !!form.firstName || 'First name is required']"
              label="First name"
              variant="solo"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.lastName"
              :rules="[() => !!form.lastName || 'Last name is required']"
              label="Last name"
              variant="solo"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.city"
              :rules="[() => !!form.city || 'City is required']"
              label="City"
              variant="solo"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-date-input
              v-model="form.birthday"
              :rules="[isValidBirthday]"
              prepend-icon=""
              label="Birthday"
              variant="solo"
              :mask="'##/##/####'"
              placeholder="MM/DD/YYYY"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn variant="plain" @click="handleClose"> Cancel </v-btn>
      <v-btn
        color="primary"
        variant="elevated"
        @click="handleSave"
        :disabled="!isValid"
        :loading="isLoading"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
