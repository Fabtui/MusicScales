import React, {Component} from 'react'
import { NOTES } from './data'
import './stylesheets/scale_search.css'

class MakeCheckbox extends React.Component  {
  constructor (props) {
    super (props)
    this.state = {
      isChecked: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState ({
      isChecked: e.target.checked
    })
    this.props.onChange(e.target.value, e.target.checked)
  }

  render () {
      return <div key={this.props.note}>
        <input className="form-check-input" type="checkbox" value={this.props.note} id="flexCheckDefault" onChange={this.handleChange}></input>
        <label className="form-check-label" htmlFor="flexCheckDefault">
        {this.props.note}
      </label>
    </div>
  }
}

class MakeNotesCheckbox extends React.Component  {
  constructor (props) {
    super (props)
    this.state = {
      selectedNotes: []
    }
    this.handleCheckChange = this.handleCheckChange.bind(this)
  }

  handleCheckChange (note, checked) {
    console.log(note, checked);
  }

  render () {
    const items = []
    NOTES.forEach(note => {
      items.push( <MakeCheckbox isChecked={this.state.isChecked} key={note} note={note} onChange={this.handleCheckChange}/>)
    })
    return <React.Fragment>
        {items}
      </React.Fragment>
  }
}

export class ScaleSearch extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      selectedNotes: []
    }
  }

  render () {
    return <div className="scale-search">
      <h1>Scale Search</h1>
      <div className="notes-checkboxes">
        <MakeNotesCheckbox/>
      </div>
    </div>
  }
}
