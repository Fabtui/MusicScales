export function Triads ({selected_scale_notes}) {
  let triads = []
  const extend = selected_scale_notes.concat(selected_scale_notes);
  for (let i = 0; i < selected_scale_notes.length; i++) {
        triads.push([extend[i], extend[i + 2], extend[i + 4]])
    }
  let rows = []
  triads.forEach(triad => {
      rows.push(<div className="triads-grid-element">{triad}</div>)
  })
  return <div className="triads-displayer">
    {rows}
  </div>
}
