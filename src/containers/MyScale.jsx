import { Selector } from "../components/Selector";
import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeCompare } from '@fortawesome/free-solid-svg-icons'
const compare = <FontAwesomeIcon icon={faCodeCompare} />

export class MyScale extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected_note_index: 2,
      selected_scale_name: 'minor'
    }
  }

  render () {
    return <div className="container">
          <div className="compare-link-container">
          <Link className="compare-link" to="/Compare" state={{selected_note_index: this.state.index, selected_scale_name: this.state.shape}}>
            {compare} comparison mode
          </Link>
          </div>
          <Selector inline={false}/>
        </div>
}
}
