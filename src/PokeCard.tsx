import React, { Suspense, lazy } from "react";
import { useGetPokemonByNameQuery } from "../redux/services/pokemonApi";
const Color = lazy(() => import("./Color"));

interface PokeCardProps {
  name: string;
  onClick: (data: any) => void;
}

function PokeCard({ name, onClick }: PokeCardProps) {
  const { data: poke, isLoading } = useGetPokemonByNameQuery(name);

  if (isLoading || !poke) {
    return (
      <div className="card h-40 justify-center w-60 lg+:w-80 rounded-xl shadow-md bg-white flex z-10 animate-pulse items-center">
        <div className="h-20 w-20 bg-gray-200 rounded-full"></div>
      </div>
    );
  }

  return (
    <div
      className="card h-40 justify-center w-60 lg+:w-80 rounded-xl shadow-md bg-white flex z-10 cursor-pointer outline-none hover:border-gray-300 hover:border-2 transition-all duration-75 ease-in relative"
      onClick={() =>
        onClick({
          id: poke.id,
          name: poke.name,
          height: poke.height,
          weight: poke.weight,
          abilities: poke.abilities,
          stats: poke.stats,
          types: poke.types,
        })
      }
    >
      <div className="flex justify-center flex-col relative items-center w-full gap-y-1">
        <img
          src={poke.sprites.front_default}
          alt={poke.name}
          className="absolute -top-[54px]"
        />
        <p className="text-gray-400 text-xs">N° {poke.id}</p>
        <p className="text-gray-900 font-medium capitalize">{poke.name}</p>
        <div className="text-sm flex gap-x-3 text-gray-800 mt-2">
          {poke.types.map((val) => (
            <Suspense
              key={val.slot}
              fallback={<div className="w-10 h-4 bg-gray-200 rounded animate-pulse"></div>}
            >
              <Color val={val} />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(PokeCard);
