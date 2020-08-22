import React from 'react';

import ItemList from '../ItemList';
import PersonDetails from '../PersonDetails';

import './PeoplePage.css';
import ErrorIndicator from '../ErrorIndicator';

export default class PeoplePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPersone: 3,
      hasError: false
    }
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    })    
  }
  
  onPersonSelected = (id) => {
    this.setState({ selectedPersone: id });
  }

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return (
      <div className="row mb2">
        <div className="col-md-6">
          <ItemList onItemSelected={this.onPersonSelected} />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={this.state.selectedPersone} />
        </div>
      </div>
    );
  }
}