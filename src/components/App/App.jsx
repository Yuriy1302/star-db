import React from 'react';

import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import ItemList from '../ItemList';
import PersonDetails from '../PersonDetails';


import './App.css';
/* import PlanetDetails from '../PlanetDetails';
import StarshipDetails from '../StarshipDetails'; */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRandomPlanet: true,
      selectedPersone: null,
    }
  }

  toggleRandomPlanet = () => {
    this.setState(({showRandomPlanet}) => {
      return { showRandomPlanet: !showRandomPlanet};
    })
  }

  onPersonSelected = (id) => {
    this.setState({ selectedPersone: id });
  }

  render() {

    const randomPlanet = this.state.showRandomPlanet ?
      <RandomPlanet /> :
      null;

    return (
      <div className="container">
        <Header />
        {randomPlanet}
        <button className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPersone} />
          </div>
        </div>
        
      </div>
    );
  };
}


export default App;