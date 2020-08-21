import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../Spinner';
import ErrorIndicator from '../ErrorIndicator';

import './ItemList.css';


class ItemList extends Component {

	swapiService = new SwapiService();

	constructor(props) {
		super(props);
		this.state = {
			peopleList: null,
			loading: true,
			error: false,
		};
	};

	componentDidMount = () => {
		this.swapiService
			.getAllPeople()
			.then((peopleList) => {
				this.setState({
					peopleList
				});
			})
			.catch(this.onError); //Добавить catch
	}
	
	onError = () => {
    this.setState({
      error: true,
      loading: false
    })
  }
  
  renderItems = (arr) => {
    return arr.map(({id, name}) => {
      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onItemSelected(id)}>
					{name}
				</li>
      );
    });
  }

	render() {

		const { peopleList, error } = this.state;
		

		if (error) {
			return <ErrorIndicator />
		};
    if (!peopleList) {
      return <Spinner />
    }

    const items = this.renderItems(peopleList);

		return(

			<ul className="item-list list-group">
				{items}
			</ul>
		);
	}
}

export default ItemList;