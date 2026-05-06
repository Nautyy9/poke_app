# Workplan: Migration to RTK Query

This document outlines the progress of improving the Pokemon App's data fetching and state management by transitioning from Redux Thunk and React Query to **RTK Query**.

## Completed Tasks

- [x] **Optimization of Search Logic**: In `ProductDetail.tsx`, the `handleChange` function was refactored to use `Promise.all` for fetching the top 20 search results. This prevents up to 20 unnecessary re-renders that occurred when updating state inside a `map` loop.
- [x] **Fix Flickering in Pokemon List**: In `eachPokeSlice.tsx`, the `requiredData` array is now cleared only when a new main list fetch starts (`fetchPokemons.pending`), rather than on every individual Pokemon fetch. This provides a smoother UI transition between pages.
- [x] **Initial Caching Implementation**: Basic manual caching was added to `pokemonSlice.tsx` and `eachPokeSlice.tsx` using local `listCache` and `detailCache` objects to avoid redundant network requests for previously fetched data.
- [x] **Search Payload Optimization**: In `useReactQuery.tsx`, the `fetchAllPokemons` query was adjusted to fetch a realistic number of Pokemon (2000) instead of a massive 100,000, reducing initial load time and memory usage.
- [x] **Sequential Fetching Fix**: In `ProductDetail.tsx`, some sequential `await` calls were identified and optimized to run more efficiently where possible (though further refinement is planned with RTK Query).

---

## Planned Tasks (RTK Query Migration)

### 1. API Infrastructure
- [ ] Create `redux/services/pokemonApi.ts` using `createApi`.
- [ ] Define endpoints:
    - `getPokemons`: Replaces `fetchPokemons` thunk.
    - `getPokemonByName`: Replaces `fetchEachPokemon` thunk and direct `axios` calls in Search.
    - `getPokemonSpecies`: For side card details.
    - `getEvolutionChain`: For side card details.
- [ ] Configure `store.tsx` to include the `pokemonApi` reducer and middleware.

### 2. Context & Slice Refactoring
- [ ] Refactor `TanstackContext.tsx` to use RTK Query hooks (e.g., `useGetPokemonsQuery`).
- [ ] Remove `pokemonSlice.tsx` and `eachPokeSlice.tsx` as their state will be managed by RTK Query's cache.
- [ ] Update `useContextProvider` to expose data from RTK Query hooks.

### 3. Component Updates
- [ ] **Search Refactoring**: Update `ProductDetail.tsx` to use RTK Query hooks for fetching search results instead of the current `useQuery` + `axios` mix.
- [ ] **Side Card Refactoring**: Update `handleClick` in `ProductDetail.tsx` to use RTK Query hooks or manual triggers for species and evolution data, utilizing `Promise.all` via RTK Query's features.

### 4. Cleanup
- [ ] Remove `react-query` dependency and `hooks/useReactQuery.tsx`.
- [ ] Cleanup commented-out code and legacy thunks.

---

## Technical Rationale: Why RTK Query?

The project is moving from a mixed approach (**Redux Thunk + React Query + Local State**) to a unified **RTK Query** approach for several key reasons:

1.  **Unified Source of Truth**: Currently, data is split between Redux state (`requiredData`) and React Query cache. RTK Query keeps everything in the Redux store, making debugging and state management more predictable.
2.  **Automatic Caching & Invalidation**: RTK Query handles caching, polling, and revalidation out of the box. The current manual `listCache` and `detailCache` are temporary "band-aids" that RTK Query replaces with a robust, standard system.
3.  **Reduced Boilerplate**: We can remove entire slices, action types, and complex `extraReducers`. RTK Query generates hooks automatically, significantly reducing the amount of code to maintain.
4.  **Optimized Performance**: RTK Query's internal mechanisms (like tracking component subscriptions) ensure that data is only fetched when needed and shared efficiently across components.
5.  **Better TypeScript Integration**: RTK Query provides excellent type safety for request parameters and response data, reducing the risk of runtime errors compared to manual `axios` calls.

---

## Analysis of Legacy/Commented Code

- **Direct DOM Manipulation**: Commented-out code in `SideCard.tsx` shows direct body overflow manipulation. We should prefer React-way or standard CSS for modal behaviors.
- **Manual Reducer Management**: `ProductDetail.tsx` has a commented-out `useReducer` for side card state. RTK Query can simplify this by providing standardized `isLoading` and `data` states.
- **TanStack Router**: References to TanStack Router in `TanstackContext.tsx` suggest a previous exploration of a more complex routing setup. For now, we are focusing on optimizing data flow within the current structure.
