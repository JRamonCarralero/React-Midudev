import './App.css'

import { lazy, Suspense } from 'react'

import { Router } from './components/Router'
import { routes } from './utils/routes'
import { Route } from './components/Route'

import Page404 from './pages/404'

const LazyHomePage = lazy(() => import('./pages/Home.jsx')) 
const LazyAboutPage = lazy(() => import('./pages/About.jsx'))

function App() {
  return (
    <main>
      {/* Usamos suspense para mostrar un loading mientras se carga el componente con lazy */}
      <Suspense fallback={<div>Loading...</div>}>
        <Router routes={routes} defaultComponent={Page404} >
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
    
  )
}

export default App
