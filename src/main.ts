import './assets/main.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { createApp } from 'vue'
import App from './App.vue'

const vuetify = createVuetify({
  components: {
    ...components,
    VDateInput,
  },
})

createApp(App).use(vuetify).mount('#app')
