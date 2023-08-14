import * as yup from "yup"



const schema = yup.object().shape({

  oldPassword: yup.string()
  .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, "Password must be at least 8 characters long, and include at least one digit and one special character.").required("Old Password is required"),
  newPassword: yup.string()
  .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, "Password must be at least 8 characters long, and include at least one digit and one special character.").required("New Password is required"),
  cPassword: yup.string()
  .oneOf([yup.ref("newPassword")], "New Passwords must match.")
  .required("Confirm Password is required."),
 
    });
 
  export default schema;