import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { createAsyncThunk } from "@reduxjs/toolkit/dist/createAsyncThunk"
import axios, { AxiosResponse } from "axios"
import {eachPokemon, singlePokemonData} from '../../types'
const initialState : eachPokemon= {
    loading: false,
    error: '',
    requiredData: [] 
}

export const fetchEachPokemon= createAsyncThunk('singlePokemon/fetchEachPokemon', async(url:string)  =>{
    return await (await axios.get(url).then((res: AxiosResponse<singlePokemonData>) => res.data).catch((err) =>err))
})

const singlePokeSlice = createSlice({
    name: 'singlePokemon',
    initialState,
    reducers:{},
    extraReducers : (builder)  =>{
        builder.addCase(fetchEachPokemon.pending, (state) =>{
            
            state.requiredData = [],
            state.loading = true,
            state.error= ''
        })
        builder.addCase(fetchEachPokemon.fulfilled, (state ,action :PayloadAction<singlePokemonData>) =>{   
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
