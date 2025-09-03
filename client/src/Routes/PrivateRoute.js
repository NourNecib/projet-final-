import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute =  ({ children, allowedRole }) => {
  const user =  useSelector((state) => state.user);
  console.log(user)
  

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/" />;
  } 

  return children;
};

export default PrivateRoute;