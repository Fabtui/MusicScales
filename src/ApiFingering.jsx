import { NOTES } from "./data"

function mutatedChord (key, shape) {
  if (key === 'G#') {
    key = 'Ab'
  } else if (key.includes('#')) {
    key = `${NOTES[(NOTES.indexOf(key) + 1)]}b`
  }
  if (shape === 'Major') {
    return `${key}`
  } else if (shape === 'Major7') {
    return `${key}_maj7`
  } else if (shape === 'Major6') {
    return `${key}_6`
  } else if (shape === 'add9') {
    return `${key}_add9`
  } else if (shape === 'madd9') {
    return `${key}_madd9`
  } else if (shape === 'sus2') {
    return `${key}_sus2`
  } else if (shape === 'sus4') {
    return `${key}_sus4`
  } else if (shape === 'augmented') {
    return `${key}_aug`
  } else if (shape === 'diminished') {
    return `${key}_dim`
  } else if (shape === 'minor') {
    return `${key}_m`
  } else if (shape === 'minor6') {
    return `${key}_m6`
  } else if (shape === 'minor7') {
    return `${key}_m7`
  } else if (shape === 'Major9') {
    return `${key}_maj79`
  } else if (shape === 'minor9') {
    return `${key}_m79`
  } else if (shape === 'm7b5') {
    return `${key}_m7b5`
  } else if (shape === 'dominant7th') {
    return `${key}_7`
  } else {
    return null
  }
  // PowerChord": "G D",
  //   "Major11": "G B C D F# A",
  //   "minor9": "G A# D F A",
  //   "7sus4": "G C D F",
  //   "9sus4": "G C D F A",
  //   "augmented7": "G B D# F",
  //   "diminished7": "G A# C# E",
  //   "dominant9th": "G B D F A",
  //   "JimiHendrix": "G A# B D F"
}

function fetchApi (chord) {
  // let that = this
  let fingering = {}
  // const mutatedNotes = encodeURIComponent(selectedNotes.map(note => NOTES[note]))
  const url = `https://api.uberchord.com/v1/chords/${chord}`
  fetch(url,
      {
          method: "GET",
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
          }
      })
    .then(response => response.json())
    .then(function(response) {
      fingering['strings'] = response[0].strings
      fingering['fingering'] = response[0].fingering
    })

    return fingering
}

export function ApiFingering (chord) {
  const mutateChord = mutatedChord (chord.split(' ')[0], chord.split(' ')[1])
  if (mutateChord != null) {
    const apiResponse = fetchApi(mutateChord)
    console.log(apiResponse);
  }
}
