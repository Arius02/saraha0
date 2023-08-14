import { useContext, FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
interface PropType {
  component: React.FC;
}
export const ProtectedRoute: FC<PropType> = ({ component: Component }) => {
  const { token } = useContext(AuthContext);
  const location = useLocation()

   return token ? <Component/>:
   <Navigate to="/signin" state={{ from: location }} replace />
  

};

