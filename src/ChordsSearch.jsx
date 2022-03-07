import React, {Component} from 'react'
import { SearchCheckboxes } from './SearchCheckboxes'
import { GuitarNeckBasic } from './GuitarNeckBasic'
import { SearchChordsToFretApi } from './SearchChordsToFretApi'
import './stylesheets/chords_search.css'
import { NOTES } from './data'

class ScalesChordsApi extends React.Component {
  constructor (props) {
    super (props)
    this.state = ({
      selectedChord: this.props.chord
    })
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    this.setState({
      selectedChord: nextProps.chord
    });
  }

  render () {
    const chord = this.state.selectedChord
    const row = []
    row.push(<ins className="scales_chords_api" output="image" chord={chord}></ins>)
    console.log(row);
    return <>
    {row}
    </>
  }
}

export class ChordsSearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = ({
      selectedNotes: [],
      selectedChord: "Am",
      fretboardDisplay: false
    })
    this.handleChange = this.handleChange.bind(this)
    this.handleNeckClick = this.handleNeckClick.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(selectedNotesArray) {
    selectedNotesArray.sort(function(a, b){return a - b;});
    this.setState({
      selectedNotes: selectedNotesArray
    })
  }

  handleNeckClick(e) {
    const noteIndex = NOTES.indexOf(e);
    const selectedNotes = this.state.selectedNotes;
    if (selectedNotes.includes(noteIndex)) {
      const index = selectedNotes.indexOf(noteIndex)
      selectedNotes.splice(index, 1)
      this.setState({
        selectedNotes: selectedNotes
      })
      return
    } else {
      const newSelectedNotes = [...this.state.selectedNotes, noteIndex]
      this.setState ({
        selectedNotes: newSelectedNotes
      })
    }
  }

  handleCheck() {
    this.setState ({
      fretboardDisplay: !this.state.fretboardDisplay
    })
  }

  handleRemoveClick () {
    this.setState ({
      selectedNotes: []
    })
  }

  handleClick (e) {
    const mutatedChord = `${e.split(' ')[0]}(${e.split(' ')[1]})`
    this.setState ({
      selectedChord: mutatedChord
    })
  }

  render () {
    const apiResultStyle = this.state.fretboardDisplay ? 'mini-display' : 'max-display'
    return <div className='container chords-search-result'>
      <div className='search-checkboxes'>
        <SearchCheckboxes onClick={this.handleRemoveClick} selectedNotes={this.state.selectedNotes} onChange={this.handleChange}></SearchCheckboxes>
      </div>
      <div className='fretboard-display-checkbox'>
        <input onChange={this.handleCheck} className="form-check-input" checked={this.state.fretboardDisplay} type="checkbox" value="" id="flexCheckDefault" name='display-fretboard'/>
        <label htmlFor='display-fretboard'>Fretboard</label>
      </div>
        <div className='chords-search-result'>
         {this.state.fretboardDisplay && <GuitarNeckBasic selectedNotes={this.state.selectedNotes} onChange={this.handleNeckClick}/>}
         <SearchChordsToFretApi style={apiResultStyle} selectedNotes={this.state.selectedNotes} onClick={this.handleClick}/>
        </div>
          <ScalesChordsApi chord={this.state.selectedChord}/>
          <ins className="scales_chords_api" chord="D(Major)"></ins>
    </div>
  }
}
