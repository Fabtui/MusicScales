import { NOTES } from './data'
import './stylesheets/guitar_neck.css'
import { IntervalNamesRows, IntervalNotesRows } from './ScaleTable'

function GuitarNeckRows (notes_displayed, selected_scale, selected_note_index, guitarStrings, selected_scale_notes, notes) {
  let rows = []
  guitarStrings.forEach((guitarString, index) => {
    const key = `${guitarString}-${index}`
    if (notes_displayed) {
      rows.push(<IntervalNotesRows key={key} selected_note_index={guitarString} selected_scale_notes={selected_scale_notes} notes={NOTES}/>)
    } else {
      rows.push(<IntervalNamesRows key={key} selected_scale={selected_scale} selected_note_index={selected_note_index} guitarString={guitarString} selected_scale_notes={selected_scale_notes} notes={ notes}/>)
    }
  });
  return rows
}

export function GuitarNeck ({notes_displayed, selected_scale, selected_note_index,tuning, selected_scale_notes}) {
  const rows = GuitarNeckRows(notes_displayed, selected_scale, selected_note_index, tuning, selected_scale_notes, NOTES)
  return <table className="table guitar-neck-table">
            {rows}
          </table>
}
