<!-- Commented file -->
<template>
  <div id="nav" class="nav">
    <!-- On crée un lien qui appelle la route / qui est 
    la page d'accueil -->
    <router-link to="/" class="brand">Real World Events</router-link>
    <nav>
      <!-- On crée un lien qui appelle la route nommées event-list -->
      <router-link :to="{ name: 'event-list' }">List</router-link> |
      <router-link :to="{ name: 'event-create' }">Create</router-link> |
      <router-link :to="{ name: 'slots' }">Slots</router-link>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<!-- On implémente des styles scopés au composant 
grâce à l'attribut scoped -->
<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.nav > .brand {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #39b982;
  text-decoration: none;
}
.nav .nav-item {
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}
.nav .nav-item.router-link-exact-active {
  color: #39b982;
  border-bottom: solid 2px #39b982;
}
</style>
