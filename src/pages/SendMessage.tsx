import React, {  useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import fetchData from '../utils/fetchData'
import Loading from '../components/Loading'
import { useAuth } from '../context/authContext'
import decode from '../utils/decode'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from '../validation/message.validator'
import { toast } from 'react-toastify'
import toastProp from '../utils/toastProp'
const SendMessage = () => {
    const {username}=useParams()
    const [isLoading, setIsLoading] = useState(true)
    const[submit,setSubmit]= useState(false)
    const [found,setFound]=useState(false)
    const [user, setUser] = useState<userInterface>({} as userInterface)
    const{token}= useAuth()
    const { register, handleSubmit , formState: { errors },reset} = useForm<sendMessageInterface>({
        resolver: yupResolver(schema) ,
     
      });
    const getUser =async()=>{
try {
    const res =  await fetchData({url:`users/${username}`,method:"GET" })
    setUser(res.data.user)
    setIsLoading(false)
    setFound(true)
} catch (error:any) {
    setIsLoading(false)
    setFound(false)
}
    }
    useMemo(()=>{
        getUser()
    },[])
const onSubmit =async(data:sendMessageInterface)=>{
     
        const decoded = decode(token as string)
        data.sentFrom= token?decoded._id: null;
        const id =toast.loading("Please wait...",{
            autoClose: 5000,
            theme: "light",
            })
        fetchData({url:`messages/${username}`,method:"POST", data })  
        .then(res => { 
            toast.update(id, {render:"Message sent successfully!", type: "success", ...toastProp
            })
            reset()
        })
     .catch(err => {
               setSubmit(false)
               toast.update(id, {render: err.response.data.error, 
                 type: "error", ...toastProp
                 })
                })

}
  return isLoading?<div className="flex h-screen items-center justify-center">
  <Loading/>
</div>:found?    <div className=' md:w-[50%] mx-auto flex flex-col items-center gap-2  mt-10  bg-slate-100 p-5 border-t-2 border-t-primary-500 rounded-md' >

<div className="flex flex-col items-center gap-2 w-full">
    <figure>
      <img src={user?.profilePicture.secure_url} alt="user"
      className="w-32 h-32 rounded-full" />
    </figure>
    <h2 className="text-xl">{user?.name}</h2>
    <h6 className="text-sm text-slate-400">@{user?.username}</h6>
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
    <div >
      <label htmlFor="message" className="text-xl ">Write a Message</label>
    <textarea id="message" {...register("content")} placeholder='Write Your message here.....'
    className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 my-3 leading-tight focus:outline-none focus:bg-white  ` }/>
    {errors.content?.message &&<p className="text-red-500 text-xs italic">{errors.content.message}</p>}
    </div>

    <button className='bg-primary-400 block px-4 py-2 rounded-md text-white mx-auto mt-3' type='submit'  disabled={submit}>
  Send
</button>
    </form>

  
  </div>
  </div>:<Navigate to="*"/>
  
}

export default SendMessage