import './stylesheets/App.css';
import {Selector} from './Selector'
import {Tabs, Tab} from './Tabs'
import { AllScales } from './AllScales'

function App() {
  return (
  <div className="App">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <h3 className="navbar-brand">MusicScales</h3>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
          <Tabs>
            <Tab title={"My scale"} selected>
              <Selector/>
            </Tab>
            <Tab title={"All scales"}>
              <AllScales/>
            </Tab>
          </Tabs>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
}

export default App;
