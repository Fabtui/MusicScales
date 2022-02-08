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
  }


  render () {
    const items = []
    NOTES.map((note, index) => items.push(<MakeSearchCheckboxes key={index} note={note}/>))
    return <div className='search-checkboxes'>
      {items}
    </div>
  }
}
