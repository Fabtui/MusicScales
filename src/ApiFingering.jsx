import { NOTES } from "./data"
import axios from 'axios';
import { ChordBox } from 'vexchords';

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

function makeGetRequest(path) {
  return new Promise(function (resolve, reject) {
    axios.get(path).then(
      (response) => {
        var result = response.data;
        resolve(result);
      },
        (error) => {
        reject(error);
      }
    );
  });
}

async function main(url) {
    var result = await makeGetRequest(url);
    const fingering = result[0].strings;
    return fingering
}


async function fetchApi (chord) {
  const url = `https://api.uberchord.com/v1/chords/${chord}`
  const fingering = await main(url);
  // console.log(fingering);
  return fingering
  // fetch(url,
  //     {
  //         method: "GET",
  //         mode: 'cors',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         }
  //     })
  //   .then(response => response.json())
  //   .then(function(response) {
  //     fingering.push(response[0].strings)
  //   })
  //   console.log(fingering);
}

export async function ApiFingering(chord) {
  const mutateChord = mutatedChord (chord.split(' ')[0], chord.split(' ')[1])
  const sideWindow = document.getElementById('chord-chart')
  let apiResponse = null
  if (mutateChord != null) {
    sideWindow.innerHTML = ``
    apiResponse = (await fetchApi(mutateChord)).split(' ')
    const chords = []
    apiResponse.reverse().map((e, index) => {
      chords.push([index + 1, e])
    })
    console.log(chords);
    // const rows = []
    // apiResponse.forEach((element, index) => {
    //   console.log(index + 1, element);
    //   for (let i = 0; i < 7; i++) {
    //     if (parseInt(element ) === i) {
    //       rows.push('<td>O</td>')
    //     } else {
    //       rows.push('<td> </td>');
    //     }
    //   }
    // });
    const chord = new ChordBox(sideWindow);
    console.log(chord);
    chord.draw({
      chord: chords,
      // optional: position marker
      position: 0, // start render at fret 5
      // optional: barres for barre chords
      // barres: [
      //   { fromString: 6, toString: 1, fret: 1 },
      //   { fromString: 5, toString: 3, fret: 3 }
      // ],
      // optional: tuning keys
      tuning: ['E', 'A', 'D', 'G', 'B', 'E']
    });
    // sideWindow.innerHTML = `<h2>${apiResponse}</h2>`
  } else {
    sideWindow.innerHTML = `<h2></h2>`
  }
}
