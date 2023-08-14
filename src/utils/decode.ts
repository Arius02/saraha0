import jwt_decode from "jwt-decode";
const decode  = (token: string) => {
  try {
    const decocded:{_id:string} = jwt_decode(token);
    return decocded;
  } catch (error) {
    console.error("Token decoded failed:", error);
    return {_id:null}; // or throw an exception
  }
};

export default decode;
