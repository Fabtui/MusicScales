import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import reportWebVitals from './reportWebVitals';
import {MyScale} from './MyScale'
import { AllScales } from './AllScales'
import { SearchByNotes } from './SearchByNotes'
import { SearchByChords } from './SearchByChords'
import { ChordsSearch } from './ChordsSearch'
import { CircleOfFifth } from './CircleOfFifth';
import Child from './Child'
import Layout from './Layout'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="MyScale" element={<MyScale />} />
          <Route path="AllScales" element={<AllScales />} />
          <Route path="SearchByNotes" element={<SearchByNotes />} />
          <Route path="SearchByChords" element={<SearchByChords />} />
          <Route path="MyScaleResult" element={<Child />} />
          <Route path="ChordsSearch" element={<ChordsSearch />} />
          <Route path="CircleOfFifth" element={<CircleOfFifth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));

reportWebVitals();
