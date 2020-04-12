<!-- Commented file -->
<template>
  <!-- On crée un lien qui appelle la route event-show et
  passe un paramètre d'URL id dans params -->
  <router-link
    class="event-link"
    :to="{ name: 'event-show', params: { id: event.id } }"
  >
    <div class="event-card -shadow">
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h4 class="title">{{ event.title }}</h4>
      <!-- Le composant BaseIcon est importé globalement il n'a donc
      pas besoin d'être importé dans ce composant, on peut l'utiliser
      directement. 
      Ce qui ce trouve entre les deux balises du composant
      sera placé dans le slot du composant, inclure du contenu
      entre les deux balises est optionnel. 
      La props name permet d'afficher le symbole du svg avec l'id users-->
      <BaseIcon name="users">{{ event.attendees.length }} attending</BaseIcon>
    </div>
  </router-link>
</template>

<script>
export default {
  // On déclare une props event qui doit être de type Object
  props: {
    event: Object
  }
}
</script>

<style scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}
.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
