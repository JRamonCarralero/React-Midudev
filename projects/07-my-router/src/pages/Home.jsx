import { Link } from '../components/Link'

export default function HomePage () {
  return (
    <>
      <h1>Home</h1>
      <p>Esta es una página para crear un ejemplo de React Rputer desde cero</p>
      <Link to='/about'>Ir a Sobre Nosotros</Link>
    </>
  )
}