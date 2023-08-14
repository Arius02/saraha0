import axios from 'axios';
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import decode from '../utils/decode';

export type tokenType =string | null

export interface AuthContextData {
  token: tokenType;
  setToken: Dispatch<SetStateAction<tokenType>>;
  auth: (token:tokenType)=>void;
  user:userInterface | null;
  setUser:Dispatch<SetStateAction<userInterface|null>>;
  getUser: ()=> Promise<void>;
  isLoading:boolean;
  setIsLoading:Dispatch<SetStateAction<boolean>>;
}
const defaultState= {
  token:localStorage.getItem("token"),
  setToken:(token:tokenType)=>{}
} as AuthContextData

export const AuthContext = createContext(defaultState);

type userProviderProps = {
  children :ReactNode
}

export default function AuthProvider ({children}:userProviderProps){
  const [token, setToken]= useState<tokenType>(localStorage.getItem("token"))
  const [user,setUser] =useState<userInterface|null>(null)
  const [isLoading,setIsLoading] =useState<boolean>(false)

  const auth = (token:tokenType)=>{
  if(token){
    setToken(token)
  localStorage.setItem("token", token as string)
  }else{
    setToken(null)
    localStorage.removeItem("token")
  }
}
  const getUser = async()=>{
    if(token){
      setIsLoading(true)
      const decoded = decode(localStorage.getItem("token")as string)
      const loggedUser: {data:{user:userInterface}}= await axios.get(`${process.env.REACT_APP_SERVER_URL}users/${decoded._id}`)
      setUser(loggedUser.data.user)
      setIsLoading(false)
          }

  }
  return <AuthContext.Provider value={{token, setToken, auth, user, getUser, isLoading,setUser, setIsLoading}}>
  {children}
  </AuthContext.Provider>
}
export const useAuth=()=>{
  return useContext(AuthContext)
}