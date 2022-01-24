function createHalf (number) {
  if (number === 0.5) {
    return "1/2"
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
  return <h1 className='mt-4'>{intervals.join(' - ')}</h1>
}
