import React, {
  createContext,
  useContext,
  useState,
} from "react";
import { useGetPokemonsQuery } from "../redux/services/pokemonApi";

type ChildType = {
  children: React.ReactNode;
};

function ContextWrapper({ children }: ChildType) {
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const { data: listData, isLoading, isFetching } = useGetPokemonsQuery({ offset, limit });

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
    listData,
    isLoading: isLoading || isFetching,
    triggerUrlUpdate,
    gotoFirst,
    initialButton: offset > 0,
    prevButton: offset > 0,
    goBack,
  };

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
}

const contextType = () => {
  const listData: any = null;
  const isLoading: boolean = false;
  function triggerUrlUpdate() {}
  function gotoFirst() {}
  function goBack() {}
  const initialButton: boolean = false;
  const prevButton: boolean = false;

  return {
    triggerUrlUpdate,
    gotoFirst,
    goBack,
    initialButton,
    prevButton,
    listData,
    isLoading,
  };
};

type authRoute = ReturnType<typeof contextType>;
export const authContext = createContext<authRoute>(null!);
export const useContextProvider = () => useContext(authContext);
export default ContextWrapper;
