import { lazy } from 'react'
import Search from '../pages/Search'
const LazyAboutPage = lazy(() => import('../pages/About.jsx'))

export const routes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: Search
  }
]  