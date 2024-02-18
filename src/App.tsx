import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pokemon } from './types';

function App() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/greninja')
      .then(response => {
        console.log(JSON.stringify(response.data));
        setPokemon(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });

    axios.post('https://httpbin.org/post', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <h1>ポケモン人気ランキング</h1>
      <ul>
          <li key={pokemon!.id}>
            <h2>ポケモン人気ランキング第1位は{pokemon!.name}!</h2>
            <img src={pokemon!.sprites.front_default} alt={pokemon!.name} />
          </li>
      </ul>
    </div>
  );
}

export default App;