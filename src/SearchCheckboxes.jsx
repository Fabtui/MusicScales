import React, {Component} from 'react'
import {NOTES} from './data'
import './stylesheets/search.css'

class MakeSearchCheckboxes extends React.Component {
   constructor (props) {
    super (props)
    this.state = {
      checked: false
    }
  this.handleCheck = this.handleCheck.bind(this)
  }

  handleCheck(e) {
    this.setState({
      checked: e.target.checked
    })
    this.props.onChange(e.target.checked, this.props.index)
  }

  render () {
    return <div className="form-check search-form-check">
        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={this.state.checked} onChange={this.handleCheck}/>
        <label className="form-check-label" htmlFor="flexCheckDefault">
          {this.props.note}
        </label>
      </div>
  }
}

export class SearchCheckboxes extends React.Component {
  constructor (props) {
    super (props)
    this.state = ({
      selectedNotes: []
    })
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (checked, note) {
    if (checked) {
      const selectedNotes = [...this.state.selectedNotes, note]
      this.setState({
        selectedNotes: selectedNotes
      })
      this.props.onChange(selectedNotes)
    } else {
      const index = this.state.selectedNotes.indexOf(note)
      const selectedNotes = this.state.selectedNotes
      selectedNotes.splice(index, 1)
      this.setState({
        selectedNotes: selectedNotes
      })
      this.props.onChange(selectedNotes)
    }
  }

  render () {
    const items = []
    NOTES.map((note, index) => items.push(<MakeSearchCheckboxes key={index} index={index} note={note} onChange={this.handleChange}/>))
    return <div className='search-checkboxes'>
      {items}
    </div>
  }
}
