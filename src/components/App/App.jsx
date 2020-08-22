import React from 'react';

import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import PeoplPage from '../PeoplePage';
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
      hasError: false,
    }
  }

  toggleRandomPlanet = () => {
    this.setState(({showRandomPlanet}) => {
      return { showRandomPlanet: !showRandomPlanet};
    })
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

        <PeoplPage />
        <PeoplPage />
        <PeoplPage />
        
      </div>
    );
  };
}


export default App;