import  { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import {BiUserCircle}from "react-icons/bi"
import {IoIosArrowDown, IoIosArrowUp}from "react-icons/io"
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai"
import fetchData from '../utils/fetchData'
import {AiOutlineCloseCircle} from "react-icons/ai";
import { toast } from 'react-toastify'
import { customStyles } from '../utils/modalStyles'
import toastProp from '../utils/toastProp'
import Modal from 'react-modal';
type Props = {
    message:messageInterface
    getMessages: () => Promise<void>

}

const Message = ({message,getMessages}: Props) => {
      const{user,token}=useAuth()
      const [fav,setFav]= useState(false)
      const [submit,setSubmit]= useState(false)

      const [modalIsOpen, setIsOpen] = useState(false);
      const [displayMessage,setDisplayMessage]= useState("")
     const favToggle= async(_id:string)=>{
          const res=await fetchData({url:`messages/${_id}`,method:"PATCH",token:token as string})
          setFav(true)
          console.log("done",_id,res)
          getMessages()    
        }
  
     const deleteMessage=async (_id:string)=>{
      const id =toast.loading("Please wait...",{
        autoClose: 5000,
        theme: "light",
        })
        fetchData({url:`messages/${_id}`,method:"DELETE",token:token as string})
        .then(res => { 
              toast.update(id, {render: res.data.message, type: "success", ...toastProp
              });
              getMessages()
        }).catch(err => {
                 setSubmit(false)
                 toast.update(id, {render: err.response.data.message, 
                   type: "error", ...toastProp
                   });
       });
    }
    return <>
    <div className="flex gap-3">
  <BiUserCircle className="text-2xl"/>
   <h2 onClick={()=>{
      setDisplayMessage(message._id === displayMessage? "" :message._id)
    }} >{message._id !==displayMessage?message.content.slice(0,13)+"...":message.content}</h2>
   </div>
   <div>
    {<AiOutlineCloseCircle onClick={()=>setIsOpen(true)}/>}
   {message._id !==displayMessage?<IoIosArrowDown className="text-primary-500 ml-auto"/>:<IoIosArrowUp className="text-primary-500 ml-auto"/>}
    {message.isFav?<AiFillHeart onClick={()=>favToggle(message._id)} className="text-red-500"/>:<AiOutlineHeart onClick={()=>favToggle(message._id)}/>}
   </div>
  <Modal
          isOpen={modalIsOpen}
          onRequestClose={()=>setIsOpen(false)}
          style={customStyles}
          contentLabel="Delete Account"
        >
       <div className="flex  items-center jstify-between mb-10 gap-4">
        <h2 className="font-semibold text-xl ">Delete messages </h2>
          <button onClick={()=>setIsOpen(false)} className="block ml-auto">
            <AiOutlineCloseCircle/>
          </button>
       </div >
      <div className="flex items-center justify-around">
        <button className="py-1 px-2 rounded-md bg-red-600 text-white" onClick={()=>setIsOpen(false)}>Cancel</button>
        <button onClick={()=>deleteMessage(message._id)} disabled={submit}>Delete </button>
      </div>
        </Modal>

  </>
  }


export default Message