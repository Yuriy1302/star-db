import React from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../Spinner';

import './PersonDetails.css';

class PersonDetails extends React.Component {
  
  swapiService = new SwapiService();

  constructor(props) {
    super(props);
    this.state = {
      person: null,
    }
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      //this.setState({ person: null });
      this.updatePerson();
    }
  }

  updatePerson = () => {
    
    const { personId } = this.props;

    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then((person) => {
        this.setState({person});
      }); //Добавить catch
  }
  
  render() {
    const { person } = this.state;

    if (!person) {
      return <span className="span-select">Selected a person from list</span>
    }

    const { id, name, gender,
            birthYear, eyeColor } = this.state.person;
    
    const spinner = !person ? <Spinner /> : null;
    
    return (
      <div className="person-details card">
        {spinner}
        {person && (
          <>
          <img className="person-image"
            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
            alt="character" />
          
          <div className="card-body">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="term">Gender</span>
                <span>{gender}</span>
              </li>
              <li className="list-group-item">
                <span className="term">Birth Year</span>
                <span>{birthYear}</span>
              </li>
              <li className="list-group-item">
                <span className="term">Eye Color</span>
                <span>{eyeColor}</span>
              </li>
            </ul>
          </div>
          </>
        )}  
      </div>
    );
  }
}

export default PersonDetails;