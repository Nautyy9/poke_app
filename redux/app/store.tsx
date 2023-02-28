import { configureStore } from "@reduxjs/toolkit"
import allPokemons from '../features/pokemonSlice'
import eachPokemons from '../features/eachPokeSlice'


const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
  reducer : {
    allPokemons,
    eachPokemons
  }

})
export default store