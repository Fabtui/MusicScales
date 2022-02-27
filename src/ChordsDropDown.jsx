import React, {Component} from 'react'
import { NoteDropDown } from './NoteDropdown'
import { CHORD_SHAPE_INTERVALS, CHORD_SHAPE, NOTES } from './data'


export class ChordsDropDown extends React.PureComponent {
  constructor (props) {
    super (props)
    this.state = ({
      selected_note_1: ' ',
      selected_shape_1: ' ',
      selected_note_2: ' ',
      selected_shape_2: ' ',
      selected_note_3: ' ',
      selected_shape_3: ' ',
      selected_note_4: ' ',
      selected_shape_4: ' ',
      selected_note_5: ' ',
      selected_shape_5: ' ',
      selected_note_6: ' ',
      selected_shape_6: ' ',
      selected_note_7: ' ',
      selected_shape_7: ' ',
      selected_chords: []
    })
    this.handleNoteChange1 = this.handleNoteChange1.bind(this)
    this.handleNoteChange2 = this.handleNoteChange2.bind(this)
    this.handleNoteChange3 = this.handleNoteChange3.bind(this)
    this.handleNoteChange4 = this.handleNoteChange4.bind(this)
    this.handleNoteChange5 = this.handleNoteChange5.bind(this)
    this.handleNoteChange6 = this.handleNoteChange6.bind(this)
    this.handleNoteChange7 = this.handleNoteChange7.bind(this)
    this.handleShapeChange1 = this.handleShapeChange1.bind(this)
    this.handleShapeChange2 = this.handleShapeChange2.bind(this)
    this.handleShapeChange3 = this.handleShapeChange3.bind(this)
    this.handleShapeChange4 = this.handleShapeChange4.bind(this)
    this.handleShapeChange5 = this.handleShapeChange5.bind(this)
    this.handleShapeChange6 = this.handleShapeChange6.bind(this)
    this.handleShapeChange7 = this.handleShapeChange7.bind(this)
  }

  createChordArray(note, shape) {
    if (note === ' ' || shape === ' ') {
      return null
    }
    return [note, shape]
  }

  componentDidUpdate() {
    const selected_chords = [this.createChordArray(this.state.selected_note_1, this.state.selected_shape_1), this.createChordArray(this.state.selected_note_2, this.state.selected_shape_2), this.createChordArray(this.state.selected_note_3, this.state.selected_shape_3), this.createChordArray(this.state.selected_note_4, this.state.selected_shape_4), this.createChordArray(this.state.selected_note_5, this.state.selected_shape_5), this.createChordArray(this.state.selected_note_6, this.state.selected_shape_6), this.createChordArray(this.state.selected_note_7, this.state.selected_shape_7)]
    const filtered_selected_chords = selected_chords.filter((a) => a);
    const mutated_chords_object = this.mutateSelectedChords(filtered_selected_chords)
    this.props.onChange(mutated_chords_object)
    console.log('changes');
  }

