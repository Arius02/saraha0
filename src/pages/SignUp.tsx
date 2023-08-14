import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import schema from "../validation/signUp.validator";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import toastProp from "../utils/toastProp"

const SignUp = () => {
  const [submit, setSubmit] = useState(false);
  const navigate= useNavigate()

  const { register, handleSubmit , formState: { errors },} = useForm<signUpInterface>({
    resolver: yupResolver(schema) as any
});
  const onSubmit :SubmitHandler<signUpInterface> =  async(data)=>{
    setSubmit(true)
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("username", data.username)
    formData.append("email", data.email)
    formData.append("gender", data.gender)
    formData.append("password", data.password)
    formData.append("cPassword", data.cPassword)
    if (data.profilePicture && data.profilePicture.length > 0) {
      formData.append("profilePicture", data.profilePicture[0]);
    }
    const id =toast.loading("Please wait...",{
      autoClose: 5000,
      theme: "light",
      })
       axios({url:'https://saraha-z7xx.onrender.com/users/sign-up',data: formData, method:"POST",
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(res => { 
        toast.update(id, {render: res.data.message, type: "success", ...toastProp
      });
          navigate("/signin")
   }).catch(err => {
    setSubmit(false)

          toast.update(id, {render: err.response.data.message, 
            type: "error", ...toastProp
             });
     });
      

  }
  return <>
  <div className=' md:w-[50%] mx-auto  mt-10  bg-slate-100 p-5' >
  <form className="w-full  flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}  encType="multipart/form-data">
    <div>
    <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${ errors.name?.message&& "border-red-500"} ` }   type="text" placeholder="Name" {...register("name")}/>
    {errors.name?.message &&<p className="text-red-500 text-xs italic">{errors.name.message}</p>}
    </div>
  <div className="mb-3">
    <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${ errors.username?.message&& "border-red-500"} ` }id="grid-last-name" type="text" placeholder="Username" {...register("username")}/>
    {errors.username?.message &&<p className="text-red-500 text-xs italic">{errors.username.message}</p>}

  </div>
  <div className="w-full ">
    <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${ errors.email?.message&& "border-red-500"} ` } type="email" placeholder="Email" {...register("email")}/>
    {errors.email?.message &&<p className="text-red-500 text-xs italic">{errors.email.message}</p>}
  </div>
  <div className="w-full">
    <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${ errors.password?.message&& "border-red-500"} ` }  type="password" placeholder="Password" {...register("password")}/>
    {errors.password?.message &&<p className="text-red-500 text-xs italic">{errors.password.message}</p>}
  </div>
  <div className="w-full">
    <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${ errors.cPassword?.message&& "border-red-500"} ` }  type="password" placeholder="Confirm Password" {...register("cPassword")}/>
    {errors.cPassword?.message &&<p className="text-red-500 text-xs italic">{errors.cPassword.message}</p>}
  </div>
<div className="md:flex block gap-3"> 
    <div className="relative md:w-1/2 w-full md:mb-0 mb-5">
      <select className={`w-full bg-gray-200  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.gender?.message&& "border-red-500"}`} {...register("gender")}>
        <option >Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    {errors.gender?.message &&<p className="text-red-500 text-xs italic">{errors.gender.message}</p>}

  <div className="md:w-1/2 w-full">
    <input className=" block w-full bg-gray-200 text-gray-700  rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="file" placeholder="file" {...register("profilePicture")}/>
    {errors.profilePicture?.message &&<p className="text-red-500 text-xs italic">{errors.profilePicture.message}</p>}

  </div>

</div>
<p>Do you have account? {<Link to="/signin" className='text-blue-500'>Sign in</Link>}</p>
<button className='bg-primary-400 w-fit px-4 py-2 rounded-md text-white mx-auto mt-3' type='submit' disabled={submit}>
  Sign Up
</button>
</form>
  </div>
  </>
 
}

export default SignUp
