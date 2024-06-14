import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'

// Band Forms and Lists
import BandForm from '../components/forms/bands/BandForm.vue'
import BandList from '../components/lists/bands/BandList.vue'
import BandMemberForm from '../components/forms/bands/BandMemberForm.vue'
import BandMemberList from '../components/lists/bands/BandMemberList.vue'
import InstrumentForm from '../components/forms/bands/InstrumentForm.vue'
import InstrumentList from '../components/lists/bands/InstrumentList.vue'

// Genre Forms and Lists
import GenreForm from '../components/forms/genres/GenreForm.vue'
import GenreList from '../components/lists/genres/GenreList.vue'
import StyleForm from '../components/forms/genres/StyleForm.vue'
import StyleList from '../components/lists/genres/StyleList.vue'
import SubGenreForm from '../components/forms/genres/SubGenreForm.vue'
import SubGenreList from '../components/lists/genres/SubGenreList.vue'

// Gig Forms and Lists
import FestivalForm from '../components/forms/gigs/FestivalForm.vue'
import FestivalList from '../components/lists/gigs/FestivalList.vue'
import GigForm from '../components/forms/gigs/GigForm.vue'
import GigList from '../components/lists/gigs/GigList.vue'
import SetlistForm from '../components/forms/gigs/SetlistForm.vue'
import SetlistList from '../components/lists/gigs/SetlistList.vue'
import VenueForm from '../components/forms/gigs/VenueForm.vue'
import VenueList from '../components/lists/gigs/VenueList.vue'

// Record Forms and Lists
import RecordForm from '../components/forms/records/RecordForm.vue'
import RecordList from '../components/lists/records/RecordList.vue'
import TracklistForm from '../components/forms/records/TracklistForm.vue'
import TracklistList from '../components/lists/records/TracklistList.vue'
import LabelList from '../components/lists/records/LabelList.vue'
import LabelForm from '@/components/forms/records/LabelForm.vue'

// User Forms
import AuthUserForm from '../components/forms/users/AuthUserForm.vue'
import RegisterUserForm from '../components/forms/users/RegisterUserForm.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  // Band Routes
  {
    path: '/bands',
    name: 'BandList',
    component: BandList
  },
  {
    path: '/bands/new',
    name: 'BandForm',
    component: BandForm
  },
  {
    path: '/band-members',
    name: 'BandMemberList',
    component: BandMemberList
  },
  {
    path: '/band-members/new',
    name: 'BandMemberForm',
    component: BandMemberForm
  },
  {
    path: '/instruments',
    name: 'InstrumentList',
    component: InstrumentList
  },
  {
    path: '/instruments/new',
    name: 'InstrumentForm',
    component: InstrumentForm
  },
  // Genre Routes
  {
    path: '/genres',
    name: 'GenreList',
    component: GenreList
  },
  {
    path: '/genres/new',
    name: 'GenreForm',
    component: GenreForm
  },
  {
    path: '/styles',
    name: 'StyleList',
    component: StyleList
  },
  {
    path: '/styles/new',
    name: 'StyleForm',
    component: StyleForm
  },
  {
    path: '/sub-genres',
    name: 'SubGenreList',
    component: SubGenreList
  },
  {
    path: '/sub-genres/new',
    name: 'SubGenreForm',
    component: SubGenreForm
  },
  // Gig Routes
  {
    path: '/festivals',
    name: 'FestivalList',
    component: FestivalList
  },
  {
    path: '/festivals/new',
    name: 'FestivalForm',
    component: FestivalForm
  },
  {
    path: '/gigs',
    name: 'GigList',
    component: GigList
  },
  {
    path: '/gigs/new',
    name: 'GigForm',
    component: GigForm
  },
  {
    path: '/setlists',
    name: 'SetlistList',
    component: SetlistList
  },
  {
    path: '/setlists/new',
    name: 'SetlistForm',
    component: SetlistForm
  },
  {
    path: '/venues',
    name: 'VenueList',
    component: VenueList
  },
  {
    path: '/venues/new',
    name: 'VenueForm',
    component: VenueForm
  },
  // Record Routes
  {
    path: '/records',
    name: 'RecordList',
    component: RecordList
  },
  {
    path: '/records/new',
    name: 'RecordForm',
    component: RecordForm
  },
  {
    path: '/tracklists',
    name: 'TracklistList',
    component: TracklistList
  },
  {
    path: '/tracklists/new',
    name: 'TracklistForm',
    component: TracklistForm
  },
  {
    path: '/labels',
    name: 'LabelList',
    component: LabelList
  },
  {
    path: '/labels/new',
    name: 'LabelForm',
    component: LabelForm
  },
  // User Routes
  {
    path: '/login',
    name: 'Login',
    component: AuthUserForm
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterUserForm
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
