import React, {Component} from 'react'
import './stylesheets/search_by_chords.css'
import { ChordsDropDown } from './ChordsDropDown'

export class SearchByChords extends React.Component {
  constructor (props) {
    super (props)

  }

  render () {
    return <div className='container mt-4'>
    <ChordsDropDown/>

   </div>
  }
}
