import HomePage from '../pages/Home'
import AboutPage from '../pages/About'
import Search from '../pages/Search'

export const routes = [
  {
    path: '/',
    Component: HomePage
  },
  {
    path: '/about',
    Component: AboutPage
  },
  {
    path: '/search/:query',
    Component: Search
  }
]  