import { useState, useEffect, use } from "react"
import "./App.css"

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  // get random cat fact
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
      .catch(err => console.error(err))
  }, [])

  // get image from fact's first word
  useEffect(() => {
    if (!fact) return
    
    const firstWord = fact.split(' ')[0]
    const url = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const { url } = data
        setImageUrl(url)
      })
      .catch(err => console.error(err))
  }, [fact])

  return (
    <main>
      <h1>App de Gatitos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`Image extracted using the first word ${fact}`} />}
    </main>
  )
}