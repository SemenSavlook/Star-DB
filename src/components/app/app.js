import React, { Component } from 'react';

import Header from '../header';
import ErrorBoundry from '../error-boundry';
import SwapiService from "../../services/swapi-service";
import DummySwapiService from '../../services/dummy-swapi-service';
import RandomPlanet from '../random-planet/random-planet';
import { PeoplePage, PlanetsPage, StarshipsPage } from '../pages';
import StarshipDetails from '../sw-components/starship-details';

import { SwapiServiceProvider } from '../swapi-service-context/';

import './app.css';

import { BrowserRouter as Router, Route  } from 'react-router-dom';

export default class App extends Component {

  state = {
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      return {
        swapiService: new Service()
      }
    })
  }

  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={ this.state.swapiService }>
        <Router>
          <div className="stardb-app container">
            <Header onServiceChange={this.onServiceChange} />
            <RandomPlanet />

            <Route 
              path="/" 
              render={() => <h2>Welcome to StarDB App</h2>}
              exact
            />
            <Route path="/people" component={PeoplePage}/>
            <Route path="/planets" component={PlanetsPage}/>
            <Route path="/starships" component={StarshipsPage} exact/>
            <Route path="/starships/:id" 
              render={({ match }) => {
                const id = match.params.id;
                return <StarshipDetails itemId={id} />
              }}/>

          </div>

        </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}