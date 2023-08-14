import * as yup from "yup"



const schema = yup.object().shape({
  name: yup.string().min(3, "Name must be at least 3 characters.").max(20, "Name can't be more than 20 characters.")
  .required("Your Name is required."),
  username: yup.string().min(3, "username must be at least 3 characters.")
  .max(20, "username can't be more than 20 characters.")
  .required("Your Username is required."),
  password: yup.string()
  .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, "Password must be at least 8 characters long, and include at least one digit and one special character.").required("Password is required"),
  cPassword: yup.string()
  .oneOf([yup.ref("password")], "Passwords must match.")
  .required("Confirm Password is required."),
  email: yup.string().email()
  .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net)$/)
  .required("Email is required."),
  gender: yup.string().oneOf(["male", "female"])
  .required("Gender is required."),
  profilePicture: yup
    .mixed()
    .test(
      "fileRequired",
      "Profile Picture is required",
      (value) => value instanceof FileList && value.length > 0    ),
    });
 
  export default schema;