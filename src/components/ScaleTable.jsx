import React from 'react'
import { INTERVALS, INTERVALS_NAMES, NOTES } from '../data/data'
import '../stylesheets/scale_table.css'

class NotesRow extends React.Component {
  render () {
    if (this.props.special) {
      return <th className='in-scale mode-special-note'><p>{this.props.interval}</p></th>
    } else if (this.props.inScale) {
      if (this.props.root) {
        return <th className='in-scale root-note'><p>{this.props.interval}</p></th>
      } else {
        return <th className='in-scale'><p>{this.props.interval}</p></th>
      }
    } else {
      return <th className='not-in-scale'><p>{this.props.interval}</p></th>
    }
  }
}

export function IntervalNotesRows ({special_notes, selected_note_index, selected_scale_notes, notes}) {
  const ordered_notes = [...notes.slice(selected_note_index), ...notes.slice(0, selected_note_index)]
  const rows = []
  ordered_notes.push(ordered_notes[0])
  ordered_notes.forEach((note, index) => {
    const key = `${note}-${index}`
    if (selected_scale_notes.includes(note)) {
      if (
        special_notes &&
        special_notes.map((note_index) => NOTES[note_index]).includes(note)
      ) {
        rows.push(<NotesRow root={true} inScale={true} special={true} key={key} interval={note}/>);
      } else if (note === selected_scale_notes[0]) {
        rows.push(<NotesRow root={true} inScale={true} key={key} interval={note}/>)
      } else {
        rows.push(<NotesRow root={false} inScale={true} key={key} interval={note}/>)
      }
    } else {
      rows.push(<NotesRow root={false} inScale={false} key={key} interval={note}/>)
    }
  })
  return <tbody>
          <tr>
            {rows}
          </tr>
        </tbody>
}

export function IntervalNamesRows ({selected_note_index, guitarString, selected_scale, selected_scale_notes, notes}) {
  const ordered_notes = [...notes.slice(guitarString), ...notes.slice(0, guitarString)]
  const rows = []
  const tonic = NOTES[selected_note_index]
  const indexofT = (ordered_notes.indexOf(tonic));
  const ordered_names = [...INTERVALS_NAMES.slice((12 - indexofT)), ...INTERVALS_NAMES.slice(0, (12 - indexofT))]
  ordered_names.push(ordered_names[0])
  const scale_names = []
  selected_scale.forEach(scale => {scale_names.push(INTERVALS_NAMES[scale])})
  ordered_names.forEach((note, index) => {
    const key = `${note}-${index}`
    if (scale_names.includes(note)) {
      if (note === scale_names[0]) {
        rows.push(<NotesRow root={true} inScale={true} key={key} interval={note}/>)
      } else {
        rows.push(<NotesRow root={false} inScale={true} key={key} interval={note}/>)
      }
    } else {
      rows.push(<NotesRow root={false} inScale={false} key={key} interval={note}/>)
    }
  })
  return <tbody>
          <tr>
            {rows}
          </tr>
        </tbody>
}

export class ScaleTable extends React.PureComponent {
  render() {
    const intervals_name = Object.values(INTERVALS);
    return (
      <table className="table">
        <thead>
          <tr>
            {intervals_name.map((interval) =>
              ( <th className={this.props.selected_scale.includes(intervals_name.indexOf(interval)) ? "" : "not-in-scale"} key={interval}>
                {interval}
                </th>
              )
            )}
          </tr>
        </thead>
        <IntervalNotesRows
          selected_note_index={this.props.selected_note_index}
          selected_scale_notes={this.props.selected_scale_notes}
          notes={NOTES}
          special_notes={this.props.special_notes}
        />
      </table>
    );
  }
}
