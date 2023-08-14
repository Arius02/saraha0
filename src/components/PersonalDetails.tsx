import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from '../validation/update.validator'
import fetchData from '../utils/fetchData'
import { toast } from 'react-toastify'
import toastProp from '../utils/toastProp'
import Modal from 'react-modal';
import {AiOutlineCloseCircle} from "react-icons/ai";
import { useNavigate } from 'react-router-dom'
import { customStyles } from '../utils/modalStyles'

type Props = {}

const PersonalDetails = (props: Props) => {
const {user,token,setUser,auth } = useAuth()
const[submit,setSubmit]= useState(false)
const [modalIsOpen, setIsOpen] = useState(false);
const navigate = useNavigate()

const { register, handleSubmit , formState: { errors },} = useForm<updateInterface>({
  resolver: yupResolver(schema) as any,
  defaultValues: {
    username:user?.username,
    name:user?.name,
    email:user?.email,
    gender:user?.gender 
}
});
const onSubmit =async( data:updateInterface)=>{
  const defaultValues: updateInterface = {
    username: user?.username || '',
    name: user?.name || '',
    email: user?.email || '',
    gender: user?.gender || '',
  };

  let updatedFields: Partial<updateInterface> = {};

  // Compare each field value with defaultValues
  for (const key in data) {
    if (data[key as keyof updateInterface] !== defaultValues[key as keyof updateInterface]) {
      updatedFields[key as keyof updateInterface] = data[key as keyof updateInterface];
    }
  }
  if (Object.keys(updatedFields).length > 0) {
  const id =toast.loading("Please wait...",{
  autoClose: 5000,
  theme: "light",
  })
  fetchData({url:"users/",method:"PUT",data:updatedFields,token:token as string})
  .then(res => { 
        toast.update(id, {render: res.data.message, type: "success", ...toastProp
        });
        setUser(res.data.user)
  }).catch(err => {
           setSubmit(false)
           toast.update(id, {render: err.response.data.error, 
             type: "error", ...toastProp
             });
 });
} else{
  toast.warn("NO field changed to update!")
}
}
const deleteAccount=async ()=>{
  const id =toast.loading("Please wait...",{
    autoClose: 5000,
    theme: "light",
    })
    fetchData({url:"users/",method:"DELETE",token:token as string})
    .then(res => { 
          toast.update(id, {render: res.data.message, type: "success", ...toastProp
          });
          navigate("/signin")
      auth(null)
    }).catch(err => {
             setSubmit(false)
             toast.update(id, {render: err.response.data.message, 
               type: "error", ...toastProp
               });
   });
}
  return <div className="flex flex-col items-center gap-2 ">
    <figure>
      <img src={user?.profilePicture.secure_url} alt="user"
      className="w-32 h-32 rounded-full" />
    </figure>
    <h2 className="text-xl">{user?.name}</h2>
    <h6 className="text-sm text-slate-400">@{user?.username}</h6>
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
    <div >
      <label htmlFor="name">Name</label>
    <input id="name" {...register("name")} 
    className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white  ` }/>
    {errors.name?.message &&<p className="text-red-500 text-xs italic">{errors.name.message}</p>}
    </div>
    <div>
      <label htmlFor="username">Username</label>
    <input id="username" {...register("username")}
    className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white  ` }   type="text"  />
    {errors.username?.message &&<p className="text-red-500 text-xs italic">{errors.username.message}</p>}
    </div>
    <div>
      <label htmlFor="email">Email</label>
    <input id="email"   {...register("email")} 
    className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white  ` }   type="email"  />
    {errors.email?.message &&<p className="text-red-500 text-xs italic">{errors.email.message}</p>}
    </div>
    <div className="relative  md:mb-0 mb-5">
      <label htmlFor="gender">Gender</label>
      <select className={`w-full bg-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 `} id="gender"  {...register("gender")} >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    <button className='bg-primary-400 block px-4 py-2 rounded-md text-white mx-auto mt-3' type='submit'  disabled={submit}>
  Submit
</button>
    </form>
<button className="text-red-600  block ml-auto text-sm" onClick={()=>setIsOpen(true)}>
  Delete Account 
</button>
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={()=>setIsOpen(false)}
        style={customStyles}
        contentLabel="Delete Account"
      >
     <div className="flex  items-center jstify-between mb-10 gap-4">
      <h2 className="font-semibold text-xl ">Delete your account </h2>
        <button onClick={()=>setIsOpen(false)} className="block ml-auto">
          <AiOutlineCloseCircle/>
        </button>
     </div >
    <div className="flex items-center justify-around">
      <button className="py-1 px-2 rounded-md bg-red-600 text-white" onClick={()=>setIsOpen(false)}>Cancel</button>
      <button onClick={deleteAccount}>Delete </button>
    </div>
      </Modal>
  </div>
  
}

export default PersonalDetails