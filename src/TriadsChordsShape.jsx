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

function FindTriadsName(root, third, fifth) {
  if ((third - root) === 4 && (fifth - third) === 3) {
      root >= 12 ? root = (root - 12) : root = root
      return `${root}-Maj`
    } else if ((third - root) === 3 && (fifth - third) === 4) {
      root >= 12 ? root = (root - 12) : root = root
      return `${root}-Min`
    } else if ((third - root) === 3 && (fifth - third) === 3) {
      root >= 12 ? root = (root - 12) : root = root
      return `${root}-Dim`
    } else if ((third - root) === 4 && (fifth - third) === 4) {
      root >= 12 ? root = (root - 12) : root = root
      return `${root}-Aug`
    } else if ((third - root) === 5 && (fifth - third) === 2) {
      root >= 12 ? root = (root - 12) : root = root
      return `${root}-Sus4`
    } else if ((third - root) === 2 && (fifth - third) === 5) {
      root >= 12 ? root = (root - 12) : root = root
      return `${root}-Sus2`
    } else {
      return "-"
    }
}

function MakeChordsShape(triads_scale) {
  let triadsChordsShape = []
  triads_scale.forEach(triad => {
    const name = FindTriadsName(triad[0], triad[1], triad[2])
    if (name !== "-") {
      triadsChordsShape.push(FindTriadsName(triad[0], triad[1], triad[2]))
    } else {
      const name = FindTriadsName(triad[1], triad[2], (triad[0] + 12))
      if (name !== "-") {
        triadsChordsShape.push(FindTriadsName(triad[1], triad[2], (triad[0] + 12)))
      } else {
        const name = FindTriadsName(triad[2], (triad[0] + 12), (triad[1] + 12))
          if (name !== "-") {
          triadsChordsShape.push(FindTriadsName(triad[2], (triad[0] + 12), (triad[1] + 12)))
        } else {
          return
        }
      }
    }
  });
  console.log(triadsChordsShape);
  return triadsChordsShape
}

export function TriadsChordsShape ({selected_scale}) {
  const triads = MakeTriads(selected_scale)
  return MakeChordsShape(triads)
}
