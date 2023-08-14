
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    REACT_APP_BEARER_TOKEN:string
    REACT_APP_TOKEN_SECRET_KEY:string
    REACT_APP_SERVER_URL:string
  }
}
interface signUpInterface {
    username:string;
    name: string;
    password: string;
    email: string;
    cPassword: string;
    gender: "male" | "female";
    profilePicture: FileList;
  }

  interface signInInterface {
    email: string;
    password: string;
  }
  interface fetchDataInterface {
    url:string;
    method: string;
    data?: any;
  token?:string;
    
  }

 interface  userInterface {
  username:string;
  name:string;
  email:string;
  password:string;
  profilePicture:{
    public_id:string;
    secure_url:string;
  },
  isConfirmed:boolean;
  gender:string;
  myFav:[string];
  _id?:string;
 }
 interface updateInterface {
  username:string;
  name: string;
  email: string;
  gender: string;
  // profilePicture: FileList;
}
interface responseInterface{
  message:string;
  status:boolean;
  user?:userInterface
}
interface cangePasswordInterface{
oldPassword:string;
newPassword:string;
cPassword:string;
}
interface messageInterface{
  content: string;
createdAt?: date;
sendTo:string; 
sentFrom:string 
_id:string;
isFav:boolean
}
interface sendMessageInterface{
  content:string;
  sentFrom?:string |null
}