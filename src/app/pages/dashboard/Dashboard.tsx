const Dashboard = () => {
  return (
    <>
    <div className="container">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main role="main" className="container">
        <div className="starter-template">
          <h1>Bootstrap starter template</h1>
          <p className="lead">
            Use this document as a way to quickly start any new project.
            <br /> All you get is this text and a mostly barebones HTML
            document.
          </p>
        </div>
      </main>
      </div>
    </>
  );
};

export default Dashboard;
