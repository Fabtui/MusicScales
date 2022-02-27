import './stylesheets/triads.css'
import { TriadsChordsShape } from './TriadsChordsShape'

export function MakeTriads(selected_scale_notes, selected_scale) {
  const chordsShapes = TriadsChordsShape({selected_scale})
  let chordsShapesArray = []
  chordsShapes.forEach(chord => {
    const splitedChord = chord.split('-');
    splitedChord[0] >= 12 ? splitedChord[0] = splitedChord[0] - 12 : splitedChord[0] = splitedChord[0]
    selected_scale.forEach((scale, index) => {
      if (scale === parseInt(splitedChord[0])) {
        splitedChord[0] = selected_scale_notes[index]
      }
    })
  chordsShapesArray.push(splitedChord)
  })
  let triads = []
  const extend = selected_scale_notes.concat(selected_scale_notes);
  for (let i = 0; i < selected_scale_notes.length; i++) {
    triads.push([extend[i], extend[i + 2], extend[i + 4], `${chordsShapesArray[i][0]} ${chordsShapesArray[i][1]}`])
  }
  return triads
}

function TriadsRow(triad_array) {
  let triad_rows = []
  Object.values(triad_array)[0].forEach((triad, index) => {
    const key = `${triad} - ${index}`
    triad_rows.push(<td key={key}>{triad}</td>)
  })
  return triad_rows
}

function TriadsColumn(triads_array) {
  const new_triads_array = Object.values(triads_array)[0];
  let triad_column = []
  new_triads_array.forEach((triads, index) => {
    const key = `${triads}`
    triad_column.push(
      <tr key={key}>
      <th scope="row">{index + 1}</th>
      <TriadsRow triad_array={triads}/>
    </tr>
    )
  })
  return triad_column
}

export function Triads ({selected_scale_notes, selected_scale}) {
  const triads = MakeTriads(selected_scale_notes, selected_scale)
  return <table className="table triads-table">
  <thead>
    <tr>
      <th scope="col">Triads</th>
      <th scope="col">Root</th>
      <th scope="col">Third</th>
      <th scope="col">Fifth</th>
      <th scope="col">Chord Shape</th>
    </tr>
  </thead>
  <tbody>
    <TriadsColumn triads_array={triads}/>
  </tbody>
</table>
}
