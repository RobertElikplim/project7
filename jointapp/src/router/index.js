import { createRouter, createWebHistory } from 'vue-router'
import Charts from '../summary/perProgram.vue'

var routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../components/Home')
    },
    {
        path: '/intakeClient',
        name: 'intakeClient',
        component: () => import('../components/client/ClientIntakeForm')
    },
    {
        path: '/intakeEvent',
        name: 'intakeEvent',
        component: () => import('../components/event/CreateEventIntake')
    },
    {
        path: '/editEvent/:id',
        name: 'editEvent',
        component: () => import('../components/event/EditEvent')
    },
    {
        path: '/familyCenter',
        name: 'familyCenter',
        component: () => import('../components/cfc/familyCenter')
    },
    {
        path: '/showClients',
        name: 'showClients',
        component: () => import('../components/client/showClients')
    },
    {
        path: '/showClientsBol',
        name: 'showClientsBol',
        component: () => import('../components/client/showClientsBol')
    },
    {
        path: '/editClient/:id',
        name: 'editClient',
        component: () => import('../components/client/editClient')
    },
    {
        path: '/registerEvent/:id',
        name: 'registerEvent',
        component: () => import('../components/event/registerEvent')
    },
    {
        path: '/summary',
        name: 'summary',
        component: () => import('../components/cfc/Summary')
    },
    {
        path: '/eventAttended/:id',
        name: 'eventAttended',
        component: () => import('../components/event/eventAttended')
    },
    {
        path: '/activity/:id',
        name: 'activity',
        component: () => import('../components/cfc/activity')
    },
    {
        path: '/addFamily/:id',
        name: 'addFamily',
        component: () => import('../components/cfc/addFamily')
    },
    {
        path: '/editFamily/:id',
        name: 'editFamily',
        component: () => import('../components/cfc/editFamily')
    },
    {
        path: '/programSummary',
        name: 'programSummary',
        component: Charts
    },
    {
        path: '/graphc',
        name: 'graphc',
        component: () => import('../components/graphsCFC')
    },
    {
        path: '/graphb',
        name: 'graphb',
        component: () => import('../components/graphsBOL')
    },
    {
        path: '/firstTime',
        name: 'firstTime',
        component: () => import('../components/event/firstTime')
    },
]

// use router to create our application
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes // short for `routes: routes`
  })
  
  // export the router
  export default router