<!-- Commented file -->
<template>
  <div>
    <h1>Events Listing</h1>
    <!-- On boucle sur le tableau des events et pour chaque event
    on affiche un composant EvenCard en lui passant une props :event
    et une clé :key indispensable quand on affiche des composants 
    en boucle -->
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
// On importe les composants
import EventCard from '@/components/EventCard.vue'

// On importe les services
import EventService from '@/services/EventService.js'

export default {
  components: {
    EventCard
  },
  // On déclare notre state
  data() {
    return {
      // On initialise notre tableau d'évènements avec un tableau vide
      events: []
    }
  },
  // Au niveau du lifecycle created()
  created() {
    // On appelle notre client API basé sur Axios pour faire une
    // requête qui va nous renvoyer un tableau d'objets event
    EventService.getEvents()
      .then(response => {
        // On hydrate la propriété events de notre state
        // avec le tableau récupéré depuis l'API
        this.events = response.data
      })
      // Si il y a une erreur lors de la requête
      .catch(error => {
        // On affiche l'erreur
        console.log('There was an error:', error.response)
      })
  }
}
</script>
