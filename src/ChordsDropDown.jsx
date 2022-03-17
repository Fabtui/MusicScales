import React, {Component} from 'react'
import { NoteDropDown } from './NoteDropdown'
import { CHORD_SHAPE_INTERVALS, CHORD_SHAPE, NOTES } from './data'
import { EVERY_SCALES } from './data/scales'

function romanize(num) {
  const romanNumber = {1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII'}
  return romanNumber[num];
}

class ChordDegree extends React.PureComponent {
  render () {
    if (this.props.selected_note_index != null) {
      const scaleNotes = (EVERY_SCALES[NOTES[this.props.selected_note_index]][this.props.selected_scale_name]).split(' ')
      const degree = romanize(scaleNotes.indexOf(this.props.selected_note) + 1)
        return <div className='shapes-drop-down shapes-drop-down-degrees'><h4>{degree}</h4></div>
    } else {
      return <></>
    }
  }
}

function mutateSelectedChords(selectedChords_array) {
  const mutatedChords = []
  const selectedNotes = []
  selectedChords_array.forEach(chord => {
    const index = NOTES.indexOf(chord[0]);
    const intervals = CHORD_SHAPE_INTERVALS[chord[1]];
    const mutatedIntervals = intervals.map(interval => (interval + index) >= NOTES.length ? (interval + index) - NOTES.length : (interval + index))
    const mutatedNotes = mutatedIntervals.map(interval => NOTES[interval])
    mutatedChords.push(mutatedNotes)
    mutatedNotes.map(note => selectedNotes.push(note))
  });
  const filteredMutatedNotes = selectedNotes.filter((e, i) => selectedNotes.indexOf(e) === i);
  return {mutatedChords: mutatedChords, filteredMutatedNotes: filteredMutatedNotes}
}


class ChordsDropDownItem extends React.Component {
   constructor (props) {
    super (props)
    this.state = ({
      selected_note: this.props.selected_note || null,
      selected_shape: this.props.selected_shape || null,
      selected_note_index: null
    })
    this.handleNoteChange = this.handleNoteChange.bind(this)
    this.handleShapeChange = this.handleShapeChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.selected_note !== prevProps.selected_note) {
      this.setState ({
        selected_note: this.props.selected_note,
        selected_shape: this.props.selected_shape
      })
    }
  }

  handleNoteChange(note_index) {
    const note = NOTES[note_index]
    this.setState ({
      selected_note: note,
      selected_note_index: note_index,
      reset: false
    })
  }

  handleShapeChange(shape_index) {
    const selected_shape = CHORD_SHAPE[shape_index]
    this.setState ({
      selected_shape: selected_shape
    })
    this.props.onChange(this.state.selected_note, selected_shape, this.props.index)
  }

  render () {
    return <div className='chords-dropdowns-items'>
            <NoteDropDown className="note-selector" selected_note={this.state.selected_note} notes={NOTES} onChange={this.handleNoteChange}/>
            {this.state.selected_note !== null && <NoteDropDown className="note-selector" selected_note={this.state.selected_shape} notes={CHORD_SHAPE} onChange={this.handleShapeChange}/>}
            {this.state.selected_shape !== null && <ChordNotesDisplay selected_note={this.state.selected_note} selected_shape={this.state.selected_shape}/>}
            {this.state.selected_shape !== null && <ChordDegree selected_note_index={this.props.clicked_note_index} selected_scale_name={this.props.clicked_scale_name} selected_note={this.state.selected_note}/>}
          </div>
  }
}

class ChordNotesDisplay extends React.Component {
  render () {
    const mut = mutateSelectedChords([[this.props.selected_note, this.props.selected_shape]])
    const notes = mut['mutatedChords'][0].join(' - ');
    return <div className='seach_by_chords_notes_container'>
      <h3 id='seach_by_chords_notes'>{notes}</h3>
    </div>
  }
}


export class ChordsDropDown extends React.PureComponent {
  constructor (props) {
    super (props)
    this.state = ({
      selected_chords: [],
      number_of_items: 0
    })
    this.resetAll = this.resetAll.bind(this)
    this.handleNoteChange = this.handleNoteChange.bind(this)
  }

  createChordArray(note, shape) {
    if (note === null || shape === null) {
      return null
    }
    return [note, shape]
  }

  handleNoteChange(note, shape, index) {
    const chordArray = this.createChordArray(note, shape)
    const selected_chords = this.state.selected_chords
    const number_of_items = selected_chords.length + 1
    selected_chords[index] = chordArray
    this.setState ({
      selected_chords: selected_chords,
      number_of_items: number_of_items
    })
    const filtered_selected_chords = selected_chords.filter((a) => a);
    const mutated_chords_object = mutateSelectedChords(filtered_selected_chords)
    this.props.onChange(mutated_chords_object)
  }

  resetAll() {
    this.setState ({
      selected_chords: [],
      number_of_items: 0
    })
  }

  render () {
    const number_of_items = this.state.number_of_items
    const rows = []
    for (let i = 0; i <= number_of_items; i++) {
      const selected_note = this.state.number_of_items > i ? this.state.selected_chords[i][0] : null
      const selected_shape = this.state.number_of_items > i ? this.state.selected_chords[i][1] : null
      rows.push(<ChordsDropDownItem key={i} selected_note={selected_note} selected_shape={selected_shape} index={i} clicked_scale_name={this.props.selected_scale_name} clicked_note_index={this.props.selected_note_index}  onChange={this.handleNoteChange}/>)
    }
    return <div className='chords-dropdowns mb-4'>
    <div className='chords-dropdowns-items'>
      <div className='notes-drop-down'>
        {rows}
      </div>
    </div>
    <div className='reset-all-dropdown'>
      {this.state.number_of_items !== 0 && <div onClick={this.resetAll} className='close-button-shape-drop-down'>RESET ALL</div>}
    </div>
   </div>
  }
}
