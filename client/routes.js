/* /client/routes.js */

// Import the router
import { RouterFactory } from 'meteor/akryum:vue-router2'

// Components
import Login from '../imports/ui/components/Login.vue'
import Dashboard from '../imports/ui/components/Dashboard.vue'
import Settings from '../imports/ui/components/Settings.vue'
import Info from '../imports/ui/components/Info.vue'
import Orderables from '../imports/ui/components/Orderables.vue'
import StockLocations from '../imports/ui/components/StockLocations.vue'
import Products from '../imports/ui/components/Products.vue'

RouterFactory.configure(factory => {
  // Simple routes
  factory.addRoutes([
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
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
    },
    {
      path: '/stock',
      name: 'stock',
      component: StockLocations
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    }
  ])
})