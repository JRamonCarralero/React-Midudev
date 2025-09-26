import { useEffect, useState, Children } from "react"
import { EVENTS } from "../utils/consts"
import { match } from "path-to-regexp"

// eslint-disable-next-line no-unused-vars
export function Router({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)
    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'
    return isRoute ? props : null
  })

  console.log(routesFromChildren)

  const routesToUse = routes.concat(routesFromChildren)

  console.log(routesToUse)

  const Page = routesToUse.find(route => {
    if (route.path === currentPath) return true

    // usamos path-to-regex para las rutas dinámicas
    const matcherUrl = match(route.path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false

    routeParams = matched.params

    return true

  })?.Component

  return Page ? <Page routeParams={routeParams}/> : <DefaultComponent routeParams={routeParams} />
}