  mutateSelectedChords(selectedChords_array) {
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

  handleNoteChange1(note_index) {
    const note = NOTES[note_index]
    this.setState ({
      selected_note_1: note
    })
  }

  handleNoteChange2(note_index) {
    const note = NOTES[note_index]
    this.setState ({
      selected_note_2: note
    })
  }

  handleNoteChange3(note_index) {
    const note = NOTES[note_index]
    this.setState ({
      selected_note_3: note
    })
  }

  handleNoteChange4(note_index) {
    const note = NOTES[note_index]
    this.setState ({
      selected_note_4: note
    })
  }

  handleNoteChange5(note_index) {
    const note = NOTES[note_index]
    this.setState ({
      selected_note_5: note
    })
  }

  handleNoteChange6(note_index) {
    const note = NOTES[note_index]
    this.setState ({
      selected_note_6: note
    })
  }

  handleNoteChange7(note_index) {
    const note = NOTES[note_index]
    this.setState ({
      selected_note_7: note
    })
  }

  handleShapeChange1(shape_index) {
    const selected_shape = CHORD_SHAPE[shape_index]
    this.setState ({
      selected_shape_1: selected_shape
    })

  }

  handleShapeChange2(shape_index) {
    const selected_shape = CHORD_SHAPE[shape_index]
    this.setState ({
      selected_shape_2: selected_shape
    })

  }

  handleShapeChange3(shape_index) {
    const selected_shape = CHORD_SHAPE[shape_index]
    this.setState ({
      selected_shape_3: selected_shape
    })
  }

  handleShapeChange4(shape_index) {
    const selected_shape = CHORD_SHAPE[shape_index]
    this.setState ({
      selected_shape_4: selected_shape
    })
  }

  handleShapeChange5(shape_index) {
    const selected_shape = CHORD_SHAPE[shape_index]
    this.setState ({
      selected_shape_5: selected_shape
    })
  }

  handleShapeChange6(shape_index) {
    const selected_shape = CHORD_SHAPE[shape_index]
    this.setState ({
      selected_shape_6: selected_shape
    })
  }

  handleShapeChange7(shape_index) {
    const selected_shape = CHORD_SHAPE[shape_index]
    this.setState ({
      selected_shape_7: selected_shape
    })
  }


  render () {
    return <div className='chords-dropdowns'>
    <div className='notes-drop-down'>
      <NoteDropDown className="note-selector" selected_note={this.state.selected_note_1} notes={NOTES} onChange={this.handleNoteChange1}/>
      {this.state.selected_note_1 !== ' ' && <NoteDropDown className="note-selector" selected_note={this.state.selected_note_2} notes={NOTES} onChange={this.handleNoteChange2}/>}
      {this.state.selected_note_2 !== ' ' && <NoteDropDown className="note-selector" selected_note={this.state.selected_note_3} notes={NOTES} onChange={this.handleNoteChange3}/>}
      {this.state.selected_note_3 !== ' ' && <NoteDropDown className="note-selector" selected_note={this.state.selected_note_4} notes={NOTES} onChange={this.handleNoteChange4}/>}
      {this.state.selected_note_4 !== ' ' && <NoteDropDown className="note-selector" selected_note={this.state.selected_note_5} notes={NOTES} onChange={this.handleNoteChange5}/>}
      {this.state.selected_note_5 !== ' ' && <NoteDropDown className="note-selector" selected_note={this.state.selected_note_6} notes={NOTES} onChange={this.handleNoteChange6}/>}
      {this.state.selected_note_6 !== ' ' && <NoteDropDown className="note-selector" selected_note={this.state.selected_note_7} notes={NOTES} onChange={this.handleNoteChange7}/>}
    </div>
    <div className='shapes-drop-down'>
      {this.state.selected_note_1 !== ' ' && <NoteDropDown className="note-selector" selected_note={this.state.selected_shape_1} notes={CHORD_SHAPE} onChange={this.handleShapeChange1}/>}
      {this.state.selected_note_2 !== ' ' && <NoteDropDown className="note-selector" selected_note={this.state.selected_shape_2} notes={CHORD_SHAPE} onChange={this.handleShapeChange2}/>}
      {this.state.selected_note_3 !== ' ' && <NoteDropDown className="note-selector" selected_note={this.state.selected_shape_3} notes={CHORD_SHAPE} onChange={this.handleShapeChange3}/>}
      {this.state.selected_note_4 !== ' ' && <NoteDropDown className="note-selector" selected_note={this.state.selected_shape_4} notes={CHORD_SHAPE} onChange={this.handleShapeChange4}/>}
      {this.state.selected_note_5 !== ' ' && <NoteDropDown className="note-selector" selected_note={this.state.selected_shape_5} notes={CHORD_SHAPE} onChange={this.handleShapeChange5}/>}
      {this.state.selected_note_6 !== ' ' && <NoteDropDown className="note-selector" selected_note={this.state.selected_shape_6} notes={CHORD_SHAPE} onChange={this.handleShapeChange6}/>}
      {this.state.selected_note_7 !== ' ' && <NoteDropDown className="note-selector" selected_note={this.state.selected_shape_7} notes={CHORD_SHAPE} onChange={this.handleShapeChange7}/>}
    </div>
   </div>
  }
}
