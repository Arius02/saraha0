import { useForm, } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import signInSchema from "../validation/signIn.validator";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import toastProp from "../utils/toastProp"
import { AuthContext } from "../context/authContext";


const SignIn = () => {  
  const [submit, setSubmit] = useState(false);
  const navigate= useNavigate()
const {auth}= useContext(AuthContext)
  const { register, handleSubmit , formState: { errors },} = useForm<signInInterface>({
    resolver: yupResolver(signInSchema)
  });


  const onSubmit=  async(data:signInInterface)=>{
 
       const id =toast.loading("Please wait...",{
      autoClose: 5000,
      theme: "light",
      })
       axios.patch('https://saraha-z7xx.onrender.com/users/sign-in',data
        
      ).then(res => { 
        toast.update(id, {render: res.data.message, type: "success", ...toastProp
      });
      auth(res.data.token)
          navigate("/")
   }).catch(err => {
    setSubmit(false)
          toast.update(id, {render: err.response.data.message, 
            type: "error", ...toastProp
             });
     });

    }
  return     <div className=' md:w-[50%] mx-auto  mt-10  bg-slate-100 p-5' >
   
  <form className="w-full  flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>

  <div className="mb-3" >
      <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${ errors.email?.message&& "border-red-500"} ` } type="email" placeholder="Email" {...register("email")}/>
      {errors.email?.message &&<p className="text-red-500 text-xs italic">{errors.email.message}</p>}
    </div>
  <div className="w-full">
      <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${ errors.password?.message&& "border-red-500"} ` }  type="password" placeholder="Password" {...register("password")}/>
      {errors.password?.message &&<p className="text-red-500 text-xs italic">{errors.password.message}</p>}
    </div>
<p>Don't have an account? {<Link to="/signup" className='text-blue-500'>Sign up</Link>}</p>
<button className='bg-primary-400 w-fit px-4 py-2 rounded-md text-white mx-auto mt-3' type='submit' disabled={submit}>
  Sign In
</button>
</form>
  </div>
}

export default SignIn