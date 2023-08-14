import * as yup from "yup"
const signInSchema = yup.object().shape({
    // username: yup.string()
    //   .min(3, "Username must be at least 3 characters.")
    //   .max(20, "Username can't be more than 20 characters."),
    password: yup.string()
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
        "Password must be at least 8 characters long, and include at least one digit and one special character.")
      .required("Password is required."),
      email: yup.string().email().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/).required("Email is required."),

  });
  
 
  export default signInSchema;

