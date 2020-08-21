import React from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../Spinner';
import ErrorIndicator from '../ErrorIndicator';

import './RandomPlanet.css';

class RandomPlanet extends React.Component {

  swapiService = new SwapiService();

  constructor(props) {
    super(props);
    this.state = {
      planet: {},
      loading: true,
      error: false     
    }
  }

  componentDidMount = () => {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 7000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false
    })
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
    });
  }

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 16 + 2);
    //const id = 120;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    

    const { planet, loading, error } = this.state;
    
    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;
    
    
    return(
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population,
          rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt="" />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod} days</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter} km</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}

export default RandomPlanet;









/* this.setState({
  id,
  name: planet.name,
  population: planet.population,
  rotationPeriod: planet.rotation_period,
  diameter: planet.diameter
}); */