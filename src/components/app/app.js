import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button/error-button';
import PeoplePage from '../people-page/people-page';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry';
import ItemDetails from '../item-details';

import './app.css';
import Row from '../row';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  componentDidCatch() {
    this.state({ hasError: true });
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  render() {

    if (this.state.hasError) {
      return (
        <div className="stardb-app container">
        <ErrorIndicator />
        </div>
      )
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;
    const {getPerson, getStarship} = this.swapiService;

    const personDetails = (
      <ItemDetails itemId={11}
        getData={getPerson}/>
    )

    const starshipDetails = (
      <ItemDetails itemId={3}
        getData={getStarship} />
    )

    return (
      <ErrorBoundry>
        <div className="stardb-app container">
          <Header />

          <Row left={personDetails} right={starshipDetails} />
        </div>
      </ErrorBoundry>
    );
  }
};

/// 8-6-04-09

// {/* <div className="row mb-3 mt-4">
//           <div className="col-md-6">
//             <ItemList onItemSelected={ this.onPersonSelected } 
//               getData={ this.swapiService.getAllPlanets } 
//               renderItem={(item) => (<span>{item.name}</span>) }
//               />
//           </div>
//           <div className="col-md-6">
//             <PersonDetails personId={this.state.selectedPerson} />
//           </div>
//         </div> */}

// {/* <div className="row mb-3 mt-4">
//           <div className="col-md-6">
//             <ItemList onItemSelected={ this.onPersonSelected } 
//               getData={ this.swapiService.getAllStarships } 
//               renderItem={ (item) => item.name } />
//           </div>
//           <div className="col-md-6">
//             <PersonDetails personId={this.state.selectedPerson} />
//           </div>
//         </div> */}