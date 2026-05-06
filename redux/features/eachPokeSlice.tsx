import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { createAsyncThunk } from "@reduxjs/toolkit/dist/createAsyncThunk"
import axios, { AxiosResponse } from "axios"
import {eachPokemon, singlePokemonData} from '../../types'
import { fetchPokemons } from "./pokemonSlice"

const initialState : eachPokemon= {
    loading: false,
    error: '',
    requiredData: [] 
}

// Cache for individual pokemon details
const detailCache: Record<string, singlePokemonData> = {};

export const fetchEachPokemon= createAsyncThunk('singlePokemon/fetchEachPokemon', async(url:string)  =>{
    if (detailCache[url]) {
        return detailCache[url];
    }
    const data = await axios.get(url).then((res: AxiosResponse<singlePokemonData>) => res.data).catch((err) =>err);
    if (data && !data.message) { // Ensure it's not an error response
        detailCache[url] = data;
    }
    return data;
})

const singlePokeSlice = createSlice({
    name: 'singlePokemon',
    initialState,
    reducers:{},
    extraReducers : (builder)  =>{
        // Optimization: Clear the array ONCE when a new page starts loading
        builder.addCase(fetchPokemons.pending, (state) => {
            state.requiredData = []
        })

        builder.addCase(fetchEachPokemon.pending, (state) =>{
            // state.requiredData = [], // ISSUE: Clearing array on every individual fetch causes flickering
            state.loading = true,
            state.error= ''
        })
        builder.addCase(fetchEachPokemon.fulfilled, (state ,action :PayloadAction<singlePokemonData>) =>{   
            // We concatenate here to build the 20 results for the CURRENT page
            state.requiredData = [...state.requiredData, action.payload]
            state.loading = false,
            state.error= ''
        })
        builder.addCase(fetchEachPokemon.rejected, (state, action ) =>{
            
            state.requiredData = []
            state.loading = false,
            state.error= action.payload
        })
    }

})

export default singlePokeSlice.reducer
