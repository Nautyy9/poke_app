# Workplan: Migration to RTK Query

This document outlines the progress of improving the Pokemon App's data fetching and state management by transitioning from Redux Thunk and React Query to **RTK Query**.

## Completed Tasks

- [x] **Optimization of Search Logic**: Refactored `ProductDetail.tsx` to use RTK Query hooks and `Promise.all` for search results, eliminating unnecessary re-renders.
- [x] **Fix Flickering in Pokemon List**: Migrated pagination to RTK Query in `TanstackContext.tsx`, ensuring smooth state transitions and automatic cache management.
- [x] **Search Payload Optimization**: Optimized initial search master-list fetch to a realistic 2000 entries.
- [x] **Sequential Fetching Fix**: Refactored `handleClick` in `ProductDetail.tsx` to use RTK Query lazy hooks, improving the speed of loading side card details.
- [x] **API Infrastructure**: Created `redux/services/pokemonApi.ts` with comprehensive endpoints and integrated it into the central Redux store.
- [x] **Redundancy Cleanup**: Deleted legacy thunk slices (`pokemonSlice.tsx`, `eachPokeSlice.tsx`) and React Query hooks (`useReactQuery.tsx`).
- [x] **Provider Cleanup**: Removed `QueryClientProvider` and React Query devtools from `main.tsx`.
- [x] **UI Polish**: Refactored `Color.tsx` to use a cleaner mapping object for types.
- [x] **UX Improvement**: Removed the forced 2-second loading delay in `App.tsx`.

---

## Technical Rationale: Why RTK Query?

The project has moved from a fragmented approach to a unified **RTK Query** architecture for the following reasons:

1.  **Unified Source of Truth**: Data is now managed exclusively through the Redux store via RTK Query, eliminating cache synchronization issues between Redux and React Query.
2.  **Automatic Caching**: RTK Query handles all caching out-of-the-box, replacing the manual, error-prone `listCache` and `detailCache` implementations.
3.  **Significant Code Reduction**: By removing manual slices and thunks, the codebase is now much leaner and easier to maintain.
4.  **Declarative Data Fetching**: Using generated hooks (e.g., `useGetPokemonsQuery`) makes the data flow in components much more readable and predictable.
5.  **Built-in State Management**: RTK Query automatically provides `isLoading`, `isFetching`, and `error` states, removing the need for manual state tracking in slices.

---

## Analysis of Legacy/Commented Code

- **Direct DOM Manipulation**: Future work should further address the direct `document.body.style.overflow` manipulation in `SideCard.tsx` by using a more idiomatic React approach.
- **Side Card Complexity**: While data fetching is now optimized, the `SideCard.tsx` component still contains significant layout duplication between mobile and desktop views that can be further refactored.
