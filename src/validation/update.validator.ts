import * as yup from "yup"



const schema = yup.object().shape({
  name: yup.string().min(3, "Name must be at least 3 characters.").max(20, "Name can't be more than 20 characters.")
  .matches(/^[A-Za-z\u0600-\u06FF ]+$/  , "Name must Contain just Alphabet"),
  username: yup.string().min(3, "username must be at least 3 characters.")
  .max(20, "username can't be more than 20 characters.")
  .matches(/^[A-Za-z0-9]+$/,"Username must be english without any special characters"),
  email: yup.string().email()
  .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/, "Please inter a valid name"),
  gender: yup.string().oneOf(["male", "female"]),
  profilePicture: yup
    .mixed(),
    
    });
 
  export default schema;