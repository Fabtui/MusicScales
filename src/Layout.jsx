import { Outlet, Link, useMatch, useResolvedPath } from "react-router-dom";
import './stylesheets/App.css';
import { Home } from "./Home";
import Child from "./Child";

function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <div>
      <Link
        style={{ borderBottom: match ? "2px solid black" : "none" }}
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
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                <CustomLink className="nav-link" to="/Search">Search</CustomLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
      { match && <Home/>}
      <Link to="/Search" state={{key: 'A', selected_note_index: 2, selected_note: 'E', selected_scale_name:'Major'}}>Search</Link>
      <Child props={'coucou'}/>
    </>
  )
};

export default Layout;
