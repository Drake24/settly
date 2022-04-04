import { useSelector } from "react-redux";
import { selectUser } from "../../../store/authentication/AuthenticationSlice";
import Navbar from "../Navbar";

const Dashboard = () => {
  const admin = useSelector(selectUser);

  return (
    <div className="container">
      <Navbar />
      <div className="row align-items-md-stretch">
        <div className="col-md-12">
          <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">Dashboard</h1>
              <p className="col-md-8 fs-4">
                Hi {admin?.firstName} Welcome to your admin account
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
