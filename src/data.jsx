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

export const NOTES = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]

export const GUITAR_TUNING = {
  "E": [7, 2, 10, 5, 0, 7],
  "Drop D": [7, 2, 10, 5, 0, 5],
  "Eb": [6, 1, 9, 4, 11, 6],
  "Drop Db": [6, 1, 9, 4, 11, 4],
  "D": [5, 0, 8, 3, 10, 5],
  "Drop C": [5, 0, 8, 3, 10, 3],
  "Db": [4, 11, 7, 2, 9, 4],
  "Drop Cb": [4, 11, 7, 2, 9, 2]
}

export const SCALES_LIST = {
  "Major": [0, 2, 4, 5, 7, 9, 11],
  "Major Penta": [0, 2, 4, 7, 9],
  "Minor": [0, 2, 3, 5, 7, 8, 10],
  "Minor Penta": [0, 3, 5, 7, 10],
  "Minor Harmonic": [0, 2, 3, 5, 7, 8, 11],
  "Minor Melodic": [0, 2, 3, 5, 7, 9, 11],
}

export const SCALES = Object.keys(SCALES_LIST)
export const INTERVALS_NAMES = Object.values(INTERVALS)
