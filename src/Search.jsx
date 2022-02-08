import React, {Component} from 'react'
import {SearchCheckboxes} from './SearchCheckboxes'
import './stylesheets/search.css'

export class Search extends React.Component {
  constructor (props) {
    super (props)
    this.state = ({
      selectedNotes: []
    })
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(selectedNotesArray) {
    this.setState({
      selectedNotes: selectedNotesArray
    })
  }

  render () {
    console.log(this.state.selectedNotes);
    return <div className='container'>
    <SearchCheckboxes onChange={this.handleChange}></SearchCheckboxes>
    </div>
  }
}
