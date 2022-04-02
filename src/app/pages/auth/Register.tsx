const Register = () => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center py-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <div className="card rounded-xl">
            <div className="card-body">
              <div className="card-title text-center p-3">
                <h5>Create your account</h5>
              </div>
              <div className="p-3">
                <div className="form-floating mb-3">
                  <input
                    className="form-control border-0 border-bottom"
                    type="text"
                    placeholder="First name"
                  />
                  <label>First name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control border-0 border-bottom"
                    type="text"
                    placeholder="Surname"
                  />
                  <label>Surname</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control border-0 border-bottom"
                    type="email"
                    placeholder="name@example.com"
                  />
                  <label>Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control border-0 border-bottom"
                    type="email"
                    placeholder="name@example.com"
                  />
                  <label>Confirm email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control border-0 border-bottom"
                    type="password"
                    placeholder="Password"
                  />
                  <label>Password</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control border-0 border-bottom"
                    type="password"
                    placeholder="name@example.com"
                  />
                  <label>Repeat your password</label>
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-create rounded-xl p-3 text-uppercase"
                  >
                    Create Account
                  </button>
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
