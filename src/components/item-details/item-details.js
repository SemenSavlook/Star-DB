import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorButton from '../error-button/error-button';

import './item-details.css';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
    .then((item) => {
      this.setState({ item })
    })
  }

  render() {

    const { person } = this.state;
    if (!person) {
      return <span>Select a person from a list</span>;
    }

    const { 
      id, name, gender, birthYear, eyeColor
    } = person;

    return (
      <div className="item-details card">
        <img className="item-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt='character'/>

        <div className="card-body">
          <h4>{ name }</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{ gender }</span>
            </li>
            <li className="list-group-item">
              <span className="term">{ birthYear }</span>
              <span>43</span>
            </li>
            <li className="list-group-item">
              <span className="term">{ eyeColor }</span>
              <span>red</span>
            </li>
          </ul>

          <ErrorButton />
        </div>
      </div>
    )
  }
}
