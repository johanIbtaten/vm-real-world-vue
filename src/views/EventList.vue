<!-- Commented file -->
<template>
  <div>
    <h1>Events Listing</h1>
    <!-- On boucle sur le tableau des events et pour chaque event
    on affiche un composant EvenCard en lui passant une props :event
    et une clé :key indispensable quand on affiche des composants 
    en boucle -->
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <!-- La balise template dans un template permet d'éviter
    de mettre une div, template ne s'affichera pas une fois compilé -->
    <template v-if="page != 1">
      <!-- Si on clique sur Prev page on appelle la route
      event-list avec un paramètre d'URL page qui va changer 
      et qui sera égal au numéro de page actuel - 1 -->
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page
      </router-link>
      <template v-if="hasNextPage"> | </template>
    </template>
    <!-- Si on est pas sur la dernière page on affiche le lien
    Next Page -->
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
    >
      Next Page
    </router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  created() {
    // On place perPage ici car on a pas besoin que ce soit une donnée
    // réactive et en même temps on souhaite pouvoir y accéder dans
    // notre composant
    this.perPage = 3

    // On récupère les events depuis le store
    this.$store.dispatch('fetchEvents', {
      perPage: this.perPage,
      page: this.page
    })
  },
  computed: {
    page() {
      // On récupère la valeur du paramètre d'URL page
      // Si il n'existe pas on affecte 1 à la propriété
      // calculée page
      return parseInt(this.$route.query.page) || 1
    },
    // On crée un propriété calculée qui retourne true si on
    // est pas sur la dernière page
    hasNextPage() {
      return this.eventsTotal > this.page * this.perPage
    },
    ...mapState(['events', 'eventsTotal'])
  }
}
</script>
