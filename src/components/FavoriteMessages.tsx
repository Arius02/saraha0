
import Message from './Message'
type Props = {
    messages:messageInterface[],
    getMessages: () => Promise<void>
}

const FavoriteMessages = ({messages, getMessages}: Props) => {    
   const filterdMessages= messages.filter((message)=>message.isFav === true)

   if(filterdMessages.length<1){
    return <div className="bg-white py-2 px-3 ">
      <figure className=" flex justify-center items-center flex-col  text-gray-500 gap-4">
        <img src={require("../img/empty.png")} alt="no messages" className='w-64' />
        <figcaption>
        You have no favorite messages, share your account link on social media and let your friends send you messages.
        </figcaption>
      </figure>
    </div>
  }
  return <div className="bg-white py-2 px-3">
  {filterdMessages.map((message)=><div  key={message._id} className="flex gap-3 px-2 py-2 items-center  justify-between">
  {<Message message={message} getMessages={getMessages}/>}
</div> )}
</div>
}

export default FavoriteMessages