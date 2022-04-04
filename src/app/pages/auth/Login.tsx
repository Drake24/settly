import { useState } from "react";
import { useAuthenticateMutation } from "../../../services/AuthenticationService";
import { saveUserCredentials } from "../../../store/authentication/AuthenticationSlice";
import { useAppDispatch } from "../../../store/hooks";
import Admin from "../../../lib/models/AdminModel";
import ErrorData from "../../../lib/enums/ErrorData";
import formatError from "../../../utils/FormatResponseErrorUtil";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [authenticate, { isLoading }] = useAuthenticateMutation();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [responseError, setResponseError] = useState<ErrorData | null>();

  const onSubmit = async () => {
    setLoading(true);

    await authenticate(credentials)
      .unwrap()
      .then((user: Admin) => {
        dispatch(saveUserCredentials(user));
      })
      .catch((error: ErrorData) => {
        setResponseError(formatError(error));
      });
  };

  const onHandleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center py-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <div className="card rounded-xl">
            <div className="card-body">
              <div className="card-title text-center p-3">
                <h5>Login</h5>
                <div className="alert-text font-weight-bold">
                  {responseError?.errors
                    ? responseError?.errors.message
                    : responseError?.message}
                </div>
              </div>
              <div className="form-floating mb-3">
                <input
                  name="email"
                  type="email"
                  className="form-control border-0 border-bottom"
                  placeholder="name@example.com"
                  onChange={onHandleChange}
                />
                <label>Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  name="password"
                  className="form-control border-0 border-bottom"
                  type="password"
                  placeholder="Password"
                  onChange={onHandleChange}
                />
                <label>Password</label>
              </div>
              <div className="d-grid gap-2">
                <button
                  onClick={onSubmit}
                  className="btn btn-primary btn-lg btn-create rounded-xl p-3 text-uppercase"
                >
                  Login
                </button>
              </div>
              <span>
                No account yet? &nbsp;
                <Link className="link-create" to="/auth/register">Create one here.</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
