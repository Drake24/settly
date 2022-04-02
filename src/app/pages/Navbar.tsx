import { Link } from "react-router-dom";
import { logoutUser } from "../../store/authentication/AuthenticationSlice";
import { useAppDispatch } from "../../store/hooks";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const Logout = () => {
    dispatch(logoutUser());
  };
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="../dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="../clients">
              Clients
            </Link>
          </li>
          <li className="nav-item active">
            <a onClick={Logout} className="nav-link">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
