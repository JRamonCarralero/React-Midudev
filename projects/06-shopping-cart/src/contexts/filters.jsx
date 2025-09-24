import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const FiltersContext = createContext()

export function FiltersProvider ({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  return (
    <FiltersContext.Provider value={{
      filters,
      setFilters
    }}>
      {children}
    </FiltersContext.Provider>
  )
}