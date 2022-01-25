import { NOTES } from './data'
import './stylesheets/guitar_neck.css'
import { IntervalNotesRows } from './ScaleTable'

function GuitarNeckRows (guitarStrings, selected_scale_notes, notes) {
  let rows = []
  guitarStrings.forEach((guitarString, index) => {
    const key = `${guitarString}-${index}`
    rows.push(<IntervalNotesRows key={key} selected_note_index={guitarString} selected_scale_notes={selected_scale_notes} notes={ notes}/>)
  });
  return rows
}

export function GuitarNeck ({tuning, selected_scale_notes}) {
  const rows = GuitarNeckRows(tuning, selected_scale_notes, NOTES)
  return <table className="table guitar-neck-table">
            {rows}
          </table>
}
