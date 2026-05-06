import React, { useState, lazy, Suspense } from "react";
import { FaSearch } from "react-icons/fa";
import {
  CardType,
  resArray,
  singlePokemonData,
} from "../types";
import { useContextProvider } from "../context/TanstackContext";
import { 
  useGetPokemonsQuery, 
  useLazyGetPokemonByNameQuery,
  useLazyGetPokemonSpeciesQuery,
  useLazyGetEvolutionChainQuery
} from "../redux/services/pokemonApi";
import PokeCard from "./PokeCard";
const Color = lazy(() => import("./Color"));
const SideCard = lazy(() => import("./SideCard"));

const colors = {
  normal: "#bcbcac",
  grass: "#78cd54",
  fighting: "#bc5442",
  flying: "#87CEEB",
  poison: "#ab549d",
  ground: "#debc54",
  rock: "#bcac66",
  bug: "#abbc1c",
  ghost: "#702963",
  steel: "#4682B4",
  fire: "#ff421c",
  water: "#00FFFF",
  electric: "#FFEA00",
  psychic: "#D27D2D",
  ice: "#F0FFFF",
  dragon: "#FFC300",
  dark: "#A9A9A9",
  fairy: "#ffacff",
  shadow: "#343434",
  unknowm: "#ab549d",
};

