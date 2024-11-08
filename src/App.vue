<script setup lang="ts">
import CustomersTable from '@/components/CustomersTable.vue'
import CustomerForm from '@/components/CustomerForm.vue'
import { getCustomers, createCustomer, deleteCustomer, updateCustomer } from '@/services'
import { defaultServerErrorMessage } from '@/constants'
import { Customer } from '@/types'
import { ref, reactive } from 'vue'

const isLoading = ref(false)
const showForm = ref(false)
const snackbar = reactive({
  show: false,
  type: 'success' as 'success' | 'error',
  text: '',
})
const selectedCustomer = ref<Customer>()
const customers = ref<Customer[]>([])

const fetchCustomers = async () => {
  try {
    isLoading.value = true

    const { data } = await getCustomers()

    customers.value = data
  } catch (e) {
    console.log(e, 'error')
  } finally {
    isLoading.value = false
  }
}

const handleSave = async (customer: Customer, done: () => void) => {
  try {
    if (selectedCustomer.value) {
      await updateCustomer(customer)

      const currentCustomerIndex = customers.value.findIndex(
        (c) => c.id === selectedCustomer.value.id,
      )

      customers.value[currentCustomerIndex] = customer

      snackbar.text = 'Customer updated successfully.'
    } else {
      const { data: id } = await createCustomer(customer)

      customers.value.push({ ...customer, id: Number(id) })

      snackbar.text = 'Customer created successfully.'
    }

    snackbar.type = 'success'
  } catch (e) {
    console.log(e, 'error')

    snackbar.type = 'error'
    snackbar.text = defaultServerErrorMessage
  } finally {
    snackbar.show = true
    done()
  }
}

const handleDelete = async (id: number, done: () => void) => {
  try {
    await deleteCustomer(id)

    snackbar.type = 'success'
    snackbar.text = 'Customer deleted successfully.'

    customers.value = customers.value.filter((customer) => customer.id !== id)
  } catch {
    snackbar.type = 'error'
    snackbar.text = defaultServerErrorMessage
  } finally {
    snackbar.show = true
    done()
  }
}

const toggleEditForm = (customer?: Customer) => {
  selectedCustomer.value = customer

  showForm.value = !showForm.value
}

fetchCustomers()
</script>

<template>
  <div v-if="isLoading" class="h-screen d-flex justify-center align-center">
    <v-progress-circular indeterminate color="primary" :size="100" />
  </div>
  <div v-else>
    <v-toolbar color="primary" class="px-8">
      <v-toolbar-title class="ml-0">Customers page</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog :model-value="showForm" @update:model-value="toggleEditForm()" max-width="700px">
        <template v-slot:activator="{ props }">
          <v-btn variant="outlined" v-bind="props"> Create customer </v-btn>
        </template>
        <CustomerForm
          v-if="showForm"
          :customer="selectedCustomer"
          @save="handleSave"
          @close="toggleEditForm"
        />
      </v-dialog>
    </v-toolbar>
    <CustomersTable :customers="customers" @delete="handleDelete" @edit="toggleEditForm" />

    <v-snackbar v-model="snackbar.show" :timeout="3000" :color="snackbar.type">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>
