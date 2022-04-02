import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { selectIsAuthorized } from "../../store/authentication/AuthenticationSlice";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const ApplicationRoutes = () => {
  const isAuthorize = useSelector(selectIsAuthorized);
  return (
    <>
      {!isAuthorize ? <PublicRoutes /> : <PrivateRoutes />}
      <Routes>
        <Route path="/logout"/>
      </Routes>
    </>
  );
};

export default ApplicationRoutes;
