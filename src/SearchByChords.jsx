import React, {Component} from 'react'
import './stylesheets/search_by_chords.css'
import { ChordsDropDown } from './ChordsDropDown'

export class SearchByChords extends React.Component {
  constructor (props) {
    super (props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    console.log(e);
  }

  render () {
    return <div className='container mt-4'>
    <ChordsDropDown onChange={this.handleChange}/>
   </div>
  }
}


// C Maj  0 4 7    C en premier index == 0
// D Min  2 5 9    D en deuxieme index == +2
// E Min  4 7 11
// F Maj  5 9 0
// G Maj

// 0 2 4 5 7 9 11 -> index 0 Maj => C Maj
