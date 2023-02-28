import { RouterProvider } from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import React, { useEffect, useState } from 'react'
import { useContextProvider } from '../context/TanstackContext'
function App() {

    const {router} = useContextProvider()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
      setLoading(true)
      setTimeout(() =>{
          setLoading(false)
      },2000)
      
  }, [])

  if(loading){
    return  <div className='flex justify-center items-center w-screen h-screen'>
    <img src="pokeball-icon.png" className='animate-spin h-20 w-20 filter brightness-50' alt="loading_spinner" />
  </div>
  }

  return (
<>
    <RouterProvider router={router}></RouterProvider>
    {/* <TanStackRouterDevtools initialIsOpen={true}></TanStackRouterDevtools> */}
</>

  )
}

export default App