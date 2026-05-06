# Pokemon App Workflow Documentation

This document explains how requests are processed in this application and identifies performance bottlenecks.

## Data Flow Diagram (DFD)

### 1. Application Initialization
*   **Entry Point**: `src/main.tsx`
    *   The app is wrapped in `Provider` (Redux) at line 18, `QueryClientProvider` (React Query) at line 19, and `ContextWrapper` (Custom Context).
*   **Loading State**: `src/App.tsx` (Line 13)
    *   A hardcoded 2-second `setTimeout` is used to show a loading spinner on every mount of the `App` component.

### 2. Main Pokemon List Fetching
*   **Trigger**: `context/TanstackContext.tsx` (Line 135)
    *   When the `url` state changes (initially set to base PokeAPI URL), `dispatch(fetchPokemons(url))` is called.
*   **Primary Fetch**: `redux/features/pokemonSlice.tsx` (Line 12)
    *   Fetches the list of Pokemon results (names and URLs).
*   **Individual Details Fetch**: `context/TanstackContext.tsx` (Lines 138-149)
    *   An `useEffect` watches for updates in `allPokemons.pokemon`.
    *   It maps over the results and dispatches `fetchEachPokemon(suii.url)` for every Pokemon in the list.
*   **State Management**: `redux/features/eachPokeSlice.tsx` (Lines 20-35)
    *   `pending`: Clears the `requiredData` array at line 22.
    *   `fulfilled`: Appends the fetched Pokemon data to `requiredData` at line 27.
*   **Data Consumption**: `src/ProductDetail.tsx` (Line 90, 240)
    *   Consumes `sortEach` (a sorted copy of `requiredData`) from `useContextProvider` to render cards.

### 3. Search Workflow
*   **Full List Fetch**: `hooks/useReactQuery.tsx` (Line 6)
    *   `fetchAllPokemons` fetches 100,000 Pokemons at once using React Query (Key: `"pokemon"`).
*   **Search Input**: `src/ProductDetail.tsx` (Line 119)
    *   `handleChange` is triggered on input. It filters the massive list from React Query.
*   **Detail Fetch for Search**: `src/ProductDetail.tsx` (Lines 133-134)
    *   For the top 20 search results, it performs direct `axios.get` calls and updates local state `setAllPokemons` for each result.

### 4. Side Card (Pokemon Details)
*   **Trigger**: `src/ProductDetail.tsx` (Lines 249, 298)
    *   Clicking a card triggers `handleClick`.
*   **Sequential Fetching**: `src/ProductDetail.tsx` (Lines 163, 167)
    *   Fetches species and evolution chain data sequentially using `await`.
*   **Display**: `src/SideCard.tsx`
    *   Renders the detailed view of the selected Pokemon.

---

## ISSUE

### 1. Performance Bottlenecks
*   **Forced UX Delay**: `src/App.tsx` (Line 13) uses `setTimeout` for 2 seconds, making the app feel slow even on fast connections.
*   **Massive Data Fetching**: `hooks/useReactQuery.tsx` (Line 6) fetches 100,000 Pokemons for search. This is a heavy payload for the browser and network.
*   **Array Clearing in Redux**: `redux/features/eachPokeSlice.tsx` (Line 22) resets the `requiredData` array to `[]` every time a new Pokemon detail request is *pending*. Since 20 requests are fired at once, this causes the UI to flicker and reset multiple times.
*   **Inefficient State Updates**: `src/ProductDetail.tsx` (Line 134) calls `setAllPokemons` inside a `map` loop. Each call triggers a full re-render of the component, leading to up to 20 re-renders in a few milliseconds.
*   **Sequential API Calls**: `src/ProductDetail.tsx` (Lines 163-167) awaits multiple independent API calls one after another instead of using `Promise.all`, increasing the wait time for the side card to appear.

### 2. Architectural Issues
*   **React Query Cache Key Collision**: `hooks/useReactQuery.tsx` (Line 42) uses a static string `"req_pokemons"` as a key. React Query will treat all Pokemon detail requests as the same query, leading to incorrect caching and unnecessary network traffic.
*   **Mixed Data Management**: The app uses Redux, React Query, and Local State for fetching similar types of data. This creates "source of truth" conflicts and makes the code harder to optimize.
*   **Bypassing Redux Safeguards**: `redux/app/store.tsx` (Lines 7-8) disables `immutableCheck` and `serializableCheck`, which can hide bugs related to direct state mutation.
*   **Direct DOM Manipulation**: `src/SideCard.tsx` (Lines 24-27) modifies `document.body.style.overflow` directly in a side effect, which might conflict with other components or libraries.
