export const INTERVALS = {
  0: "T",
  1: "2m",
  2: "2",
  3: "3m",
  4: "3",
  5: "4",
  6: "5-",
  7: "5",
  8: "6m",
  9: "6",
  10: "7m",
  11: "7"
}

export const CHORDS_INTERVALS = {
  0: "R",
  1: "m2",
  2: "2",
  3: "m3",
  4: "3",
  5: "4",
  6: "5-",
  7: "5",
  8: "m6",
  9: "6",
  10: "m7",
  11: "7",
  14: '9',

}

export const CHORDS_INTERVALS_SHAPES = {
  0: "R",
  3: "minor",
  4: "major",
}


export const NOTES = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]

export const GUITAR_TUNING = {
  "E": [7, 2, 10, 5, 0, 7],
  "Drop D": [7, 2, 10, 5, 0, 5],
  "Eb": [6, 1, 9, 4, 11, 6],
  "Drop Db": [6, 1, 9, 4, 11, 4],
  "D": [5, 0, 8, 3, 10, 5],
  "Drop C": [5, 0, 8, 3, 10, 3],
  "Db": [4, 11, 7, 2, 9, 4],
  "Drop B": [4, 11, 7, 2, 9, 2],
  "Open B": [7, 2, 10, 2, 9, 2],
}

export const SCALES_LIST = {
  "Major": [0, 2, 4, 5, 7, 9, 11],
  "Major pentatonic": [0, 2, 4, 7, 9],
  "Major Blues": [0, 2, 3, 4, 7, 9],
  "Minor": [0, 2, 3, 5, 7, 8, 10],
  "Minor pentatonic": [0, 3, 5, 7, 10],
  "Harmonic minor": [0, 2, 3, 5, 7, 8, 11],
  "Melodic minor": [0, 2, 3, 5, 7, 9, 11],
  "Blues": [0, 3, 5, 6, 7, 10],
  "Diminished": [0, 2, 3, 5, 6, 8, 9, 11]
}

export const SCALES_LIST_ARRAY = [
  [0, 2, 4, 5, 7, 9, 11],
  [0, 2, 4, 7, 9],
  [0, 2, 3, 4, 7, 9],
  [0, 2, 3, 5, 7, 8, 10],
  [0, 3, 5, 7, 10],
  [0, 2, 3, 5, 7, 8, 11],
  [0, 2, 3, 5, 7, 9, 11],
  [0, 3, 5, 6, 7, 10]
]

export const CHORD_SHAPE = ['Maj', 'Min', 'Dim', 'Aug', 'Sus4', 'Sus2']

export const CHORD_SHAPE_INTERVALS = {
  'Maj': [0, 4, 7],
  'Min': [0, 3, 7],
  'Dim': [0, 3, 6],
  'Aug': [0, 5, 7],
  'Sus4': [0, 5, 7],
  'Sus2': [0, 2, 7],
  'Lyd': [0, 6, 7],
  'Phry': [0, 1, 7]
}

export const SCALES = Object.keys(SCALES_LIST)
export const INTERVALS_NAMES = Object.values(INTERVALS)
