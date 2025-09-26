import './App.css'
import { Router } from './components/Router'
import { routes } from './utils/routes'
import { Route } from './components/Route'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import Page404 from './pages/404'

function App() {
  return (
    <main>
      <Router routes={routes} defaultComponent={Page404} >
        <Route path='/' Component={HomePage} />
        <Route path='/about' Component={AboutPage} />
      </Router>
    </main>
    
  )
}

export default App
