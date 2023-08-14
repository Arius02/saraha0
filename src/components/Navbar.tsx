import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {BiMessageDetail} from "react-icons/bi"
import {GoGear} from "react-icons/go"
import {MdLogin, MdOutlineMenu} from "react-icons/md"
import {FiLogOut} from "react-icons/fi"
import { useAuth } from '../context/authContext'
import {AiOutlineClose} from "react-icons/ai"
type Props = {}

const Navbar = (props: Props) => {
  const {token, setToken} = useAuth()
  const [displayList, setDisplayList] = useState<boolean>(false)

  const handleClick = ()=>{
    setDisplayList(!displayList)
  }
  const ref = useRef<HTMLInputElement>(null)


  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDisplayList(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  const logOut=()=>{
    localStorage.removeItem("token")
    setToken(null)
  }
  return (
    <div className='bg-primary-500 px-5 py-2 flex justify-between items-center text-white relative'>
        <Link  to='/' className=' flex gap-2 items-center'>
        <figure>
            <img src={require("../img/Logo.png")} alt="logo"  />
        </figure>
          <h1 className='font-medium text-3xl'>
          Saraha
        </h1>
          </Link>
       <div className="md:hidden sm:block">
       <button type="button" onClick={handleClick} >
        {displayList === false ? <MdOutlineMenu className='dark:text-white text-2xl' /> : <AiOutlineClose className='dark:text-white text-2xl' />}
      </button>
         {
             token? <>
             <div ref={ref} className={displayList === false ?`top-[-1000px] absolute overflow-hidden right-0`:"" + ' absolute top-full right-[10px] w-48 border-[1px]  py-4 rounded-sm  duration-200 bg-slate-100 z-[99999] px-2 '}>
             <Link to="/messages" className="flex space-x-2 items-center hover:bg-primary-200 bg-opacity-60 py-1 px-2 duration-200 text-xl text-slate-600">
             <BiMessageDetail />
              Messages</Link>
              <Link to="/settings" className="flex space-x-2 items-center hover:bg-primary-200 bg-opacity-60 py-1 px-2 duration-200 text-xl text-slate-600">
             <GoGear/>
              settings</Link>
             
              <Link to="/signin" className="flex space-x-2 items-center hover:bg-primary-200 bg-opacity-60 py-1 px-2 duration-200 text-xl text-slate-600" onClick={logOut}>
             <FiLogOut/>
              logOut</Link>

             </div></>
        :  
           <>
            <li className="">
           <Link to="/signin">
           <button className="px-3 py-1 bg-primary-600 rounded flex gap-1 text-xl items-center">
                Log in
            <MdLogin/>
            </button>
            </Link>
            </li>
            <li className="flex gap-1 text-xl items-center">
            <Link to="signup">
            <button className="px-3 py-1 bg-primary-600 rounded">
                Sign up
            </button></Link>
            </li>
           </>
             }
       </div>
      <div className="hidden md:block">
      {
             token? <>
             <div className="flex gap-2">
             <Link to="/messages" className="flex gap-2 font-medium items-center  text-xl text-white">
             <BiMessageDetail />
              Messages</Link>
              <Link to="/settings" className="flex gap-2 font-medium items-center  text-xl text-white">
             <GoGear/>
              settings</Link>
             
              <Link to="/signin" className="flex gap-2 font-medium items-center  text-xl text-white" onClick={logOut}>
             <FiLogOut/>
              logOut</Link>

             </div></>
        :  
           <>
            <li className="">
           <Link to="/signin">
           <button className="px-3 py-1 bg-primary-600 rounded flex gap-1 text-xl items-center">
                Log in
            <MdLogin/>
            </button>
            </Link>
            </li>
            <li className="flex gap-1 text-xl items-center">
            <Link to="signup">
            <button className="px-3 py-1 bg-primary-600 rounded">
                Sign up
            </button></Link>
            </li>
           </>
             }
      </div>
    </div>
  )
}

export default Navbar