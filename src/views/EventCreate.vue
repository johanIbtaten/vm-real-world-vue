<!-- Commented file -->
<template>
  <div>
    <h1>Create an Event</h1>
    <!-- On écoute l'évenement submit, on preventDefault la 
    soumission avec .prevent et on appelle la méthode createEvent
    au submit -->
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required.
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Title"
        class="field"
        :class="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
      />

      <div v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required.
        </p>
      </div>

      <BaseInput
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add a description"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />

      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required.
        </p>
      </template>

      <h3>Where is your event?</h3>

      <BaseInput
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Add a location"
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />

      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required.
        </p>
      </template>

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <!-- On inclut le composant Datepicker -->
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          :input-class="{ error: $v.event.date.$error }"
          @opened="$v.event.date.$touch()"
        />
      </div>

      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required.
        </p>
      </template>

      <!-- On synchronise l'heure selectionnée avec la propriété time
      de l'event -->
      <BaseSelect
        label="Select a time"
        :options="times"
        v-model="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />

      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required.
        </p>
      </template>

      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
        >Submit</BaseButton
      >
      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>

<script>
// On importe le composant datepicker
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'

export default {
  components: {
    Datepicker
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
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
      this.$v.$touch()
      if (!this.$v.$invalid) {
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
      }
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
