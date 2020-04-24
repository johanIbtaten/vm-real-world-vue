<!-- Commented file -->
<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>Organized by {{ event.organizer ? event.organizer.name : '' }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>

    <!-- On affiche l'icone map avec du contenu -->
    <BaseIcon name="map"><h2>Location</h2></BaseIcon>

    <address>{{ event.location }}</address>

    <h2>Event details</h2>
    <p>{{ event.description }}</p>

    <h2>
      Attendees
      <span class="badge -fill-gradient">{{
        /* Si event.attendees existe on affiche la taille du tableau
        sinon on affiche 0 */
        event.attendees ? event.attendees.length : 0
      }}</span>
    </h2>
    <ul class="list-group">
      <!-- On boucle sur le tableau attendees et on met l'index 
      comme key -->
      <li
        v-for="(attendee, index) in event.attendees"
        :key="index"
        class="list-item"
      >
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>

<script>
// import { mapState , mapActions } from 'vuex'

export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  }
  // On récupère la props id qui vient du Router et qui est
  // un paramètre de l'URL
  // props: ['id'],
  // created() {
  //   // On récupère l'event avec l'id this.id
  //   // On utilise l'action fetchEvent fourni par mapActions
  //   this.fetchEvent(this.id)
  // },
  // On retourne le state du module de store event que l'on
  // affecte dans event pour simplifier son utilisation dans
  // le template
  // computed: mapState({
  //   event: state => state.event.event
  // }),
  // On utilise mapActions pour importer dans le comosant
  //  l'action fetchEvent qui se trouve dans le namespace event
  // methods: mapActions('event', ['fetchEvent'])
}
</script>

<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
