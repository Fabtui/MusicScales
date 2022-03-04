import { Outlet, Link, useMatch, useResolvedPath } from "react-router-dom";
import './stylesheets/navbar.css';
import { Home } from "./Home";

function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <div>
      <Link
        style={{ borderBottom: match ? "2px solid rgba(255, 255, 255, 0.801)" : "none", fontWeight: match ? "600" : "300" }}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
}

const Layout = () => {
  let match = useMatch({ path: '/', end: true });
  return (
    <>
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <h3 className="navbar-brand"><Link className="nav-link" to="/">MusicScale</Link></h3>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <CustomLink className="nav-link" to="/MyScale">My Scale</CustomLink>
              </li>
              <li className="nav-item">
                <CustomLink className="nav-link" to="/AllScales">All Scales</CustomLink>
              </li>
              <li className="nav-item">
                <CustomLink className="nav-link" to="/Search">Search by Notes</CustomLink>
              </li>
              <li className="nav-item">
                <CustomLink className="nav-link" to="/SearchByChords">Search by Chords</CustomLink>
              </li>
              <li className="nav-item">
                <CustomLink className="nav-link" to="/ChordsSearch">Find a Chord</CustomLink>
              </li>
              <li className="nav-item">
                <CustomLink className="nav-link" to="/CircleOfFifth">Circle of Fifth</CustomLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
      { match && <Home/>}
    </>
  )
};

export default Layout;
