import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'

const Home = () => {
    const[page,setPage] = useState(1)
    const[images,setImages] = useState()

    const getImages =async () =>{
        try{
            const {data} = await axios.get(`/v2/list?page=${page}&limit=12`)
            setImages(data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getImages()
    },[page])

    let imgData = `<h1>Loading......</h1>`
    if(images){
        imgData = images.map(img =>(
            <img src={img.download_url} className='w-[20vw]' key={img.id}/>
        ))
    }

  return (
    <>
    <div className='w-full flex gap-10 flex-wrap p-10'>
        {imgData }
    </div>
    <div className='w-full flex items-center justify-center gap-5'>
        <button onClick={() => page > 1 ? setPage(page-1) : ""}>Prev</button>
        <button>{page}</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
    </>
  )
}

export default Home