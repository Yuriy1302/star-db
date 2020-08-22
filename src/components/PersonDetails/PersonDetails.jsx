import React from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../Spinner';
import ErrorIndicator from '../ErrorIndicator';
import ErrorButton from '../ErrorButton';

import './PersonDetails.css';

class PersonDetails extends React.Component {
  
  swapiService = new SwapiService();

  constructor(props) {
    super(props);
    this.state = {
      person: null,
      loading: true,
      error: false
    }
  }

  componentDidMount() {
    this.updatePerson();

  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.setState({ loading: true });
      this.updatePerson();
    }
    
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  onPersonLoaded = (person) => {
    this.setState({
      person,
      loading: false,
    });
  }

  updatePerson = () => {
    
    const { personId } = this.props;

    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then(this.onPersonLoaded)
      .catch((err) => console.log('Возникла эта ошибка -> ', err)); //скорее всего не перехватывает ошибку
  }

  renderPersonView = ({ id, name, gender, birthYear, eyeColor }) => {
    return (
      <div className="person-details card">
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
          <ErrorButton />
        </div>
      </div>
    );
  }
  



  
  render() {
    const { person, loading, error } = this.state;
    
    if (!this.state.person) {
      return <span className="span-select">Selected a person from list</span>
    }

    /* const hasData = !(loading || error);
    
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? this.renderPersonView(person) : null; */
    if (error) {
			return <ErrorIndicator />
		};
    if (loading) {
      return <Spinner />
    }
    if (person) {
      
    return (
      <>
        
        {this.renderPersonView(person)}  
      </>
    );
    }
  }
}

export default PersonDetails;