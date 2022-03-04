import './stylesheets/Home.css';
import { Link } from 'react-router-dom';

export function Home () {
  return <div className='home-wrap'>
      <Link className="home-wrap-link" to="/MyScale">
        <div className='home-wrap-item item1'>MY SCALE</div>
        <div className='hint-box'>All about a scale</div>
      </Link>
      <Link className="home-wrap-link" to="/AllScales">
        <div className='home-wrap-item item2'>ALL SCALES</div>
        <div className='hint-box'>See all the existing scales</div>
      </Link>
      <Link className="home-wrap-link" to="/SearchByNotes">
        <div className='home-wrap-item item3'>SEARCH BY NOTES</div>
        <div className='hint-box'>Find a scale by notes</div>
      </Link>
      <Link className="home-wrap-link" to="/SearchByChords">
        <div className='home-wrap-item item4'>SEARCH BY CHORDS</div>
        <div className='hint-box'>Find a scale by chords</div>
      </Link>
      <Link className="home-wrap-link" to="/ChordsSearch">
        <div className='home-wrap-item item5'>SEARCH A CHORD</div>
        <div className='hint-box'>Find a chord</div>
      </Link>
      <Link className="home-wrap-link" to="/CircleOfFifth">
        <div className='home-wrap-item item6'>CIRCLE OF FIFTH</div>
        <div className='hint-box'>Explore the circle of fifth</div>
      </Link>
    </div>

}
