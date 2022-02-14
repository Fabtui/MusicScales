import './stylesheets/Home.css';
import { Link } from 'react-router-dom';

export function Home () {
  return <div className='home-wrap'>
      <Link className="home-wrap-link" to="/MyScale">
        <div className='home-wrap-item item1'>My scale</div>
      </Link>
      <Link className="home-wrap-link" to="/AllScales">
        <div className='home-wrap-item item2'>All scales</div>
      </Link>
      <Link className="home-wrap-link" to="/Search">
        <div className='home-wrap-item item3'>Search</div>
      </Link>
    </div>

}
