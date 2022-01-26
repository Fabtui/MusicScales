export const INTERVALS = {
  0: "T",
  1: "2m",
  2: "2M",
  3: "3m",
  4: "3M",
  5: "4",
  6: "5-",
  7: "5",
  8: "6m",
  9: "6M",
  10: "7m",
  11: "7M"
}

export const NOTES = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]

export const NAMES = ["T", "2m", "2", "3m", "3", "4", "5-", "5", "6m", "6", "7m", "7"]

export const GUITAR_TUNING = {
  "E": [7, 2, 10, 5, 0, 7],
  "Eb": [6, 1, 9, 4, 11, 6],
  "D": [5, 0, 8, 3, 10, 5],
  "DropD": [7, 2, 10, 5, 0, 5]
}

export const SCALES_LIST = {
  "Major": [0, 2, 4, 5, 7, 9, 11],
  "Minor": [0, 2, 3, 5, 7, 8, 10],
  "Minor Harmonic": [0, 2, 3, 5, 7, 8, 11],
  "Minor Melodic": [0, 2, 3, 5, 7, 9, 11],
}

export const SCALES = Object.keys(SCALES_LIST)
