// Commented file

import Vue from 'vue'
import Vuex from 'vuex'

import EventService from '@/services/EventService.js'

// On déclare à notre instance de vue que l'on va utiliser vuex
Vue.use(Vuex)

// On exporte une instance de Store
export default new Vuex.Store({
  // On initialise le state avec les valeurs par défaut
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: []
  },
  mutations: {
    // On ajoute une mutation ADD_EVENT qui va ajouter un objet event
    // passé en payload (paramètre event) à notre tableau events du state
    // Les mutations s'occupent uniquement de modifier le state
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {
    // On ajoute une action createEvent avec pour paramètres
    // commit qui est récupéré en destructurant l'objet context fourni
    // automatiquement par vue en paramètre des actions.
    // On a également le paramètre event qui est un payload passé
    // à l'action
    createEvent({ commit }, event) {
      // Cette action post les données du formulaire vers un endpoint
      // de notre API via notre EventService. Si le post se passe bien
      // et que la promesse est résolue, on commit la mutation avec
      // son payload.
      // L'action de post de notre Event Service ici retourne une
      // promesse qui peut être résolue ou non
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    }
  },
  getters: {
    // On ajoute un getter qui renvoie une fonction ce qui permet
    // d'avoir un getter dynamique en permettant de passer id en
    // argument
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
