import React, {Component} from 'react'
import {Scale} from './Scale'
import './stylesheets/scale_table.css'

const INTERVALS = {
  0: "T",
  1: "2m",
  2: "2M",
  3: "3m",
  4: "3M",
  5: "4",
  6: "5-",
  7: "5",
  8: "6m",
  9: "6M",
  10: "7m",
  11: "7M"
}

function IntervalRow ({interval}) {
  return <th>{interval}</th>
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

function IntervalNotesRows ({notes}) {
  const rows = []
  notes.forEach(note => {
    rows.push(<IntervalRow key={note} interval={note}/>)
  })
  return <tbody>
          <tr>
        {rows}
      </tr>
    </tbody>
}

export class Table extends React.Component {
  constructor (props) {
    super (props)
    // const SCALE_NOTES = Scale({notes, selected_note_index, scale_intervals})
  }
  render () {
  const intervals_name = Object.values(INTERVALS)
  return <table className='table'>
    <IntervalNameRows intervals={intervals_name}/>
    <IntervalNotesRows notes={this.props.notes}/>
  </table>
}
}

export class ScaleTable extends React.Component {
  constructor (props) {
    super (props)
    // const notes = this.props.notes
    // const selected_note_index = this.props.selected_note_index
    // const scale_intervals = this.props.scale_intervals
    // const scale_notes = Scale({notes, selected_note_index, scale_intervals})
    // console.log(scale_notes);
  }
  render () {
    return <div>
      <Table selected_note={this.props.selected_note} intervals={INTERVALS} notes={this.props.notes}/>
    </div>
  }
}
