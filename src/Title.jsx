import './stylesheets/title.css'

export function Title ({selected_note, selected_scale_name}) {
  return <h1 className='mt-4'>{selected_note} {selected_scale_name}</h1>
}
