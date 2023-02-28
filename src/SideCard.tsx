import React, { Dispatch, forwardRef, ForwardRefRenderFunction, SetStateAction } from 'react'
import { CardType, statType } from '../types'
import {AiOutlineClose} from 'react-icons/ai'


function SideCard( {img, sideCard, display, setDisplay }  : {img: string, sideCard: CardType, display: boolean, setDisplay : React.Dispatch<SetStateAction<boolean>>})  {
return (
    <>
        <div className="hidden  lg:inline-block h-screen w-[350px] xl:w-[450px] 2xl:w-[350px] right-5 xl:right-20 2xl:right-10 3xl:right-20 4xl:right-40 5xl:right-60 bg-white rounded-xl shadow-lg fixed top-36">
                {!img ? (
                <>
                    <img src="no-pokemon-selected-image.png" className='absolute -top-36 left-1/2 -translate-x-1/2 ' alt="" />
                    <p className='flex items-center mx-auto text-center h-full text-lg text-gray-400 w-1/2'>Select a Pokemon to display here.</p>
                </>
                ) : (sideCard) &&
                ( <div >
                    <img src={img} className='anim_image absolute -top-32 h-40  w-40 left-1/2 -translate-x-1/2 ' alt="" />
                    <div className="flex flex-col mt-14 justify-center items-center gap-y-4  scroll-m-0">
                    <p className='text-sm text-gray-400'>N° {sideCard.id}</p>
                    <h3 className='text-2xl text-gray-900 font-semibold'>{sideCard.targetName}</h3>
                    <p className='text-lg text-gray-900 font-semibold'>Pokedex Entry</p>
                    <p className='text-base text-gray-400 w-5/6 text-center'>{sideCard.description.slice(0, 93)}</p>
                    <div className="flex gap-x-5 gap-y-3">
                        <div className="flex flex-col gap-y-2">
                        <h4 className='text-lg text-gray-900 font-semibold text-center'>Height</h4>
                        <h5 className='w-32 bg-gray-200 rounded-xl text-center py-1'>{sideCard.height}</h5>
                        </div>
                        <div className="flex flex-col  gap-y-2">
                        <h4 className='text-lg text-gray-900 font-semibold  text-center'>Weight</h4>
                        <h5 className='bg-gray-200  rounded-xl text-center w-32 py-1 '>{sideCard.weight}</h5>
                        </div>
                    </div>
                    <div className="flex flex-col  gap-y-3">
                        <h3 className='text-lg text-gray-900 font-semibold  text-center'>Abilities</h3>
                        <div className="flex gap-x-4">
                        {sideCard.abilities.map((val: any) => (<h5 key={val.slot} className='flex bg-gray-200  rounded-xl text-center py-1 px-3 min-w-fit max-w-32 '>{val.ability.name}</h5>))}
                        </div>
                    </div>
                    <div className="stats flex flex-col gap-y-3">
                        <p className='text-lg text-gray-900 font-semibold  text-center'>Stats</p>
                        <div className='flex gap-x-4'>
                        {sideCard.stats.map((val :statType) =>(
                            <div key={val.stat.url.replace('https://pokeapi.co/api/v2/stat/', ' ').replace('/', ' ')} className="flex">
                            {(val.stat.name ==="hp")?
                                <div className='flex flex-col rounded-t-full rounded-b-full bg-gray-300/60 w-8 h-14 p-1'>
                                    <p className={`rounded-full text-[10px] font-bold text-center h-max  bg-[#df2140] text-white p-1 `}>HP</p>
                                    <p className='text-gray-900 text-center text-sm  '>{val.base_stat}</p> 
                                </div> : (val.stat.name ==="attack") ?
                                    <div className='flex flex-col rounded-t-full rounded-b-full bg-gray-300/60 w-8 h-14 p-1'>
                                        <p className={`rounded-full text-[10px] font-bold text-center h-max  bg-[#ff994d] text-white p-1 `}>ATK</p>
                                        <p className='text-gray-900 text-center text-sm  '>{val.base_stat}</p> 
                                    </div> : (val.stat.name ==="defense") ?
                                    <div className='flex flex-col rounded-t-full rounded-b-full bg-gray-300/60 w-8 h-14 p-1'>
                                        <p className={`rounded-full text-[10px] font-bold text-center h-max  bg-[#eecd3d] text-white p-1 `}>DEF</p>
                                        <p className='text-gray-900 text-center text-sm  '>{val.base_stat}</p> 
                                    </div>: (val.stat.name ==="special-attack") ?
                                        <div className='flex flex-col rounded-t-full rounded-b-full bg-gray-300/60 w-8 h-14 p-1'>
                                            <p className={`rounded-full text-[10px] font-bold text-center h-max  bg-[#85ddff] text-white p-1 `}>SpA</p>
                                            <p className='text-gray-900 text-center text-sm  '>{val.base_stat}</p> 
                                        </div> :(val.stat.name ==="special-defense") ?
                                        <div className='flex flex-col rounded-t-full rounded-b-full bg-gray-300/60 w-8 h-14 p-1'>
                                            <p className={`rounded-full text-[10px] font-bold text-center h-max  bg-[#96da83] text-white p-1 `}>SpD</p>
                                            <p className='text-gray-900 text-center text-sm  '>{val.base_stat}</p> 
                                        </div> : (val.stat.name ==="speed") &&
                                <div className='flex flex-col rounded-t-full rounded-b-full bg-gray-300/60 w-8 h-14 p-1'>
                                    <p className={`rounded-full text-[10px] font-bold text-center h-max  bg-[#fb94a8] text-white p-1 `}>SPD</p>
                                    <p className='text-gray-900 text-center text-sm  '>{val.base_stat}</p> 
                                </div>}
                            </div>
                            ))}

                            <div className='flex flex-col rounded-t-full rounded-b-full bg-[#88aaea]/60 w-8 h-14 p-1'>
                                <p className="rounded-full text-[10px] font-bold text-ce-max h-max  text-center bg-[#88aaea] text-white p-1">TOT</p>
                                <div className='text-gray-900 text-center text-sm'><h1>{sideCard.stats.reduce<number>(( accumulator , prev) =>  (accumulator + prev.base_stat ), 0)}</h1></div> 
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                            <h4 className='text-lg text-gray-900 font-semibold text-center'>Evolution</h4>
                            <div className="flex gap-x-4">
                                <div className="card flex flex-col">
                                <img src={sideCard?.images?.image1} alt="img1"  className='h-20 w-20 rounded-xl hover:bg-gray-200 transition-colors duration-200 ease-in-out'/>
                                <p className='text-gray-900 font-semibold text-base text-center'>{sideCard.evolutionName.name1}</p>
                                </div>
                                {(sideCard?.images?.image2.replace('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/', ' ').replace(".png", " ") !== ' undefined ') && <div className="card flex flex-col">
                                <img src={sideCard?.images?.image2!} alt="img2"  className='h-20 w-20 rounded-xl hover:bg-gray-200 transition-colors duration-200 ease-in-out'/>
                                <p className='text-gray-900 font-semibold text-base text-center'>{sideCard.evolutionName.name2}</p>
                                </div>}
                                {(sideCard?.images?.image3.replace('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/', ' ').replace(".png", " ") !== ' undefined ')  && <div className="card flex flex-col">
                                <img src={sideCard?.images?.image3!} alt="img3"  className='h-20 w-20 rounded-xl hover:bg-gray-200 transition-colors duration-200 ease-in-out'/>
                                <p className='text-gray-900 font-semibold text-base text-center'>{sideCard.evolutionName.name3}</p>
                                </div>}
                            </div>
                            
                    </div>
                    </div>
                </div>
                    )}
        </div>
        {display && <div className="  max-h-max overflow-y-scroll w-screen z-50 lg:hidden fixed top-0 left-0 ">
                <div className={`h-20 sm:h-40  bg-[#df2140]`}>
                <button className="h-10 w-10 rounded-full mt-4 mr-4 cursor-pointer bg-white shadow-lg shadow-red-400  fixed right-0 z-[60] "  onClick={() => setDisplay(false)}>
                    <AiOutlineClose className='h-7 w-7 m-auto text-red-500 drop-shadow-md shadow-white'></AiOutlineClose>
                </button>
                </div>
                <div className='bg-white relative  w-full h-max pb-10 border-b border-black pt-8 sm:pt-10'>
                    <img src={img} className=' anim_image absolute -top-20 sm:-top-32 w-28 h-28 sm:h-40 sm:w-40 left-1/2 -translate-x-1/2 ' alt="" />
                    <div className="flex flex-col  justify-center items-center gap-y-1 sm:gap-y-4  scroll-m-0">
                    <p className='text-sm text-gray-400'>N° {sideCard.id}</p>
                    <h3 className='text-2xl text-gray-900 font-semibold'>{sideCard.targetName}</h3>
                    <p className='sm:text-lg text-gray-900 font-semibold'>Pokedex Entry</p>
                    <p className='text-base text-gray-400 sm:w-5/6 text-center'>{sideCard.description.slice(0, 93)}</p>
                    <div className=" flex justify-center sm:justify-start items-center flex-col sm:flex-row gap-y-2 xs:gap-x-5 sm:gap-x-20">
                    <div className="flex gap-x-2 xs:gap-x-5 gap-y-3">
                        <div className="flex flex-col gap-y-2">
                            <h4 className='text-lg text-gray-900 font-semibold text-center'>Height</h4>
                            <h5 className='w-32 bg-gray-200 rounded-xl text-center py-1'>{sideCard.height}</h5>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h4 className='text-lg text-gray-900 font-semibold  text-center'>Weight</h4>
                            <h5 className='bg-gray-200  rounded-xl text-center w-32 py-1 '>{sideCard.weight}</h5>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <h3 className='text-lg text-gray-900 font-semibold  text-center'>Abilities</h3>
                        <div className="flex flex-wrap gap-y-2 xs:flex-nowrap gap-x-2 xs:gap-x-4 text-center">
                        {sideCard.abilities.map((val: any) => (<h5 key={val.slot} className='flex bg-gray-200  rounded-xl text-center py-1 px-3  min-w-fit w-32 '>{val.ability.name}</h5>))}
                        </div>
                    </div>
                    </div>
                    <div className="stats flex flex-col gap-y-1 xs:gap-y-3">
                        <p className='text-lg text-gray-900 font-semibold  text-center'>Stats</p>
                        <div className='flex gap-x-4'>
                        {sideCard.stats.map((val :statType) =>(
                            <div key={val.stat.url.replace('https://pokeapi.co/api/v2/stat/', ' ').replace('/', ' ')} className="flex">
                            {
                                (val.stat.name ==="hp")?
                                <div className='flex flex-col rounded-t-full rounded-b-full bg-gray-300/60 w-8 h-14 p-1'>
                                    <p className={`rounded-full text-[10px] font-bold text-center h-max  bg-[#df2140] text-white p-1 `}>HP</p>
                                    <p className='text-gray-900 text-center text-sm  '>{val.base_stat}</p> 
                                </div> : (val.stat.name ==="attack") ?
                                    <div className='flex flex-col rounded-t-full rounded-b-full bg-gray-300/60 w-8 h-14 p-1'>
                                        <p className={`rounded-full text-[10px] font-bold text-center h-max  bg-[#ff994d] text-white p-1 `}>ATK</p>
                                        <p className='text-gray-900 text-center text-sm  '>{val.base_stat}</p> 
                                    </div> : (val.stat.name ==="defense") ?
                                    <div className='flex flex-col rounded-t-full rounded-b-full bg-gray-300/60 w-8 h-14 p-1'>
                                        <p className={`rounded-full text-[10px] font-bold text-center h-max  bg-[#eecd3d] text-white p-1 `}>DEF</p>
                                        <p className='text-gray-900 text-center text-sm  '>{val.base_stat}</p> 
                                    </div> : (val.stat.name ==="special-attack") ?
                                        <div className='flex flex-col rounded-t-full rounded-b-full bg-gray-300/60 w-8 h-14 p-1'>
                                            <p className={`rounded-full text-[10px] font-bold text-center h-max  bg-[#85ddff] text-white p-1 `}>SpA</p>
                                            <p className='text-gray-900 text-center text-sm  '>{val.base_stat}</p> 
                                        </div> :(val.stat.name ==="special-defense") ?
                                        <div className='flex flex-col rounded-t-full rounded-b-full bg-gray-300/60 w-8 h-14 p-1'>
                                            <p className={`rounded-full text-[10px] font-bold text-center h-max  bg-[#96da83] text-white p-1 `}>SpD</p>
                                            <p className='text-gray-900 text-center text-sm  '>{val.base_stat}</p> 
                                        </div> : (val.stat.name ==="speed") &&
                                <div className='flex flex-col rounded-t-full rounded-b-full bg-gray-300/60 w-8 h-14 p-1'>
                                    <p className={`rounded-full text-[10px] font-bold text-center h-max  bg-[#fb94a8] text-white p-1 `}>SPD</p>
                                    <p className='text-gray-900 text-center text-sm  '>{val.base_stat}</p> 
                                </div>
                            }
                            </div>
                            ))}

                            <div className='flex flex-col rounded-t-full rounded-b-full bg-[#88aaea]/60 w-8 h-14 p-1'>
                                <p className="rounded-full text-[10px] font-bold text-ce-max h-max  text-center bg-[#88aaea] text-white p-1">TOT</p>
                                <div className='text-gray-900 text-center text-sm'><h1>{sideCard.stats.reduce<number>(( accumulator , prev) =>  (accumulator + prev.base_stat ), 0)}</h1></div> 
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                            <h4 className='text-lg text-gray-900 font-semibold text-center'>Evolution</h4>
                            <div className="flex gap-x-4">
                                <div className="card flex flex-col">
                                <img src={sideCard?.images?.image1} alt="img1"  className='h-20 w-20 rounded-xl hover:bg-gray-200 transition-colors duration-200 ease-in-out'/>
                                <p className='text-gray-900 font-semibold text-base text-center'>{sideCard.evolutionName.name1}</p>
                                </div>
                                {(sideCard?.images?.image2.replace('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/', ' ').replace(".png", " ") !== ' undefined ') && <div className="card flex flex-col">
                                <img src={sideCard?.images?.image2!} alt="img2"  className='h-20 w-20 rounded-xl hover:bg-gray-200 transition-colors duration-200 ease-in-out'/>
                                <p className='text-gray-900 font-semibold text-base text-center'>{sideCard.evolutionName.name2}</p>
                                </div>}
                                {(sideCard?.images?.image3.replace('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/', ' ').replace(".png", " ") !== ' undefined ')  && <div className="card flex flex-col">
                                <img src={sideCard?.images?.image3!} alt="img3"  className='h-20 w-20 rounded-xl hover:bg-gray-200 transition-colors duration-200 ease-in-out'/>
                                <p className='text-gray-900 font-semibold text-base text-center'>{sideCard.evolutionName.name3}</p>
                                </div>}
                            </div>
                            
                    </div>
                    </div>
                </div>
                
                
        </div>
}
    </>
  )
}

export default (SideCard)