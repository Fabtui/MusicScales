import { Selector } from "./Selector";
import { Link } from "react-router-dom";
import '../stylesheets/compare.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceOne } from '@fortawesome/free-solid-svg-icons'
const one = <FontAwesomeIcon icon={faDiceOne} />

export function Compare () {

  return <div className="container">
         <div className="compare-link-container">
          <Link className="compare-link" to="/MyScale">
            {one} single mode
          </Link>
         </div>
          <div className="compare-container">
            <div className="compare-first-selector">
              <Selector inline={true}/>
            </div>
            <div className="compare-second-selector">
              <Selector inline={true}/>
            </div>
          </div>
      </div>
}
