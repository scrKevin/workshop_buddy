import Vue from 'vue'

import '../imports/ui/plugins'

import App from '../imports/ui/App.vue'

// Import the router factory
import { RouterFactory, nativeScrollBehavior } from 'meteor/akryum:vue-router2'

// Create router instance
const routerFactory = new RouterFactory({
  mode: 'history',
  scrollBehavior: nativeScrollBehavior,
})

import './routes'

// import router from './routes'

Meteor.startup(() => {
  const router = routerFactory.create()
  new Vue({
    router,
    ...App,
  }).$mount('#app');
});

// Meteor.startup(() => {
//   // Vue.use(VueMeteorTracker)
//   new Vue({
//     router,
//     render: (h) => h(App),
//   }).$mount('#app');
// });