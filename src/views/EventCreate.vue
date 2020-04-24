<!-- Commented file -->
<template>
  <div>
    <h1>Create an Event</h1>
    <!-- On écoute l'évenement submit, on preventDefault la 
    soumission avec .prevent et on appelle la méthode createEvent
    au submit -->
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>

      <h3>Name & describe your event</h3>
      <div class="field">
        <label>Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Add an event title"
        />
      </div>

      <div class="field">
        <label>Description</label>
        <input
          v-model="event.description"
          type="text"
          placeholder="Add a description"
        />
      </div>

      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Add a location"
        />
      </div>

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <!-- On inclut le composant Datepicker -->
        <Datepicker v-model="event.date" placeholder="Select a date" />
      </div>

      <div class="field">
        <label>Select a time</label>
        <!-- On synchronise l'heure selectionnée avec la propriété time
        de l'event -->
        <select v-model="event.time">
          <!-- On boucle sur le tableau times pour créer les options -->
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>

      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
// On importe le composant datepicker
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'

export default {
  components: {
    Datepicker
  },
  data() {
    // On prépare un tableau d'heures avant de l'ajouter aux
    // données réactives du composant sous le nom times
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      // On récupères les catégories depuis le store grâce à $store
      categories: this.$store.state.categories,
      // On prépare un objet personnalisé event vide en appelant
      // la méthode createFreshEventObject()
      event: this.createFreshEventObject()
    }
  },
  methods: {
    // Cette méthode est appelé à la soumission du formulaire
    createEvent() {
      NProgress.start()
      // Elle appelle l'action createEvent du module de store
      // event en lui passant le payload this.event
      this.$store
        .dispatch('event/createEvent', this.event)
        // Quand l'action via dispatch est résolut
        .then(() => {
          // On appelle la route event-show en lui passant
          // le paramètre id de l'event
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          // Ensuite on remet le formulaire à 0 en créer un
          // nouvel objet personnalisé event vide
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          NProgress.done()
          // Si il y a un problème lors de la requête API on le
          // logue dans la console
          console.log('There was a problem creating your event')
        })
    },
    // Méthode qui crée un nouvel objet event avec un id aléatoire
    // et un user
    createFreshEventObject() {
      const user = this.$store.state.user
      // Crée un nombre entre 0 et 10000000
      // Math.floor(x) renvoie le plus grand entier qui est
      // inférieur ou égal à un nombre x
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
