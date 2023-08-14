import {BiPencil} from "react-icons/bi"
import {MdPassword} from "react-icons/md"
import {FcAbout} from "react-icons/fc"
import {MdContactSupport} from "react-icons/md"

export const settingsLinks =[
    {
        title:"Personal Details",
        to:"/settings/personal-details",
        Icon:BiPencil
    },
    {
        title:"Change Password",
        to:"/settings/change-password",
        Icon:MdPassword
    },
    {
        title:"About Saraha",
        to:"/settings/about",
        Icon:FcAbout
    }, 
    {
        title:"Contact Us",
        to:"/settings/contact",
        Icon:MdContactSupport
    },
]