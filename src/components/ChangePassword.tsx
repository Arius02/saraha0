import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import fetchData from '../utils/fetchData';
import { toast } from 'react-toastify';
import toastProp from '../utils/toastProp';
import schema from '../validation/cahngePassword.validator';


const ChangePassword = () => {
  const {token} = useAuth()
const[submit,setSubmit]= useState(false)
const { register, handleSubmit , formState: { errors },} = useForm<cangePasswordInterface>({
  resolver: yupResolver(schema) as any,
  
});
  const onSubmit =async( data:cangePasswordInterface)=>{

    const id =toast.loading("Please wait...",{
    autoClose: 5000,
    theme: "light",
    })
    fetchData({url:"users/change-password",method:"PATCH",data,token:token as string})
    .then(res => { 
          toast.update(id, {render: res.data.message, type: "success", ...toastProp
          });
    }).catch(err => {
             setSubmit(false)
             toast.update(id, {render: err.response.data.message, 
               type: "error", ...toastProp
               });
               console.log(err)
   });
  
  }
  return <div className="flex flex-col items-center gap-2 ">
    
    <h2 className="text-xl">Change Password</h2>
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
    <div>
      <label htmlFor="old">Old Password</label>
    <input id="old"  {...register("oldPassword")}
    className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white  ` }   type="password" placeholder="Name" />
    {errors.oldPassword?.message &&<p className="text-red-500 text-xs italic">{errors.oldPassword.message}</p>}
    </div>
    <div>
      <label htmlFor="new">New Password</label>
    <input id="new"  {...register("newPassword")}
    className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white  ` }   type="password" placeholder="Name" />
    {errors.newPassword?.message &&<p className="text-red-500 text-xs italic">{errors.newPassword.message}</p>}
    </div>
    <div>
      <label htmlFor="confirm">Confirm Password</label>
    <input id="confirm" {...register("cPassword")}
    className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white  ` }   type="password" placeholder="Name" />
    {errors.cPassword?.message &&<p className="text-red-500 text-xs italic">{errors.cPassword.message}</p>}
    </div>
    <button className='bg-primary-400 block px-4 py-2 rounded-md text-white mx-auto mt-3' type='submit' disabled={submit}>
  Submit
</button>
    </form>
  </div>
  
}

export default ChangePassword