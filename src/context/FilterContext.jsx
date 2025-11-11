import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  return (
    <FilterContext.Provider value={{ query, setQuery, genre, setGenre, year, setYear }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  return useContext(FilterContext);
}
