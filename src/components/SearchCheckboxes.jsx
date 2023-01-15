import React from 'react'
import {NOTES} from '../data/data'
import '../stylesheets/search_by_notes.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
const cross = <FontAwesomeIcon icon={faXmark} />

class MakeSearchCheckboxes extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      checked: this.props.checked
    }
  this.handleCheck = this.handleCheck.bind(this)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    this.setState({
      checked: nextProps.checked
    });
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
      selectedNotes: this.props.selectedNotes
    })
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    this.setState({
      selectedNotes: nextProps.selectedNotes
    });
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

  handleClick () {
    this.props.onClick()
  }

  render () {
    const noteSelected = this.state.selectedNotes.length > 0
    const items = []
    const selectedNotes = this.state.selectedNotes
    NOTES.map((note, index) => {
      const checked = selectedNotes.includes(NOTES.indexOf(note))
      items.push(<MakeSearchCheckboxes checked={checked} selectedNotes={this.state.selectedNotes} key={index} index={index} note={note} onChange={this.handleChange}/>)
      }
    )
    return <div className='search-checkboxes'>
      {items}
      {noteSelected && <span id='checkbox-remove-button' onClick={this.handleClick}>{cross}</span>}
    </div>
  }
}
