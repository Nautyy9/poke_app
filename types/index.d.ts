import store from "../redux/app/store"


export type resArray = {
    length? : number,
    name: string,
    url: string
}
export type fetchType = {
    count: number,
    next: string,
    previous: string | null,
    results: resArray[]
}

export type startState = {
    pokemon:  fetchType  | Record<string, never>,
    loading: boolean,
    error: any,
}


export type statType ={
    base_stat: number 
    effort: number
    stat :{ 
        name : string 
        url :  string
    }}


export type singlePokemonData = {
    length : number,
    abilities : Array<object>
    base_experience: number
    forms : Array<object>
    game_indices: Array<object>
    height : number
    held_items : Array
    id : number
    is_default: boolean
    location_area_encounters : string
    moves: Array<object>
    name : string
    order : number
    past_types : Array<object>
    species : object
    sprites: {
        back_default: string
        back_female:null
        back_shiny:string
        back_shiny_female:null
        front_default: string
        front_female:null
        front_shiny:string
        front_shiny_female:null
    }
    stats : Array<statType>
    types : Array<{
        slot:number
        type: {
            name: string
            url:string
        } 
    }>
    weight : number
} 

export interface eachPokemon {
    error: any,
    loading : boolean,
    requiredData : Array<singlePokemonData>
    // accessData : Array<singlePokemonData>
}
export type appState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch



export type evolutionType ={
        baby_trigger_item: null,
        chain : {
        evolution_details: [],
        evolves_to: [
        {
            evolution_details: object[],
            evolves_to:  [
            {
                evolution_details:  object[],
                evolves_to: [],
                is_baby: boolean,
                species: { name: string, url: string }
            }
            ],
            is_baby: boolean,
            species:  { name: string, url: string }
            }
          ],
        is_baby: boolean,
        species:  { name: string, url: string }
        },
        id: number
      
}

export type speciesType = {
    evolution_chain: { url: string },
    evolves_from_species: { name: string, url:string },
    flavor_text_entries: [
    {
        flavor_text: string
        language: { name: string, url: string },
        version: { name: string, url: string }
    },
    {
        flavor_text: string
        language: { name: string, url: string },
        version: { name: string, url: string }
    }, {
        flavor_text: string
        language: { name: string, url: string },
        version: { name: string, url: string }
    }, {
        flavor_text: string
        language: { name: string, url: string },
        version: { name: string, url: string }
    }, {
        flavor_text: string
        language: { name: string, url: string },
        version: { name: string, url: string }
    }, {
        flavor_text: string
        language: { name: string, url: string },
        version: { name: string, url: string }
    }, {
        flavor_text: string
        language: { name: string, url: string },
        version: { name: string, url: string }
    },
]
}

// export type abilityType = {
//     val :{
//         ability: 
//             {
//                 name: string
//             }
//         }
// }

export type  CardType = {
    targetName: string,
    evolutionName: {
        name1: string,
        name2: string,
        name3: string,
    },
    height: number,
    weight: number,
    abilities: Arrar<{}>,
    stats: Array<statType>
    description: string,
    evolvesFrom : string,
    evolvesTo: string,
    images: {image1: string,image2:  string,image3: string},
    id: number,
    type : string,
}

