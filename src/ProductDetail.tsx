import React, { useState, useRef, lazy, Suspense } from "react";
import { FaSearch } from "react-icons/fa";
import {
  CardType,
  evolutionType,
  resArray,
  singlePokemonData,
  speciesType,
} from "../types";
import { useContextProvider } from "../context/TanstackContext";
import { getAllPokemons } from "../hooks/useReactQuery";
import axios from "axios";
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

// type suii = typeof pokemonTypes
// type pokeTypes = keyof suii

// const initialState = {
//   loading: false,
//   SideCard:  {} as CardType,
//   img: ""
// }
// type stateType = typeof initialState;
// enum type {
//   loading,
//   SideCard,
//   img,
// }
// type actionType = {
//   type: type.SideCard
//   payload:  CardType
// } | {
//     type: type.loading
//     payload: boolean
//   } | {
//     type: type.img
//     payload: string
//   }
// function reducer (state : stateType , action : actionType){
//   switch (action.type) {

//     case type.loading :
//     return {
//       loading : !state.loading,
//       SideCard : {},
//       img: ""
//     }
//     case type.SideCard :
//       return {
//         loading : state.loading,
//         SideCard : action.payload,
//         img: ""
//     }
//   }
// }

function ProductDetail() {
  const {
    goBack,
    triggerUrlUpdate,
    gotoFirst,
    sortEach: requiredData,
    initialButton,
    prevButton,
    allPokemons: loading,
  } = useContextProvider();

  const div_color = useRef<HTMLDivElement>(null!);
  const [searchInput, setInputSearch] = useState<string>();
  const [allPokemons, setAllPokemons] = useState([]);
  const [sideCard, setSideCard] = useState<CardType | null>(null);
  const [display, setDisplay] = useState<boolean>(undefined!);
  const [nodataText, setNodataText] = useState<string>(
    "Select a Pokemon to display here."
  );
  // const [state, dispatch] = useReducer(reducer, initialState)
  const [img, setImg] = useState("");
  const data = getAllPokemons();
  // const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  function debounce(
    func: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>,
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
    // console.log(e.target.value)
    // making a timeout for input field slowed results else wrong results
    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (data?.data?.results) {
        setInputSearch(e.target.value);
        setAllPokemons([]);
        const req = data.data.results.filter((val: resArray) =>
          val.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        req.length = 20;
        req.map(async (val: resArray) => {
          const call = await axios.get(val.url);
          //prev here maps to each object so instead of directly spreading the allpokemons we spread the prev
          if (call) setAllPokemons((prev: any): any => [...prev, call.data]);
        });
      }
    }, 2000);
  }
  const processChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e),
    500
  );
  // setIsLoading(true)
  async function handleClick(
    count: number,
    name: string,
    height: number,
    weight: number,
    abilities: Array<object>,
    stats: Array<{
      base_stat: number;
      effort: number;
      stat: { name: string; url: string };
    }>,
    types: Array<{ slot: number; type: { name: string; url: string } }>
  ) {
    try {
      setNodataText("");
      setDisplay(true);
      setIsLoading(true);
      const species: speciesType = await (
        await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
      ).data;
      const description: string = species?.flavor_text_entries[6]?.flavor_text!;
      const evolution: evolutionType = await (
        await axios.get(species?.evolution_chain.url)
      ).data;
      const evolutionFormat1 = evolution?.chain?.species?.name;
      const evolutionFormat2 = evolution?.chain?.evolves_to[0]?.species?.name;
      const evolutionFormat3 =
        evolution?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name;
      const image1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution?.chain.species.url
        .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
        .replace("/", "")!}.png`;
      const image2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution?.chain?.evolves_to[0]?.species?.url
        ?.replace("https://pokeapi.co/api/v2/pokemon-species/", "")
        .replace("/", "")!}.png`;
      const image3 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution?.chain?.evolves_to[0]?.evolves_to[0]?.species?.url
        ?.replace("https://pokeapi.co/api/v2/pokemon-species/", "")
        .replace("/", "")!}.png`;
      const pokeType = types[0].type.name;
      if (evolution && species) {
        setIsLoading(false);
      }
      setSideCard({
        evolutionName: {
          name1: evolutionFormat1!,
          name2: evolutionFormat2!,
          name3: evolutionFormat3!,
        },
        targetName: name,
        height: height,
        weight: weight,
        abilities: abilities,
        stats: stats,
        description: description!,
        evolvesFrom: evolutionFormat2!,
        evolvesTo: evolutionFormat3!,
        images: { image1: image1!, image2: image2!, image3: image3! },
        id: count,
        type: pokeType,
      });
      if (count < 650) {
        setImg(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${count}.gif`
        );
      } else {
        setImg(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${count}.png`
        );
      }
      setIsLoading(false);
      setDisplay(true);
    } catch (e) {
      setIsLoading(false);
      setDisplay(true);
      setSideCard(null);
      setImg("pokeball.png");
      setNodataText("No Data Available For This Pokemon");
    }
  }

  if (requiredData && allPokemons) {
    return (
      <div className="relative flex flex-col gap-y-20 ">
        <img src="pokeball-icon.png" className="fixed -left-20 -top-20"></img>
        <div className="h-16 w-11/12 md+:w-5/6 lg:w-[57%] mx-auto lg:ml-[100px] 2xl:ml-[200px] shadow-md  rounded-xl text-gray-600 outline-none relative z-10 mt-10">
          <input
            type="text"
            name="search"
            className="h-full w-full px-2 rounded-xl text-gray-800 tracking-wide font-medium text-lg outline-none focus:border-gray-300 border-2 border-transparent transition relative"
            id=""
            placeholder="Search your pokemon"
            onChange={processChange}
          />
          <FaSearch className="absolute top-1/2 -translate-y-1/2 right-5 h-9 w-9 text-white bg-red-400  shadow-red-400 shadow-lg  p-2 rounded-xl cursor-not-allowed" />
        </div>
        <div>
          <div className="flex  justify-center w-full  lg:justify-start ">
            <div className="flex flex-col justify-center items-center lg:items-start mx-5  ">
              <div className="flex flex-wrap  mb-10 w-full   lg:w-[57%] transition-transform duration-300 ease-in-out gap-x-5  xl:gap-x-10  gap-y-20 md+:mx-10  2xl:mx-20 justify-center items-center  text-lg ">
                {!searchInput
                  ? requiredData.map((poke: singlePokemonData) => (
                      <div
                        key={poke.order}
                        className="card h-40 justify-center w-60 lg+:w-80  rounded-xl  shadow-md bg-white flex z-10 cursor-pointer outline-none sm:mx-5 md:mx-0 lg:mx-0  hover:border-gray-300 hover:border-2 transition-all duration-75 ease-in relative "
                        onClick={() =>
                          handleClick(
                            poke.id,
                            poke.name,
                            poke.height,
                            poke.weight,
                            poke.abilities,
                            poke.stats,
                            poke.types
                          )
                        }
                      >
                        <div className="flex justify-center flex-col relative items-center w-full gap-y-1 ">
                          <img
                            src={poke.sprites.front_default}
                            alt="poke_image"
                            className="absolute  -top-[54px] "
                          />
                          <p className="text-gray-400 text-xs">N° {poke.id}</p>
                          <p className="text">{poke.name}</p>
                          <div
                            ref={div_color}
                            className="text-sm flex gap-x-3 text-gray-800 mt-2"
                          >
                            {poke.types.map((val) => (
                              <Suspense
                                key={val.slot}
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
                                <Color key={val.slot} val={val} />
                              </Suspense>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  : searchInput &&
                    allPokemons.map((poke: singlePokemonData) => (
                      <div
                        key={poke.order}
                        className="card  h-40 w-80 flex justify-center  rounded-xl shadow-md bg-white z-10 cursor-pointer  outline-none hover:border-gray-300 hover:border-2 transition-all duration-75 ease-in relative sm:ml-10 lg:ml-0"
                        onClick={() =>
                          handleClick(
                            poke.id,
                            poke.name,
                            poke.height,
                            poke.weight,
                            poke.abilities,
                            poke.stats,
                            poke.types
                          )
                        }
                      >
                        <div className="flex justify-center flex-col relative items-center w- gap-y-1 ">
                          <img
                            src={poke.sprites.front_default}
                            alt="poke_image"
                            className="absolute  -top-[54px] "
                          />
                          <p className="text-gray-400 text-xs">N° {poke.id}</p>
                          <p className="text">{poke.name}</p>
                          <div className="text-sm flex gap-x-3 text-gray-800 mt-2">
                            {poke.types.map((val) => (
                              <Suspense
                                key={val.slot}
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
                                <Color val={val} />
                              </Suspense>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
              {requiredData.length > 0 && !searchInput && (
                <div className="w-full flex-wrap gap-y-5 sm:w-11/12 md+:w-5/6 lg:w-[57%]  z-20 mb-10 text-center gap-x-4 sm:gap-x-10 flex justify-center  items-center">
                  {initialButton && !isLoading && (
                    <button
                      className="bg-red-600  rounded-xl text-white shadow-md shadow-red-800 w-40 text-base px-3  lg:px-5 py-3"
                      onClick={gotoFirst}
                    >
                      First Page
                    </button>
                  )}
                  {prevButton && !isLoading && (
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
            {isLoading && window.innerWidth > 1024 ? (
              <div className="fixed  h-screen flex items-center w-[350px]  right-10 pb-80  2xl:right-10 3xl:right-20 4xl:right-40 5xl:right-60 z-50">
                <img
                  src="pokeball-icon.png"
                  className="animate-spin h-20 w-20 filter brightness-50 m-auto"
                  alt="loading_spinner"
                />
              </div>
            ) : isLoading && window.innerWidth <= 1024 ? (
              <div className="fixed flex justify-center bg-white items-center w-screen h-screen top-0 left-0 z-50">
                <img
                  src="pokeball-icon.png"
                  className="animate-spin h-20 w-20 filter brightness-50"
                  alt="loading_spinner"
                />
              </div>
            ) : (
              !isLoading && (
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
  } else if (loading.loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <img
          src="pokeball-icon.png"
          className="animate-spin h-20 w-20 filter brightness-50"
          alt="loading_spinner"
        />
      </div>
    );
  } else
    return (
      <h1 className="flex justify-center items-center w-screen h-screen text-3xl">
        Failed to get the data
      </h1>
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
