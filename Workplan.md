# Workplan: Migration to RTK Query

This document outlines the progress of improving the Pokemon App's data fetching and state management by transitioning from Redux Thunk and React Query to **RTK Query**.

## Completed Tasks

- [x] **Optimization of Search Logic**: Refactored `ProductDetail.tsx` to use RTK Query hooks and `Promise.all` for search results, eliminating unnecessary re-renders.
- [x] **Performance Fix: Decentralized Fetching**: Identified a major bottleneck where a centralized `requiredData` array in context caused 20+ global re-renders per page load. Refactored the architecture so each `PokeCard` handles its own fetching.
- [x] **UI/UX Polish**: Implemented skeleton loaders for Pokemon cards to improve perceived performance (FCP/LCP).
- [x] **Search Payload Optimization**: Optimized initial search master-list fetch to a realistic 2000 entries.
- [x] **Sequential Fetching Fix**: Refactored `handleClick` in `ProductDetail.tsx` to use RTK Query lazy hooks for side card details.
- [x] **API Infrastructure**: Created `redux/services/pokemonApi.ts` and integrated it into the central Redux store.
- [x] **Redundancy Cleanup**: Deleted legacy thunk slices and React Query hooks.
- [x] **UX Improvement**: Removed the forced 2-second loading delay in `App.tsx`.

---

## Technical Rationale: Decentralized vs. Centralized Fetching

The initial migration used a **Centralized** pattern (one central array in Context). This was slow because:
1. **Global Re-renders**: Adding one Pokemon to the array forced the entire app to re-render. With 20 Pokemon, this happened 20 times in ~500ms.
2. **Blocking UI**: The app stayed blank or showed a spinner until the list was aggregated.

The new **Decentralized** pattern (PokeCard-level fetching) is faster because:
1. **Isolated Re-renders**: When a Pokemon's data arrives, only its specific `PokeCard` re-renders.
2. **Immediate Feedback**: Users see the page structure and skeleton loaders instantly (improving FCP).
3. **Browser Efficiency**: The browser can manage the 20 concurrent requests more efficiently without the main thread being hammered by 20 global React updates.

---

## Analysis of Legacy/Commented Code
- **Direct DOM Manipulation**: Future work should address the `document.body.style.overflow` in `SideCard.tsx`.
