import React, {useState} from 'react';
import { Intervals } from './Intervals'

export function ScaleNotes ({notes, selected_note_index, scale_intervals}) {
  const ordered_notes = [...notes.slice(selected_note_index), ...notes.slice(0, selected_note_index)]
  let scale_notes = []
  scale_intervals.forEach(scale_interval => {
    scale_notes.push(ordered_notes[scale_interval])
  })
  return scale_notes
}

export function Scale ({notes, selected_note_index, scale_intervals}) {
  let scale_notes = []
  scale_intervals.forEach(scale_interval => {
    scale_notes.push(notes[scale_interval])
  })
  return scale_notes
}

function useToggle (init = true) {
  const [value, setValue] = useState(init)

  const toggleCounter = function () {
    setValue(value => !value)
  }

  return [value, toggleCounter]
}

export function ScaleDisplay ({selected_scale, notes, selected_note_index, scale_intervals}) {
  const [scaleVisible, toggleScale] = useToggle(true)

  const ordered_notes = [...notes.slice(selected_note_index), ...notes.slice(0, selected_note_index)]
  let scale_notes = []
  scale_intervals.forEach(scale_interval => {
    scale_notes.push(ordered_notes[scale_interval])
  })
  let rows = []
  scale_notes.forEach((scale_note, index) => {
    rows.push(<div key={scale_note} className="col-items">{scale_note}</div>)
    rows.push(<div key={index} className="col-items">-</div>)
  })
  rows.pop()
  return <div className="notes-displayer">
            <label className="scaleCheckbox">
            <input htmlFor="scaleCheckbox" type="checkbox" onChange={toggleScale} checked={scaleVisible}></input>
            Intervals</label>
          <div className="notes-dispayer-container">
            <div className="wrapper">
              {scaleVisible && rows}
            </div>
            {scaleVisible && <Intervals selected_scale={selected_scale}/>}
          </div>
        </div>
}
