import '../stylesheets/home.css';
import { Link } from 'react-router-dom';

export function Home () {
  return (
    <div className="home-wrap">
      <Link className="home-wrap-link" to="/MyScale">
        <div className="home-wrap-item item1">
          <h2>MY SCALE</h2>
        </div>
        <div className="hint-box">All about a scale</div>
      </Link>
      <Link className="home-wrap-link" to="/AllScales">
        <div className="home-wrap-item item2">
          <h2>ALL SCALES</h2>
        </div>
        <div className="hint-box">See all the existing scales</div>
      </Link>
      <Link className="home-wrap-link" to="/SearchByNotes">
        <div className="home-wrap-item item3">
          <h2>SEARCH BY NOTES</h2>
        </div>
        <div className="hint-box">Find a scale by notes</div>
      </Link>
      <Link className="home-wrap-link" to="/SearchByChords">
        <div className="home-wrap-item item4">
          <h2>SEARCH BY CHORDS</h2>
        </div>
        <div className="hint-box">Find a scale by chords</div>
      </Link>
      <Link className="home-wrap-link" to="/ChordsSearch">
        <div className="home-wrap-item item5">
          <h2>SEARCH A CHORD</h2>
        </div>
        <div className="hint-box">Find a chord</div>
      </Link>
      <Link className="home-wrap-link" to="/CircleOfFifth">
        <div className="home-wrap-item item6">
          <h2>CIRCLE OF FIFTH</h2>
        </div>
        <div className="hint-box">Explore the circle of fifth</div>
      </Link>
      {/* <Link className="home-wrap-link" to="/Modes">
        <div className="home-wrap-item item6">
          <h2>MODES</h2>
        </div>
        <div className="hint-box">See every modes by key</div>
      </Link> */}
    </div>
  );

}
