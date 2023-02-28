import React, { forwardRef } from 'react'

function Color (
    {val}: {val :
        {slot: number;
    type: {
        name: string;
        url: string;
    }}}) {
  return (
    <>
        {val.type.name==='normal' ? <p className='bg-[#bcbcac] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='grass' ? <p className='bg-[#78cd54] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='fighting' ? <p className='bg-[#bc5442] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='flying' ? <p className='bg-[#87CEEB] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='poison' ? <p className='bg-[#ab549d] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='ground' ? <p className='bg-[#debc54] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='rock' ? <p className='bg-[#bcac66] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='bug' ? <p className='bg-[#abbc1c] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='ghost' ? <p className='bg-[#702963] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='steel' ? <p className='bg-[#4682B4] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='fire' ? <p className='bg-[#ff421c] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='water' ? <p className='bg-[#00FFFF] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='electric' ? <p className='bg-[#FFEA00] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='psychic' ? <p className='bg-[#D27D2D] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='ice ' ? <p className='bg-[#F0FFFF] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='dragon' ? <p className='bg-[#FFC300] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='dark' ? <p className='bg-[#A9A9A9] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='fairy' ? <p className='bg-[#ffacff] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='shadow' ? <p className='bg-[#343434] py-0.5 px-2 rounded-md'>{val.type.name}</p>:
        val.type.name==='unknown' && <p className='bg-[#ab549d] py-0.5 px-2 rounded-md'>{val.type.name}</p>
  }
    </>
  )
}

export default  (Color)