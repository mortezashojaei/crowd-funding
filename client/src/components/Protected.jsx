import { Navigate } from "react-router-dom";

export const Protected = ({ children }) => {
  if (localStorage.getItem("ACCOUNT") === null) return <Navigate to="/" />;
  return <div>{children}</div>;
};
