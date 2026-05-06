import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { fetchType, startState } from "../../types";

const initialState: startState = {
  pokemon: {} as fetchType | Record<string, never>,
  loading: false,
  error: "",
};

// Simple cache for main list results
const listCache: Record<string, fetchType> = {};

export const fetchPokemons: any = createAsyncThunk(
  "poke/getPokemons",
  async (url: string, { rejectWithValue }) => {
    // Check cache first
    if (listCache[url]) {
      return listCache[url];
    }
    
    try {
      const res = await axios.get(`${url}`);
      const resData = await res.data;
      listCache[url] = resData; // Store in cache
      return resData;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const pokeSlice = createSlice({
  name: "poke",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.pending, (state) => {
      (state.pokemon = {}), (state.loading = true), (state.error = "");
    });
    builder.addCase(
      fetchPokemons.fulfilled,
      (state, action: PayloadAction<fetchType>) => {
        (state.pokemon = action.payload),
          (state.loading = false),
          (state.error = "");
      }
    );
    builder.addCase(fetchPokemons.rejected, (state, action) => {
      (state.pokemon = {}),
        (state.loading = false),
        (state.error = action.payload);
    });
  },
});
export const {} = pokeSlice.actions;
// export const getAllPokemons = (state: reduxState) =>  state.pokemon.pokemon
// export const getIndPokemons = (state: any) => state.singlepok.pokemon
export default pokeSlice.reducer;
