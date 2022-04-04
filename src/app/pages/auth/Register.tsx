import { useState } from "react";
import { useAddAdminMutation } from "../../../services/AdminService";
import Admin from "../../../lib/models/AdminModel";
import ErrorData from "../../../lib/enums/ErrorData";
import formatError from "../../../utils/FormatResponseErrorUtil";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom';

interface formRegister {
  firstName: string;
  lastName: string;
  email: string;
  emailRepeat: string;
  password: string;
  passwordRepeat: string;
  recaptcha: string | null;
}

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  emailRepeat: "",
  password: "",
  passwordRepeat: "",
  recaptcha: null,
};

const Register = () => {
  const [addAdmin] = useAddAdminMutation();
  const [responseError, setResponseError] = useState<ErrorData | null>();
  const [success, setSuccess] = useState<boolean>();
  const [admin, setAdmin] = useState<formRegister>(initialState);

  const onCreate = async () => {
    await addAdmin(admin)
      .unwrap()
      .then((user: Admin) => {
        setSuccess(true);
        setResponseError(null);
        setAdmin({ ...initialState });
      })
      .catch((error: ErrorData) => {
        setSuccess(false);
        setResponseError(formatError(error));
      });
  };

  const onHandleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setAdmin({
      ...admin,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const onChangeRecaptcha = (token: string | null) => {
    setAdmin({
      ...admin,
      recaptcha: token,
    });
  };

  const errors = () => {
    const test: any = [];
    Object.entries(responseError?.errors?.data).forEach(([key, value]) =>
      test.push(value)
    );

    test.forEach((error: Array<string>) => {
      return error[0];
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center py-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <div className="card rounded-xl">
            <div className="card-body">
              <div className="card-title text-center p-3">
                <h5>Create your account</h5>
                {success ? "Successfully created account" : ""}
                {responseError?.errors
                  ? responseError?.errors?.message
                  : responseError?.message}
              </div>
              <div className="p-3">
                <div className="form-floating mb-3">
                  <input
                    className="form-control border-0 border-bottom"
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    onChange={onHandleChange}
                    value={admin.firstName}
                  />
                  <label>First name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control border-0 border-bottom"
                    type="text"
                    name="lastName"
                    placeholder="Surname"
                    onChange={onHandleChange}
                    value={admin.lastName}
                  />
                  <label>Surname</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control border-0 border-bottom"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    onChange={onHandleChange}
                    value={admin.email}
                  />
                  <label>Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control border-0 border-bottom"
                    type="email"
                    name="emailRepeat"
                    placeholder="name@example.com"
                    onChange={onHandleChange}
                    value={admin.emailRepeat}
                  />
                  <label>Confirm email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control border-0 border-bottom"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={onHandleChange}
                    value={admin.password}
                  />
                  <label>Password</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control border-0 border-bottom"
                    type="password"
                    placeholder="name@example.com"
                    name="passwordRepeat"
                    onChange={onHandleChange}
                    value={admin.passwordRepeat}
                  />
                  <label>Repeat your password</label>
                </div>
                <div className="my-4">
                  <ReCAPTCHA
                    sitekey="6LdWxD4fAAAAAOM-c09eviOwrPZfGyU7lYYUn7Ld"
                    onChange={onChangeRecaptcha}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="button"
                    onClick={onCreate}
                    className="btn btn-primary btn-lg btn-create rounded-xl p-3 text-uppercase"
                  >
                    Create Account
                  </button>
                </div>
                <div className="pt-2">
                  Back to &nbsp;
                  <Link className="link-create" to="/auth/login">
                    login.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
