import React, {
  createContext,
  useContext,
  useState,
  useMemo,
} from "react";
import { singlePokemonData } from "../types";
import { useGetPokemonsQuery, useGetPokemonByNameQuery } from "../redux/services/pokemonApi";

type ChildType = {
  children: React.ReactNode;
};

function PokemonDetailWrapper({ name, onLoaded }: { name: string; onLoaded: (data: singlePokemonData) => void }) {
  const { data } = useGetPokemonByNameQuery(name);
  useMemo(() => {
    if (data) onLoaded(data);
  }, [data, onLoaded]);
  return null;
}

function ContextWrapper({ children }: ChildType) {
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const { data: listData, isLoading, isFetching } = useGetPokemonsQuery({ offset, limit });
  const [requiredData, setRequiredData] = useState<singlePokemonData[]>([]);

  // Clear and update requiredData when page changes
  useMemo(() => {
    if (listData) {
      setRequiredData([]);
    }
  }, [offset, listData]);

  const handlePokemonLoaded = useMemo(() => (data: singlePokemonData) => {
    setRequiredData((prev) => {
      if (prev.find(p => p.id === data.id)) return prev;
      const newArr = [...prev, data];
      return newArr.sort((a, b) => a.id - b.id);
    });
  }, []);

  const triggerUrlUpdate = () => {
    if (listData?.next) setOffset((prev) => prev + limit);
  };

  const goBack = () => {
    if (offset > 0) setOffset((prev) => Math.max(0, prev - limit));
  };

  const gotoFirst = () => {
    setOffset(0);
  };

  const value = {
    sortEach: requiredData,
    allPokemons: { loading: isLoading || isFetching },
    triggerUrlUpdate,
    gotoFirst,
    initialButton: offset > 0,
    prevButton: offset > 0,
    goBack,
    requiredData,
  };

  return (
    <authContext.Provider value={value}>
      {listData?.results.map((p) => (
        <PokemonDetailWrapper key={p.name} name={p.name} onLoaded={handlePokemonLoaded} />
      ))}
      {children}
    </authContext.Provider>
  );
}

const contextType = () => {
  const sortEach: singlePokemonData[] = [];
  const allPokemons: any = {};
  function triggerUrlUpdate() {}
  function gotoFirst() {}
  function goBack() {}
  const initialButton: boolean = false;
  const prevButton: boolean = false;
  const requiredData: singlePokemonData[] = [];

  return {
    triggerUrlUpdate,
    gotoFirst,
    goBack,
    initialButton,
    prevButton,
    sortEach,
    allPokemons,
    requiredData
  };
};

type authRoute = ReturnType<typeof contextType>;

export const authContext = createContext<authRoute>(null!);
export const useContextProvider = () => useContext(authContext);
export default ContextWrapper;
