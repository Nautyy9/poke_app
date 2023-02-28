import React, { lazy, Suspense, useEffect, useState } from 'react'
import {  Route, Routes,  } from 'react-router-dom'
const Product = lazy(() => import('./Product'))

function App() {


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
      <Routes>
        <Route path='/' element={<Suspense fallback={<div className='flex justify-center items-center w-screen h-screen'>
          <img src="pokeball-icon.png" className='animate-spin h-20 w-20 filter brightness-50' alt="loading_spinner" />
        </div>}><Product/></Suspense>}/>
      </Routes>
  )
}

export default App