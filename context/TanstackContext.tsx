import React,{createContext, useContext, useState, useEffect} from 'react'
import {Outlet,RouterProvider,Link,ReactRouter,createRouteConfig,} from '@tanstack/react-router'
import Home from    '../src/Home';
import About from   '../src/About';
import Product from '../src/Product';
import { useAppDispatch, useAppSelector } from '../hooks/useCustomHook';
import { fetchPokemons } from '../redux/features/pokemonSlice';
import { eachPokemon, resArray, singlePokemonData, startState } from '../types';
import { fetchEachPokemon } from '../redux/features/eachPokeSlice';
import {ReactQueryDevtools} from 'react-query/devtools'
import { QueryClient,  QueryClientProvider } from 'react-query';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';
const client = new QueryClient()

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production' ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/react-router-devtools').then(
          (res) => ({
            default: res.TanStackRouterDevtools
            // For Embedded Mode
            // default: res.TanStackRouterDevtoolsPanel
          })
        ),
      )


type ChildType ={
    children: React.ReactNode
}
const tanstack = () =>{
    const rootRoute : any= createRouteConfig({
        component : () =>{
            return(
                <QueryClientProvider client={client}>
                <Link to='/'></Link>
                <br></br>
                {/* <ContextWrapperRouterDevtools></ContextWrapperRouterDevtools> */}
                <Outlet></Outlet>
                <ReactQueryDevtools/>
                </QueryClientProvider>
            )
        }
    });
 
    const homeRoute = rootRoute.createRoute({
        path: '/',
        component: Product
    })
    const routeConfig = rootRoute.addChildren([homeRoute ])
    const router = new ReactRouter({routeConfig})
    return {router}
}

// function useCallbackRef (cb :any) {
//     const  myRef = useRef(cb)
//     useLayoutEffect(() =>{
//         myRef.current = cb
//     }, [cb])
//     return  myRef
// }

// !    Main
function ContextWrapper({children}: ChildType) {
    const [url , setUrl] = useState("")
    const dispatch =  useAppDispatch()
    let initialUrl = "https://pokeapi.co/api/v2/pokemon"

    window.onload = () =>{
        setUrl("https://pokeapi.co/api/v2/pokemon")
    }
    const {router} = tanstack()
    const {allPokemons} = useAppSelector((state)=> state)
    let eachPokemons : eachPokemon | Record<string, never> = {}
    if(allPokemons.pokemon ){
    eachPokemons = useAppSelector((state)=> state.eachPokemons)
    }
    const {requiredData} = eachPokemons
    
    function triggerUrlUpdate() {
        if(allPokemons.pokemon.next){
            setUrl(allPokemons.pokemon.next)
        }
    }
    
    requiredData.sort((a, b) => a.id - b.id)
    function goBack() {
        setUrl(initialUrl)
    }

    useLayoutEffect(() =>{
    const controller = new AbortController()

    // addEventListener("scroll" , throttledUpdateLayout)
    if(controller.signal ) {
        dispatch(fetchPokemons(url))
    }
    return () =>{
        controller.abort()
    }
    }, [url])

    useEffect(() =>{
        const controller = new AbortController()

    // addEventListener("scroll" , throttledUpdateLayout)
    if(controller.signal ) {
        allPokemons.pokemon.results && allPokemons.pokemon.results.map((suii: resArray) => {
            // console.log(allPokemons.pokemon.results, 'in')
        dispatch(fetchEachPokemon(suii?.url))
        
      // dispatch(() => increasePoke)
  })
}
return () =>{
    controller.abort()
}

    }, [allPokemons.pokemon.next])


    const value = {
        router,allPokemons,
        triggerUrlUpdate, goBack, 
        requiredData
    }


    // router: ReactRouter<any, AllRouteInfo<any>, unknown>;
    // searchInput: string;
    // setSearchInput: React.Dispatch<React.SetStateAction<string>>;
    // handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // triggerUrlUpdate: () => void;
    // goBack: () => void;
    // requiredData: singlePokemonData[];

    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    )
}

const {router} = tanstack()
declare module "@tanstack/react-router" {
    interface RegisterRouter{
        router : typeof router
    }
}

const contextType = () =>{
    const requiredData: singlePokemonData[]= [];
    const allPokemons : any = {}
    function triggerUrlUpdate() {}
    function goBack() {}

    return {
        router, triggerUrlUpdate, goBack,requiredData ,allPokemons
    }
}


//                                                           ^?

    // type hello = typeof router.'#private' 
    // type authRoute = typeof router
    type authRoute = ReturnType<typeof contextType>


export const authContext = createContext<authRoute>(null!)


export const devtools = () =>{

    return <TanStackRouterDevtools router={router} initialIsOpen={true} ></TanStackRouterDevtools>
} 

export const useContextProvider = () => useContext(authContext)
export default ContextWrapper