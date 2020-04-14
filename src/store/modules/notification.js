// Commented file

export const namespaced = true

export const state = {
  notifications: []
}

let nextId = 1

export const mutations = {
  // Comme le composant est namespaced on ne précise pas que
  // c'est un PUSH de notification, le namespace donnera cette information
  PUSH(state, notification) {
    // Cette mutation prend en paramètre un objet notification
    // lui ajoute un id unique et push cette objet dans le tableau
    // du state notifications
    state.notifications.push({
      ...notification,
      id: nextId++
    })
  },
  DELETE(state, notificationToRemove) {
    // Cette mutation prend en paramètre un objet notification
    // à effacer du tableau du state notifications
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationToRemove.id
    )
  }
}
export const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification)
  },
  remove({ commit }, notificationToRemove) {
    commit('DELETE', notificationToRemove)
  }
}
