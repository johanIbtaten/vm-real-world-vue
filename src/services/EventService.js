// Commented file

import axios from 'axios'

// On crée une instance unique d'axios pour ce service
// avec des parmètres de configurations
const apiClient = axios.create({
  // URL de base de l'API
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  // Avec un header qui prend en charge le JSON
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// On exporte un objet qui contient de méthodes
export default {
  // Méthode qui récupère un tableau d'évènements au niveau
  // du endpoint http://localhost:3000/events
  // On passe en argument à la fonction et au endpoint le nombre maximun
  // d'éléments par page et le numéro de la page courante
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  // Méthode qui récupère un évènement associé à un id au niveau
  // du endpoint http://localhost:3000/events/:id
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
