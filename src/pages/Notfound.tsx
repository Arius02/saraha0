import React from 'react'
import {TbFaceIdError} from "react-icons/tb"

const Notfound = () => {
    return (
    <div className="h-screen flex justify-center items-center flex-col  text-primary-400">
      <TbFaceIdError className='text-[100px] '/>
      <h2 className="text-4xl">Not Found!</h2>
    </div>
  )
}

export default Notfound