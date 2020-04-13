// Commented file

import Vue from 'vue'
import Vuex from 'vuex'

// Si le namespaced est activé le namespace sera user ou event
// * permet de recupérer tous les exports (propriétés ou méthodes)
// dans une seule instance
import * as user from '@/store/modules/user.js'
import * as event from '@/store/modules/event.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // On déclare les modules
  modules: {
    user,
    event
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  }
})
