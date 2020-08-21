import React from 'react';

import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import ItemList from '../ItemList';
import PersonDetails from '../PersonDetails';
import ErrorButton from '../ErrorButton';
import ErrorIndicator from '../ErrorIndicator';
/* import PlanetDetails from '../PlanetDetails';
import StarshipDetails from '../StarshipDetails'; */

import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRandomPlanet: true,
      selectedPersone: null,
      hasError: false,
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

  componentDidCatch() {
    console.log('componentDidCatch');
    this.setState({ hasError: true });  
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    const randomPlanet = this.state.showRandomPlanet ?
      <RandomPlanet /> :
      null;

    return (
      <div className="container">
        <Header />
        {randomPlanet}
        <div className="row mb2 button-row">
          <button className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div>

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