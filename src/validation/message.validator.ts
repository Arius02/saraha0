import * as yup from "yup"



const schema = yup.object().shape({
  content: yup.string().min(10, "Message must be at least 10 characters.").max(200, "Message can't be more than 20 characters.")
  .required("Message must Contain just Alphabet"),

    });
 
  export default schema;