import { useState, useEffect } from "react"

export function useCatImage ({ fact }) { 
  const [imageUrl, setImageUrl] = useState()

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

  return { imageUrl }
}