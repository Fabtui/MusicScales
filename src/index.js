import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import reportWebVitals from './reportWebVitals';
import {MyScale} from './containers/MyScale'
import { AllScales } from './containers/AllScales'
import { SearchByNotes } from './containers/SearchByNotes'
import { SearchByChords } from './containers/SearchByChords'
import { ChordsSearch } from './containers/ChordsSearch'
import { CircleOfFifth } from './containers/CircleOfFifth';
import { Compare } from './components/Compare';
import { Modes } from './containers/Modes';
import Child from './tools/Child'
import Layout from './containers/Layout'
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
          <Route path="Compare" element={<Compare />} />
          <Route path="Modes" element={<Modes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));

reportWebVitals();