function ProductDetail() {
  const {
    goBack,
    triggerUrlUpdate,
    gotoFirst,
    listData,
    isLoading: listLoading,
    initialButton,
    prevButton,
  } = useContextProvider();

  const [searchInput, setInputSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<singlePokemonData[]>([]);
  const [sideCard, setSideCard] = useState<CardType | null>(null);
  const [display, setDisplay] = useState<boolean>(false);
  const [nodataText, setNodataText] = useState<string>(
    "Select a Pokemon to display here."
  );
  const [img, setImg] = useState("");
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const { data: allNamesData } = useGetPokemonsQuery({ offset: 0, limit: 2000 });
  const [fetchPokemonDetail] = useLazyGetPokemonByNameQuery();
  const [fetchSpecies] = useLazyGetPokemonSpeciesQuery();
  const [fetchEvolution] = useLazyGetEvolutionChainQuery();

  function debounce(
    func: (e: React.ChangeEvent<HTMLInputElement>) => void,
    timeout = 300
  ) {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputSearch(value);
    if (!value) {
      setSearchResults([]);
      return;
    }

    if (allNamesData?.results) {
      const filtered = allNamesData.results.filter((val: resArray) =>
        val.name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 20);

      const details = await Promise.all(
        filtered.map((p) => fetchPokemonDetail(p.name).unwrap())
      );
      setSearchResults(details);
    }
  }

  const processChange = debounce(handleChange, 500);

  async function handleCardClick(data: any) {
    try {
      setNodataText("");
      setDisplay(true);
      setIsDetailLoading(true);

      const species = await fetchSpecies(data.name).unwrap();
      const description = species.flavor_text_entries.find(e => e.language.name === "en")?.flavor_text || "No description available.";
      
      const evolution = await fetchEvolution(species.evolution_chain.url).unwrap();
      
      const evolutionFormat1 = evolution?.chain?.species?.name;
      const evolutionFormat2 = evolution?.chain?.evolves_to[0]?.species?.name;
      const evolutionFormat3 = evolution?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name;

      const getId = (url: string) => url.split("/").filter(Boolean).pop();
      
      const image1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getId(evolution.chain.species.url)}.png`;
      const image2 = evolution.chain.evolves_to[0] 
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getId(evolution.chain.evolves_to[0].species.url)}.png` 
        : "";
      const image3 = evolution.chain.evolves_to[0]?.evolves_to[0]
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getId(evolution.chain.evolves_to[0].evolves_to[0].species.url)}.png`
        : "";

      setSideCard({
        evolutionName: {
          name1: evolutionFormat1!,
          name2: evolutionFormat2 || "",
          name3: evolutionFormat3 || "",
        },
        targetName: data.name,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities,
        stats: data.stats,
        description,
        evolvesFrom: evolutionFormat2 || "",
        evolvesTo: evolutionFormat3 || "",
        images: { image1, image2, image3 },
        id: data.id,
        type: data.types[0].type.name,
      });

      setImg(data.id < 650 
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.id}.gif`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${data.id}.png`
      );
      
      setIsDetailLoading(false);
    } catch (e) {
      console.error(e);
      setIsDetailLoading(false);
      setSideCard(null);
      setImg("pokeball.png");
      setNodataText("No Data Available For This Pokemon");
    }
  }

  return (
    <div className="relative flex flex-col gap-y-20 ">
      <img src="pokeball-icon.png" className="fixed -left-20 -top-20"></img>
      <div className="h-16 w-11/12 md+:w-5/6 lg:w-[57%] mx-auto lg:ml-[100px] 2xl:ml-[200px] shadow-md  rounded-xl text-gray-600 outline-none relative z-10 mt-10">
        <input
          type="text"
          name="search"
          className="h-full w-full px-2 rounded-xl text-gray-800 tracking-wide font-medium text-lg outline-none focus:border-gray-300 border-2 border-transparent transition relative"
          placeholder="Search your pokemon"
          onChange={processChange}
        />
        <FaSearch className="absolute top-1/2 -translate-y-1/2 right-5 h-9 w-9 text-white bg-red-400  shadow-red-400 shadow-lg  p-2 rounded-xl cursor-not-allowed" />
      </div>
      <div>
        <div className="flex  justify-center w-full  lg:justify-start ">
          <div className="flex flex-col justify-center items-center lg:items-start mx-5  ">
            <div className="flex flex-wrap  mb-10 w-full   lg:w-[57%] transition-transform duration-300 ease-in-out gap-x-5  xl:gap-x-10  gap-y-20 md+:mx-10  2xl:mx-20 justify-center items-center  text-lg ">
              {searchInput ? (
                searchResults.map((poke: singlePokemonData) => (
                  <div
                    key={poke.id}
                    className="card h-40 justify-center w-60 lg+:w-80  rounded-xl  shadow-md bg-white flex z-10 cursor-pointer outline-none sm:mx-5 md:mx-0 lg:mx-0  hover:border-gray-300 hover:border-2 transition-all duration-75 ease-in relative "
                    onClick={() => handleCardClick(poke)}
                  >
                    <div className="flex justify-center flex-col relative items-center w-full gap-y-1 ">
                      <img
                        src={poke.sprites.front_default}
                        alt="poke_image"
                        className="absolute  -top-[54px] "
                      />
                      <p className="text-gray-400 text-xs">N° {poke.id}</p>
                      <p className="text capitalize font-medium text-gray-900">{poke.name}</p>
                      <div className="text-sm flex gap-x-3 text-gray-800 mt-2">
                        {poke.types.map((val) => (
                          <Suspense
                            key={val.slot}
                            fallback={<div className="w-10 h-4 bg-gray-200 rounded"></div>}
                          >
                            <Color val={val} />
                          </Suspense>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : listData?.results ? (
                listData.results.map((p: resArray) => (
                  <PokeCard key={p.name} name={p.name} onClick={handleCardClick} />
                ))
              ) : listLoading ? (
                Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="card h-40 justify-center w-60 lg+:w-80 rounded-xl shadow-md bg-white flex z-10 animate-pulse items-center">
                    <div className="h-20 w-20 bg-gray-200 rounded-full"></div>
                  </div>
                ))
              ) : null}
            </div>
            {!searchInput && listData && (
              <div className="w-full flex-wrap gap-y-5 sm:w-11/12 md+:w-5/6 lg:w-[57%]  z-20 mb-10 text-center gap-x-4 sm:gap-x-10 flex justify-center  items-center">
                {initialButton && (
                  <button
                    className="bg-red-600  rounded-xl text-white shadow-md shadow-red-800 w-40 text-base px-3  lg:px-5 py-3"
                    onClick={gotoFirst}
                  >
                    First Page
                  </button>
                )}
                {prevButton && (
                  <button
                    className="bg-gray-600 rounded-xl text-white shadow-md shadow-gray-800 w-40 text-base px-3  lg:px-5 py-3"
                    onClick={goBack}
                  >
                    Previous Page
                  </button>
                )}
                <button
                  className="bg-green-400 shadow-md z-20 shadow-green-500 rounded-xl w-40 text-base px-3  lg:px-5 py-3 text-white"
                  onClick={triggerUrlUpdate}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
          {(isDetailLoading || listLoading) && window.innerWidth > 1024 ? (
            <div className="fixed  h-screen flex items-center w-[350px]  right-10 pb-80  2xl:right-10 3xl:right-20 4xl:right-40 5xl:right-60 z-50">
              <img
                src="pokeball-icon.png"
                className="animate-spin h-20 w-20 filter brightness-50 m-auto"
                alt="loading_spinner"
              />
            </div>
          ) : (isDetailLoading || listLoading) && window.innerWidth <= 1024 ? (
            <div className="fixed flex justify-center bg-white items-center w-screen h-screen top-0 left-0 z-50">
              <img
                src="pokeball-icon.png"
                className="animate-spin h-20 w-20 filter brightness-50"
                alt="loading_spinner"
              />
            </div>
          ) : (
            !isDetailLoading && (
              <Suspense
                fallback={
                  <div className="fixed flex justify-center bg-white items-center w-screen h-screen top-0 left-0 z-50">
                    <img
                      src="pokeball-icon.png"
                      className="animate-spin h-20 w-20 filter brightness-50"
                      alt="loading_spinner"
                    />
                  </div>
                }
              >
                <SideCard
                  nodataText={nodataText}
                  colors={colors}
                  img={img}
                  sideCard={sideCard}
                  display={display}
                  setDisplay={setDisplay}
                />
              </Suspense>
            )
          )}
        </div>
      </div>
    </div>
  );
}
export default ProductDetail;

// console.log(allPokemons)
// const {data: sideDetail, refetch} = sideDetails(count!)
// const result = getRequiredPokemon(iterator.next().value)

// function debounce(func :(e: React.ChangeEvent<HTMLInputElement>) => Promise<void>, delay : 500) {
//   let timeout;
//   return function() {
//     const context = this;
//     const args = arguments;
//      => func.apply(context, args), delay);
//   };
// }

// const pokemons: productType = useAppSelector((state)=> state.allPokemons.pokemon)
// const eachPokemon = useAppSelector((state) => state.eachPokemons.requiredData)

// useEffect(() =>{
//   const controller = new AbortController()

//   eachPokemon.singlepok &&  console.log(eachPokemon.singlepok, 'product details');

//   return () =>{
//     controller.abort()
//   }
// },[])
// console.log(name, 'suii');

// function  storeEachPokemon <T>(pokemon: T ) : singlePokemonData {
//   pokemon.map()
// }
// storeEachPokemon(eachPokemon.singlepok)
