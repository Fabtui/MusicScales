import './stylesheets/intervals.css'

function createHalf (number) {
  if (number === 0.5) {
    return "½"
  } else if (number === 1.5) {
    return "1½"
  } else {
    return "1"
  }
}

export function Intervals ({selected_scale}) {
  let intervals = []
  let interval = null
  for (let i = 0; i < selected_scale.length; i++) {
    if (i === selected_scale.length - 1) {
      intervals.push(createHalf((12 - selected_scale[i])/2))
    } else {
      intervals.push(createHalf((selected_scale[i + 1] - selected_scale[i])/2))
    }
  }
  return <div className='intervals'>
        <h2>{intervals.join(' - ')}</h2>
      </div>
}
