<!-- Commented file -->
<template>
  <!-- template ne doit contenir qu'un seule élément HTMl enfant, ici
  la div avec la classe icon-wrapper -->
  <div class="icon-wrapper">
    <!-- On a ici deux props pour gérer la hauteur et la largeur
    de notre svg -->
    <svg class="icon" :width="width" :height="height">
      <!-- On va cherche la ressource /feather-sprite.svg qui se trouve 
      dans le dossier public et on affiche le symbole avec l'id name
      car feather-sprite.svg et un svg qui regroupe plusieurs icones
      ou symboles avec chacun un id différent  -->
      <use v-bind="{ 'xlink:href': '/feather-sprite.svg#' + name }" />
    </svg>
    <!-- Le contenu entre les balises du composant est inclut à cette
    emplacement -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  // Déclare les props gérées par le composant
  props: {
    name: String,
    width: {
      // Les types autorisés pour cette props
      type: [Number, String],
      // On déclare une valeur par défaut
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    }
  }
}
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  font-weight: 600;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  margin-right: 6px;
}
</style>
