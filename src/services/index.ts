import axios from '@/axios'
import type { Customer } from '@/types'
import type { AxiosResponse } from 'axios'

export const getCustomers = (): Promise<AxiosResponse<Customer[]>> => axios.get('/customers')

export const createCustomer = (customer: Customer): Promise<AxiosResponse<string>> =>
  axios.post('/customers', customer)

export const updateCustomer = ({ id, ...customer }: Customer): Promise<AxiosResponse> =>
  axios.put(`/customers/${id}`, customer)

export const deleteCustomer = (customerId: number): Promise<AxiosResponse<string>> =>
  axios.delete(`/customers/${customerId}`)
