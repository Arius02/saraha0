import React from 'react'
import PersonalDetails from '../components/PersonalDetails'
import ChangePassword from '../components/ChangePassword'
import { useAuth } from '../context/authContext'
import { useParams } from 'react-router-dom'
type Props = {}

const SettingsDetails = (props: Props) => {
const {id}= useParams()
const {isLoading}= useAuth()
  return isLoading ?<div>loading....</div>:  <div 
  className=' md:w-[50%] mx-auto   mt-10  bg-slate-100 p-5 border-t-2 border-t-primary-500 rounded-md' >
{id==="change-password"&&<ChangePassword/>}
{id==="personal-details"&&<PersonalDetails />}

    </div>
  
}

export default SettingsDetails