import axios from "axios"


const fetchData = async({url,method,data,token}:fetchDataInterface)=>{
   const  baseURL= `${process.env.REACT_APP_SERVER_URL}${url}` // Your API's base URL
   const bearer = process.env.REACT_APP_BEARER_TOKEN
  
   axios.defaults.headers.common={token:`${bearer}${token}`};

    const res= await axios({baseURL,method,data})
    return res
}
export default fetchData;