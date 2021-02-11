/* /client/routes.js */

// Import the router
import { RouterFactory } from 'meteor/akryum:vue-router2'

// Components
import Login from '../imports/ui/components/Login.vue'
import Settings from '../imports/ui/components/Settings.vue'
import Info from '../imports/ui/components/Info.vue'
import Orderables from '../imports/ui/components/Orderables.vue'

RouterFactory.configure(factory => {
  // Simple routes
  factory.addRoutes([
    {
      path: '/',
      name: 'info',
      component: Info,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/orderables',
      name: 'orderables',
      component: Orderables
    }
  ])
})