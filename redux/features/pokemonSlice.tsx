import {createSlice, PayloadAction}  from '@reduxjs/toolkit'
import {createAsyncThunk} from '@reduxjs/toolkit'
import { useAction } from '@tanstack/react-router'
import axios, { AxiosResponse } from 'axios'
import { fetchType, startState,  resArray, eachPokemon} from '../../types'

const initialState: startState = {
    pokemon:  {}  as (fetchType | Record<string, never>)  ,
    loading: false,
    error: '',
}

export const fetchPokemons= createAsyncThunk('poke/getPokemons', async(url : string) =>{
        return await (await axios.get(`${url}`).then((res: AxiosResponse<fetchType>) => res.data).catch((err) =>err))
})



const pokeSlice = createSlice({
    name: 'poke',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchPokemons.pending, (state) =>{
            state.pokemon = {},
            state.loading = true,
            state.error= ''
        })
        builder.addCase(fetchPokemons.fulfilled, (state,action: PayloadAction<fetchType>) =>{
            state.pokemon = action.payload,
            state.loading = false,
            state.error= ''
        })
        builder.addCase(fetchPokemons.rejected, (state, action) =>{
            state.pokemon = {},
            state.loading = false,
            state.error= action.payload
        })
    },
})
export const {} = pokeSlice.actions
// export const getAllPokemons = (state: reduxState) =>  state.pokemon.pokemon
// export const getIndPokemons = (state: any) => state.singlepok.pokemon
export default  pokeSlice.reducer 