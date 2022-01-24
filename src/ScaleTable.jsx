import React, {Component} from 'react'
import { INTERVALS } from './data'
import './stylesheets/scale_table.css'

function IntervalRow ({interval}) {
  return <th>{interval}</th>
}

class NotesRow extends React.Component {
  render () {
    if (this.props.inScale) {
      return <th className='in-scale'>{this.props.interval}</th>
    } else {
      return <th className='not-in-scale'>{this.props.interval}</th>
    }
  }
}

function IntervalNameRows ({intervals}) {
  const rows = []
  intervals.forEach(interval => {
    rows.push(<IntervalRow key={interval} interval={interval}/>)
  })
  return <thead>
          <tr>
            {rows}
          </tr>
         </thead>
}

function IntervalNotesRows ({selected_note_index, selected_scale_notes, notes}) {
  const ordered_notes = [...notes.slice(selected_note_index), ...notes.slice(0, selected_note_index)]
  const rows = []
  console.log(selected_scale_notes);
  ordered_notes.forEach(note => {
    if (selected_scale_notes.includes(note)) {
      rows.push(<NotesRow inScale={true} key={note} interval={note}/>)
    } else {
      rows.push(<NotesRow inScale={false} key={note} interval={note}/>)
    }
  })
  return <tbody>
          <tr>
            {rows}
          </tr>
        </tbody>
}

export class Table extends React.Component {
  render () {
  const intervals_name = Object.values(INTERVALS)
  return <table className='table'>
    <IntervalNameRows intervals={intervals_name}/>
    <IntervalNotesRows selected_note_index={this.props.selected_note_index} selected_scale_notes={this.props.selected_scale_notes} notes={this.props.notes}/>
  </table>
}
}

export class ScaleTable extends React.Component {
  render () {
    return <div>
      <Table selected_note_index={this.props.selected_note_index} selected_scale_notes={this.props.selected_scale_notes} selected_note={this.props.selected_note} intervals={INTERVALS} notes={this.props.notes}/>
    </div>
  }
}
