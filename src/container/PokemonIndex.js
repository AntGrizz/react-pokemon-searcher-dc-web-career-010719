import React from 'react';
import PokemonCollection from '../components/PokemonCollection';
import PokemonForm from '../components/PokemonForm';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';

const URL = 'http://localhost:3000/pokemon';

class PokemonPage extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      searchTerm: ''
    };
  }


  componentDidMount() {
    console.log("hi")
    fetch(URL)
      .then(res => res.json())
      .then(pokemons => this.setState({ pokemons: pokemons }));
  }

  componentDidUpdate(){
  console.log("did update")
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ searchTerm: value });
    this.searchPokemon();
  };

  searchPokemon = () => {
    return this.state.pokemons.filter(p =>
      p.name.includes(this.state.searchTerm)
    );
  };

  addNewPokemon = val => {
    const data = {
      name: val.name,
      stats: [
        {
        value: val.hp,
        name: 'hp'
      }
    ],
      sprites: {
        front: val.front,
        back: val.back
      }
    };
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(pokemon =>
        this.setState({
          pokemons: [...this.state.pokemons, pokemon]
        })
      );
  };

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search
          onSearchChange={_.debounce(this.handleSearchChange, 500)}
          showNoResults={false}
        />
        <br />
        <PokemonCollection pokemons={this.searchPokemon()} />
        <br />
        <PokemonForm addNewPokemon={this.addNewPokemon} />
      </div>
    );
  }
}

export default PokemonPage;


// const {listing: {title, type, location: {city, state, country}}} = this.props;

// {listing: {title, type, location: {city, state, country}}
