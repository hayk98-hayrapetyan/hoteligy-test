import './assets/main.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import { createApp } from 'vue'
import App from './App.vue'

const vuetify = createVuetify({
  components,
})

createApp(App).use(vuetify).mount('#app')
