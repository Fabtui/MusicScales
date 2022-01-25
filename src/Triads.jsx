import './stylesheets/triads.css'

function MakeTriads(selected_scale_notes) {
  let triads = []
  const extend = selected_scale_notes.concat(selected_scale_notes);
  for (let i = 0; i < selected_scale_notes.length; i++) {
        triads.push([extend[i], extend[i + 2], extend[i + 4]])
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

export function Triads ({selected_scale_notes}) {
  const triads = MakeTriads(selected_scale_notes)
  return <table className="table triads-table">
  <thead>
    <tr>
      <th scope="col">Triads</th>
      <th scope="col">Root</th>
      <th scope="col">Third</th>
      <th scope="col">Fifth</th>
    </tr>
  </thead>
  <tbody>
    <TriadsColumn triads_array={triads}/>
  </tbody>
</table>
}
