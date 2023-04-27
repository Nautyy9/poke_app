
function Color (
    {val, colors}: {val :{slot: number;type: {
        name: string;
        url: string;
    }}, colors : Record<string, any> }) 
    {
      console.log(colors[val.type.name])
  return (
    <>
        {Object.keys(colors).includes(val.type.name) && <p className={`bg-[${colors[val.type.name]}] py-0.5 px-2 rounded-md`}>{val.type.name}</p>}
    </>
  )
}

export default  (Color)