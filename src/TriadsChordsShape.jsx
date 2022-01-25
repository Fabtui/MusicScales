function MakeTriads(selected_scale) {
  let triads = []
  const selected_scale2 = selected_scale.map(interval => {
    return interval + 12
  })
  const extended_scale = selected_scale.concat(selected_scale2);
  for (let i = 0; i < selected_scale.length; i++) {
        triads.push([extended_scale[i], extended_scale[i + 2], extended_scale[i + 4]])
    }
  return triads
}

function MakeChordsShape(triads_scale) {
  let triadsChordsShape = []
  triads_scale.forEach(triad => {
    if ((triad[1] - triad[0]) === 4 && (triad[2] - triad[1]) === 3) {
      triadsChordsShape.push("Maj")
    } else if ((triad[1] - triad[0]) === 3 && (triad[2] - triad[1]) === 4) {
      triadsChordsShape.push("Min")
    } else if ((triad[1] - triad[0]) === 3 && (triad[2] - triad[1]) === 3) {
      triadsChordsShape.push("Dim")
    } else if ((triad[1] - triad[0]) === 4 && (triad[2] - triad[1]) === 4) {
      triadsChordsShape.push("Aug")
    } else {
      return
    }
  });
  return triadsChordsShape
}

export function TriadsChordsShape ({selected_scale}) {
  const triads = MakeTriads(selected_scale)
  return MakeChordsShape(triads)
}
