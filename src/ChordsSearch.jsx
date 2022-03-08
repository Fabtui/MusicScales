import React, {Component} from 'react'
import { SearchCheckboxes } from './SearchCheckboxes'
import { GuitarNeckBasic } from './GuitarNeckBasic'
import { SearchChordsToFretApi } from './SearchChordsToFretApi'
import './stylesheets/chords_search.css'
import { EVERY_CHORDS } from './data/chords'
import { NOTES, CHORDS_INTERVALS, CHORDS_INTERVALS_SHAPES } from './data'

function MakeChordDetailsRow ({index, note, degree, shape}) {
  const scaleDegree = (index > 2 && degree === '2' ) ? '9 / 2' : degree;
  return (
    <tr key={index}>
      <th scope="row">{note}</th>
      <td>{shape}</td>
      <td>{scaleDegree}</td>
    </tr>
  )
}

function MakeChordDetails (chord) {
  const key = chord.split(' ')[0]
  const chordShape = chord.split(' ')[1]
  const notes = EVERY_CHORDS[key][chordShape].split(' ')
  const notesIntervals = (notes.map(note => NOTES.indexOf(note)))
  const notesIntervalsMutated = notesIntervals.map(interval => interval - notesIntervals[0])
  const notesIntervalsMutatedExtend = notesIntervalsMutated.map(interval => interval < 0 ? interval + 12 : interval)

  const degrees = notesIntervalsMutatedExtend.map(interval => CHORDS_INTERVALS[interval])
  degrees[0] = 'R'

  const shapes = notesIntervalsMutated.map((interval, index) => CHORDS_INTERVALS_SHAPES[- (notesIntervalsMutated[index -1] - interval)] )
  shapes[0] = null

  const rows = []
  notes.forEach((note, index) => {
    rows.push(MakeChordDetailsRow({index: index, note: note, degree: degrees[index], shape: shapes[index]}))
  });
  return rows
}

function SpecialChord (chordShape) {
  if (chordShape.includes('sus2')) {
    return 'sus2 suspended chord: chord has no third (no m3 or 3)'
  }
  if (chordShape.includes('7sus4')) {
    return '7sus4 suspended chord: chord has no third (no m3 or 3)'
  }
  if (chordShape.includes('9sus4')) {
    return '9sus4 suspended chord: chord has no third (no m3 or 3)'
  }
  if (chordShape.includes('sus4')) {
    return 'sus4 suspended chord: chord has no third (no m3 or 3)'
  }
  if (chordShape.includes('Major11')) {
    return 'Major11 major chord: chord has major third (R + 3) chord is 11: chord 7 with added 4th (11th)'
  }
  if (chordShape.includes('Major9')) {
    return 'Major9 major chord: chord has major third (R + 3)'
  }
  if (chordShape.includes('Major6')) {
    return 'Major6 major chord: chord has major third (R + 3)'
  }
  if (chordShape.includes('Major7')) {
    return 'Major7 major chord: chord has major third (R + 3)'
  }
  if (chordShape.includes('Major')) {
    return 'Major major chord: chord has major third (R + 3)'
  }
  if (chordShape.includes('minor6')) {
    return 'minor6 minor chord: chord has minor third (R + m3)'
  }
  if (chordShape.includes('minor9')) {
    return 'minor9 minor chord: chord has minor third (R + m3)'
  }
  if (chordShape.includes('minor7')) {
    return 'minor7 minor chord: chord has minor third (R + m3)'
  }
  if (chordShape.includes('minor')) {
    return 'minor minor chord: chord has minor third (R + m3)'
  }
  if (chordShape.includes('madd9')) {
    return 'madd9 minor chord: chord has minor third (R + m3)'
  }
  if (chordShape.includes('add9')) {
    return 'add9'
  }
  if (chordShape.includes('augmented7')) {
    return 'augmented7'
  }
  if (chordShape.includes('augmented')) {
    return 'augmented'
  }
  if (chordShape.includes('diminished7')) {
    return 'diminished7'
  }
  if (chordShape.includes('diminished')) {
    return 'diminished'
  }
  if (chordShape.includes('dominant7th')) {
    return 'dominant7th chord is 7 (dominant 7): major chord (R,3,5) + m7'
  }
  if (chordShape.includes('dominant9th')) {
    return 'dominant9th'
  }
  if (chordShape.includes('m7b5')) {
    return 'm7b5'
  }
  if (chordShape.includes('JimiHendrix')) {
    return 'JimiHendrix'
  }
}

class ChordDetails extends React.Component {
  render () {
    const rows = MakeChordDetails (this.props.chord)
    const special = SpecialChord(this.props.chord.split(' ')[1])
    return  <React.Fragment>
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
            </React.Fragment>
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
