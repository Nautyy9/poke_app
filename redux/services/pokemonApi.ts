import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { 
  fetchType, 
  singlePokemonData, 
  speciesType, 
  evolutionType 
} from "../../types";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemons: builder.query<fetchType, { offset: number; limit: number }>({
      query: ({ offset, limit }) => `pokemon?offset=${offset}&limit=${limit}`,
    }),
    getPokemonByName: builder.query<singlePokemonData, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonSpecies: builder.query<speciesType, string>({
      query: (name) => `pokemon-species/${name}`,
    }),
    getEvolutionChain: builder.query<evolutionType, string>({
      query: (url) => {
        // The URL is usually full: https://pokeapi.co/api/v2/evolution-chain/1/
        // We only need the relative part or handle absolute URLs
        if (url.startsWith("http")) {
          return { url };
        }
        return `evolution-chain/${url}`;
      },
    }),
  }),
});

export const { 
  useGetPokemonsQuery, 
  useGetPokemonByNameQuery,
  useLazyGetPokemonByNameQuery,
  useGetPokemonSpeciesQuery,
  useGetEvolutionChainQuery 
} = pokemonApi;
