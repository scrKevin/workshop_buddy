/* /client/routes.js */

// Import the router
import { RouterFactory } from 'meteor/akryum:vue-router2'

// Components
import Settings from '../imports/ui/components/Settings.vue'
import Info from '../imports/ui/components/Info.vue'

RouterFactory.configure(factory => {
  // Simple routes
  factory.addRoutes([
    {
      path: '/',
      name: 'info',
      component: Info,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
  ])
})