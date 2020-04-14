<!-- Commented file -->

<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  // Quand le composant est monté
  mounted() {
    // On affecte à la donnée réactive timeout un setTimeout
    // qui va appeler au bout de 5 secondes l'action remove du module
    // notification en lui passant la notification à supprimer
    // ce qui va faire disparaître la notification de l'écran
    this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  },
  // Juste avant que le composant soit détruit
  beforeDestroy() {
    // On supprime le setTimeout
    clearTimeout(this.timeout)
  },
  computed: {
    // On déclare une propriété calculée qui retourne une classe CSS
    // dynamique selon le type de la notification
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    }
  },
  // On inclut l'action remove du module avec le namespace notification
  methods: mapActions('notification', ['remove'])
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
