import { useEffect,  useState } from 'react'
import {LuSend} from "react-icons/lu";
import {RiUserReceived2Line} from "react-icons/ri"
import {MdOutlineFavoriteBorder} from "react-icons/md"
import {BsShare, BsClipboard2, BsFillClipboardCheckFill} from "react-icons/bs"
import Modal from 'react-modal';
import {AiOutlineCloseCircle} from "react-icons/ai";
import {FacebookIcon,FacebookShareButton,TelegramIcon,TelegramShareButton,TwitterIcon,TwitterShareButton,WhatsappIcon,WhatsappShareButton,} from "react-share";
import { useAuth } from '../context/authContext';
import ReceivedMessages from '../components/ReceivedMessages';
import SentMessages from '../components/SentMessages';
import FavoriteMessages from '../components/FavoriteMessages';
import fetchData from '../utils/fetchData';
import { customStyles } from '../utils/modalStyles';
import countMessages from '../utils/countMessages';
import Loading from '../components/Loading';

const Messages = () => {
  const [active, setActive] = useState("sent")
  const [modalIsOpen, setIsOpen] = useState(false);
  const {user,isLoading,token}=useAuth()
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messages,setMessages]=useState<messageInterface[]>([])
  const [copied,setCopied]= useState(false);
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText("https://facebook.com");
    setCopied(true)
    setTimeout(()=>{
      setCopied(false)
    },3000)
  }
  
 

  const getMessages = async()=>{
    setMessagesLoading(true)
    const res = await fetchData({url:"messages/",method:"GET",token:token as string})
    setMessages(res.data.messageAndFav)
    setMessagesLoading(false)

  }
 
  useEffect(()=>{
    getMessages()
  },[])

  return isLoading?<div className="flex h-screen items-center justify-center">
    <Loading/>
  </div>:
    <div className=' md:w-[50%] mx-auto flex flex-col items-center gap-2  mt-10  bg-slate-100 p-5 border-t-2 border-t-primary-500 rounded-md' >
 <figure>
      <img src={user?.profilePicture.secure_url} alt="user"
      className="w-32 h-32 rounded-full" />
    </figure>
    <h2 className="text-xl">{user?.name}</h2>
    <h6 className="text-sm text-slate-400">@{user?.username}</h6>
    <div className="flex gap-2 text-slate-600">
      <h3>Incoming Messages: {!messagesLoading &&countMessages(messages,"sendTo",user?._id)}
      </h3>
      <h3>Recived Messages:   {!messagesLoading &&countMessages(messages,"sentFrom",user?._id)}
</h3>
    </div>
    <div >
      <button type="button" className="flex gap-1 items-center my-3 py-1 px-2 rounded-md " onClick={()=>setIsOpen(true)}>
        <BsShare/>
        Share
        </button>
    </div>
      <div className="inline-flex rounded-md shadow-sm">
        <button type="button" className={`flex  justify-between py-3 px-4  items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium text-gray-700 align-middle  focus:z-10 focus:outline-none transition-all text-sm ${active==="received"?"bg-primary-500":"bg-white"}` }
        onClick={()=>setActive("received")}>
        Received <RiUserReceived2Line/>
        </button>
        <button type="button" className={`flex  justify-between py-3 px-4  items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium text-gray-700 align-middle  focus:z-10 focus:outline-none transition-all text-sm ${active==="sent"?"bg-primary-500":"bg-white"}` }
        onClick={()=>setActive("sent")}>  Sent
        <LuSend/>
        </button>
        <button type="button" className={`flex  justify-between py-3 px-4  items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium text-gray-700 align-middle  focus:z-10 focus:outline-none transition-all text-sm ${active==="favorite"?"bg-primary-500":"bg-white"}` }
        onClick={()=>setActive("favorite")}>  Favorite
        <MdOutlineFavoriteBorder/>
        </button>
      </div>
      {messagesLoading?<Loading/>:<div className="w-full">
        {active ==="received"&&<ReceivedMessages messages={messages} getMessages={getMessages}/>}
        {active ==="sent"&&<SentMessages messages={messages} getMessages={getMessages} />}
        {active ==="favorite"&&<FavoriteMessages messages={messages} getMessages={getMessages}/>}
      </div>}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={()=>setIsOpen(false)}
        style={customStyles}
        contentLabel="Share Account"
      >
     <div className="flex  items-center jstify-between mb-10 ">
      <h2 className="font-semibold text0xl">Share your account </h2>
        <button onClick={()=>setIsOpen(false)} className="block ml-auto">
          <AiOutlineCloseCircle/>
        </button>
     </div >
     <h3 className="text-slate-500 mb-5">Share link on Your social media now and get messages from others.</h3>
       <div className="flex gap-10">
       <FacebookShareButton url={"shareUrl"}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={"shareUrl"}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <TelegramShareButton url={"shareUrl"}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <WhatsappShareButton url={"shareUrl"}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
       </div>
      <div className="w-full bg-slate-200 rounded-md flex justify-between items-center py-1 px-2 mt-5">
        <p>https://facebook.com</p>
      <button className='relative group'>
        {
          !copied? <BsClipboard2 onClick={copyToClipboard}/>:<BsFillClipboardCheckFill/>
        }
        {!copied && <span className="hidden group-hover:block absolute -top-10  rounded-sm px-[1px] text-white bg-black bg-opacity-20 transition-opacity duration-300 ease-in-out left-1/2 -translate-x-1/2">Copy</span>}
        {copied && <span className=" absolute -top-10  rounded-sm px-[1px] text-white bg-black bg-opacity-20 transition-opacity duration-300 ease-in-out left-1/2 -translate-x-1/2">Copied!</span>}
      
      </button>
      </div>
      </Modal>
  </div>
  
}


export default Messages