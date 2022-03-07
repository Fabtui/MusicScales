import React, {Component} from 'react'
import { SearchCheckboxes } from './SearchCheckboxes'
import { GuitarNeckBasic } from './GuitarNeckBasic'
import { SearchChordsToFretApi } from './SearchChordsToFretApi'
import './stylesheets/chords_search.css'
import { EVERY_CHORDS } from './data/chords'
import { NOTES, CHORDS_INTERVALS, CHORDS_INTERVALS_SHAPES } from './data'

function MakeChordDetailsRow ({note, structure, shape}) {
  const key = `${note}${structure}${shape}`
  return (
    <tr key={key}>
      <th scope="row">{note}</th>
      <td>{shape}</td>
      <td>{structure}</td>
    </tr>
  )
}

function SpecialChord (notesIntervals) {
  if (!notesIntervals.includes(3) && !notesIntervals.includes(4)) {
    if (notesIntervals.includes(5)) {
      return 'sus4'
    }
    if (notesIntervals.includes(2)) {
      return 'sus2'
    }
  }
}

class ChordDetails extends React.Component {
  render () {
      const key = this.props.chord.split(' ')[0]
      const chordShape = this.props.chord.split(' ')[1]
      const notes = EVERY_CHORDS[key][chordShape].split(' ')
      const notesIntervals = notes.map(note => NOTES.indexOf(note))
      const notesIntervalsMutated = notesIntervals.map(interval => interval - notesIntervals[0])
      const notesIntervalsMutatedExtend = notesIntervalsMutated.map(interval => interval < 0 ? interval + 12 : interval)

      console.log('notesIntervalsMutatedExtend', notesIntervalsMutatedExtend);

      const structure = notesIntervalsMutatedExtend.map(interval => CHORDS_INTERVALS[interval])
      structure[0] = 'R'

      console.log('structure', structure);

      const shapes = notesIntervalsMutated.map((interval, index) => CHORDS_INTERVALS_SHAPES[- (notesIntervalsMutated[index -1] - interval)] )
      shapes[0] = null
      //suspended chord: chord has no third (no m3 or 3)
      	// major chord: chord has major third (R + 3)
        // chord is 7 (dominant 7): major chord (R,3,5) + m7
        // chord is 11: chord 7 with added 4th (11th)
      const rows = []
      const special = SpecialChord(notesIntervalsMutated)
      notes.forEach((note, index) => {
        rows.push(MakeChordDetailsRow({note: note, structure: structure[index], shape: shapes[index]}))
      });
    return <>
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">Note</th>
                <th scope="col">Interval</th>
                <th scope="col">Scale Degree</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
          {special}
    </>
  }
}

export class ChordsSearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = ({
      selectedNotes: [],
      selectedChord: 'A diminished7',
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

  handleClick (chord) {
    this.setState ({
      selectedChord: chord
    })
  }

  render () {
    const apiResultStyle = this.state.fretboardDisplay ? 'mini-display' : 'max-display'
    return <div className='container chords-search-result'>
      <div className='search-checkboxes'>
        <SearchCheckboxes onClick={this.handleRemoveClick} selectedNotes={this.state.selectedNotes} onChange={this.handleChange}></SearchCheckboxes>
      </div>
      <div className='search-container'>
        <div className='search-note-left-side'>
          <div className='fretboard-display-checkbox'>
            <input onChange={this.handleCheck} className="form-check-input" checked={this.state.fretboardDisplay} type="checkbox" value="" id="flexCheckDefault" name='display-fretboard'/>
            <label htmlFor='display-fretboard'>Fretboard</label>
          </div>
            <div className='chords-search-result'>
            {this.state.fretboardDisplay && <GuitarNeckBasic selectedNotes={this.state.selectedNotes} onChange={this.handleNeckClick}/>}
            <SearchChordsToFretApi style={apiResultStyle} selectedNotes={this.state.selectedNotes} onClick={this.handleClick}/>
            </div>
          </div>
          <div className='search-note-left-side'>
            <ChordDetails chord={this.state.selectedChord}/>
          </div>
        </div>
    </div>
  }
}
