// Commented file

import Vue from 'vue'

// On importe vue-router
import Router from 'vue-router'

// On importe les composants views (ou pages si on veut)
// qui vont s'afficher selon les routes
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import Slots from './views/Slots.vue'

import NProgress from 'nprogress'
import store from '@/store/store'
import NotFound from './views/NotFound.vue'
import NetworkIssue from './views/NetworkIssue.vue'

import ExampleFormValidation from './views/ExampleFormValidation.vue'

// On déclare à notre instance de vue que l'on va utiliser vue-router
Vue.use(Router)

// On exporte une instance de Router
const router = new Router({
  // On utilise le mode history pour avoir des URLs classique
  // sans # à la racine
  mode: 'history',
  // On crée notre tableau de routes
  routes: [
    {
      path: '/',
      // On nomme notre route pour l'utiliser dans les links
      name: 'event-list',
      // On déclare le composant que l'on souhaite afficher avec cette URL
      // Si il y a un <router-view /> dans le template le composant sera
      // affiché à cette emplacement
      component: EventList,
      props: true
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/slots',
      name: 'slots',
      component: Slots
    },
    {
      path: '/vuelidate',
      component: ExampleFormValidation
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      // On déclare que les paramètres de l'URL, ici id sera passé
      // en props avec le nom id plutôt que d'utiliser
      // l'objet $route.params.id
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch('event/fetchEvent', routeTo.params.id)
          .then(event => {
            routeTo.params.event = event
            next()
          })
          .catch(error => {
            if (error.response && error.response.status == 404) {
              next({ name: '404', params: { resource: 'event' } })
            } else {
              next({ name: 'network-issue' })
            }
          })
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } }
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
