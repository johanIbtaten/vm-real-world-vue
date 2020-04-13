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
    events: [],
    eventsTotal: 0,
    event: {}
  },
  mutations: {
    // On ajoute une mutation ADD_EVENT qui va ajouter un objet event
    // passé en payload (paramètre event) à notre tableau events du state
    // Les mutations s'occupent uniquement de modifier le state
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      console.log(eventsTotal)
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event) {
      state.event = event
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
    },
    fetchEvents({ commit }, { perPage, page }) {
      // On appelle notre client API basé sur Axios pour faire une
      // requête qui va nous renvoyer un tableau d'objets event
      // avec une limite perPage et la page courante en paramètres
      EventService.getEvents(perPage, page)
        .then(response => {
          // On commit une mutation qui va affecter le nombre
          // total recupéré dans le header de la response de l'API
          // d'events à la propriété du state eventsTotal
          commit(
            'SET_EVENTS_TOTAL',
            parseInt(response.headers['x-total-count'])
          )
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    },
    fetchEvent({ commit, getters }, id) {      
      var event = getters.getEventById(id)

      // Si l'event est déjà dans le state events on l'extrait
      // des events pour l'affecter au state event
      if (event) {
        commit('SET_EVENT', event)
      // Si l'event n'existe pas dans le state events
      // On le récupère depuis l'API
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          })
      }
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
