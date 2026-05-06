import React from 'react'

const colorMap: Record<string, string> = {
  normal: 'bg-[#bcbcac]',
  grass: 'bg-[#78cd54]',
  fighting: 'bg-[#bc5442]',
  flying: 'bg-[#87CEEB]',
  poison: 'bg-[#ab549d]',
  ground: 'bg-[#debc54]',
  rock: 'bg-[#bcac66]',
  bug: 'bg-[#abbc1c]',
  ghost: 'bg-[#702963]',
  steel: 'bg-[#4682B4]',
  fire: 'bg-[#ff421c]',
  water: 'bg-[#00FFFF]',
  electric: 'bg-[#FFEA00]',
  psychic: 'bg-[#D27D2D]',
  ice: 'bg-[#F0FFFF]',
  dragon: 'bg-[#FFC300]',
  dark: 'bg-[#A9A9A9]',
  fairy: 'bg-[#ffacff]',
  shadow: 'bg-[#343434]',
  unknown: 'bg-[#ab549d]',
}

function Color({ val }: { val: { slot: number; type: { name: string; url: string } } }) {
  const bgColor = colorMap[val.type.name] || 'bg-gray-400'

  return (
    <p className={`${bgColor} py-0.5 px-2 rounded-md`}>
      {val.type.name}
    </p>
  )
}

export default Color