// Commented file

import Vue from 'vue'

// On importe des fonctions de lodash
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import App from './App.vue'
import router from './router'
import store from './store/store'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

// require.context(
//   directory: String,
//   includeSubdirs: Boolean /* optional, default true */,
//   filter: RegExp /* optional, default /^\.\/.*$/, any file */,
//   mode: String  /* optional, 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once', default 'sync' */
// )
// Permet de Spécifier un groupe entier de composants à importer à l'aide
// d'un chemin d'accès à un répertoire, ici ./components. On importe
// tous les fichiers qui commencent par Base et ont pour extension
// .vue ou .js
// Un objet avec pour clés les noms des fichiers qui matchent est retourné
const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

// On récupère la liste des clés et donc des noms des fichiers
// que l'on souhaite importer globalement
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  // Comme les fichiers peuvent avoir un nom avec des tirets
  // on s'assure que le composant importé aura un nom en camelCase
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  Vue.component(componentName, componentConfig.default || componentConfig)
})

// On injecte router et store pour pouvoir les utiliser
// dans notre application
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
