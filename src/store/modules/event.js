// Commented file

import EventService from '@/services/EventService.js'

// On namespace ce module
export const namespaced = true

export const state = {
  events: [],
  eventsTotal: 0,
  event: {}
}

export const mutations = {
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
}

export const actions = {
  // On ajoute une action createEvent avec pour paramètres
  // commit qui est récupéré en destructurant l'objet context fourni
  // automatiquement par vue en paramètre des actions.
  // On a également le paramètre event qui est un payload passé
  // à l'action
  createEvent({ commit, dispatch }, event) {
    // Cette action post les données du formulaire vers un endpoint
    // de notre API via notre EventService. Si le post se passe bien
    // et que la promesse est résolue, on commit la mutation avec
    // son payload.
    // L'action de post de notre Event Service ici retourne une
    // promesse qui peut être résolue ou non
    return EventService.postEvent(event)
      .then(() => {
        // Si le post c'est bien passé on commit la mutation pour
        // ajouter un objet event au tableau du state events
        commit('ADD_EVENT', event)
        // On déclare un objet notification de type success
        // avec un message de succès qui sera afficher à l'utilisateur
        const notification = {
          type: 'success',
          message: 'Your event has been created!'
        }
        // On dispatch l'action add du module notification namespaced
        // qui va ajouter la notification à son state, on met root à
        // true pour être sûr de bien retrouver le module à partir de
        // la racine store
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        // Si il y a un problème retourné par le client API
        // on déclare une notification de type error avec le message
        // d'erreur retourné
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        }
        // On ajoute la notification au module des notifications
        dispatch('notification/add', notification, { root: true })
        // On fait remonter l'erreur au composant qui utilise ce module
        throw error
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    // On appelle notre client API basé sur Axios pour faire une
    // requête qui va nous renvoyer un tableau d'objets event
    // avec une limite perPage et la page courante en paramètres
    EventService.getEvents(perPage, page)
      .then(response => {
        // On commit une mutation qui va affecter le nombre
        // total recupéré dans le header de la response de l'API
        // d'events à la propriété du state eventsTotal
        commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
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
          const notification = {
            type: 'error',
            message: 'There was a problem fetching event: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  }
}

export const getters = {
  // On ajoute un getter qui renvoie une fonction ce qui permet
  // d'avoir un getter dynamique en permettant de passer id en
  // argument
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
