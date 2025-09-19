import { useState, useEffect } from "react"

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`

export function App () {
  const [fact, setFact] = useState()

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)

        const firstWord = fact.split(' ')[0]
        const endpoint = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
        fetch(endpoint)
          .then(res => res.json())
          .then(data => {
            console.log(data)
          })
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <main>
      <h1>App de Gatitos</h1>
      {fact && <p>{fact}</p>}
    </main>
  )
}