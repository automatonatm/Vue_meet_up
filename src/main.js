import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import router from '@/router'
import {store} from "./store";
import * as firebase from 'firebase'
import DateFilter from "./filters/date"


import Alert from './components/shared/Alert'
import Edit from './components/Meetup/Edit/EditMeetupDialogue'
import EditDate from './components/Meetup/Edit/EditDateDialogue'
import EditTime from './components/Meetup/Edit/EditTimeDialogue'
import Register from './components/Meetup/RegisterDialog'

Vue.component('Alert', Alert)
Vue.component('Edit', Edit)
Vue.component('Date', EditDate)
Vue.component('Time', EditTime)
Vue.component('Register', Register)

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
new Vue({
  vuetify,
  router,
  store,

  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyA_wWZIIwF47HwnppeQ51WCm77rqZBa04k",
      authDomain: "vuemeetups-afc25.firebaseapp.com",
      databaseURL: "https://vuemeetups-afc25.firebaseio.com",
      projectId: "vuemeetups-afc25",
      storageBucket: "vuemeetups-afc25.appspot.com",
      messagingSenderId: "702412774786",
      appId: "1:702412774786:web:bb8ba1286972e3d715039b",
      measurementId: "G-1VNY5XN241"
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
          this.$store.dispatch('fetchUserData')

      }
    })

    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')
