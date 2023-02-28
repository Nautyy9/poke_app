import axios from "axios";
import { useQuery } from "react-query";

async function fetchAllPokemons (){
    return (await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0").then(res => res.data).catch(err => err))
} 

async function fetchSidePokemons (count: number){
    return (await axios.get(``).then(res => res.data).catch(err => err))
} 

export async function pokemonResult (url: string){
    return (await axios.get(`${url}`).then(res => res.data).catch(err => err))
} 

export function getAllPokemons () {
    return useQuery("pokemon" , fetchAllPokemons)
}


export  function sideDetails (count: number) {
    return useQuery("sidepokemonns" , () => fetchSidePokemons(count))
}

export  function getRequiredPokemon (url: string) {
    const onSuccess = () =>{
        console.log('fetching')
    }
    const onError = () =>{
        console.log('error fetching')
    }

    const {data} =   useQuery("req_pokemons", () =>  pokemonResult(url),{
        onSuccess,
        onError,
        enabled: !!url
    })
    return data
    
} 
