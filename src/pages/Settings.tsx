import {IoIosArrowForward} from "react-icons/io"

import {Link} from "react-router-dom"
import { settingsLinks } from '../utils/constansts';
import { useAuth } from "../context/authContext";

const Settings = () => {

  return   <div className=' md:w-[50%] mx-auto  flex flex-col items-center gap-2 mt-10  bg-slate-100 p-5 border-t-2 border-t-primary-500 rounded-md' >
  <h2 className="text-2xl font-semibold">Account Settings</h2>
  <figure>
    <img src={require("../img/account_setting_main.png")} className="w-60" alt="account settings" />
  </figure>
{settingsLinks.map((link,index)=><Link to={link.to} className='flex items-center justify-between w-full text-xl bg-primary-100 rounded-md p-2 mt-3' key={link.to}> 
  <h3 className="flex gap-1 items-center text-slate-600">
  {<link.Icon className="text-primary-500 text-2xl"/>}
  {link.title}
  </h3>
  <IoIosArrowForward className="text-primary-500"/>
  </Link>)}
  
  </div>
  
}

export default Settings