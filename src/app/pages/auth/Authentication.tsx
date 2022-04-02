import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Authentication = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Authentication;
