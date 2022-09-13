import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PokemonCollection from './components/PokemonCollection';

interface Pokemon {
	name: string;
	url: string;
}

interface PokemonDetail {
	id: number;
	name: string;
	sprites: {
		front_default: string;
	};
}
export interface Detail {
	id: number,
	isOpened: boolean;
}
const App: React.FC = () => {
	const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
	const [nextUrl, setNextUrl] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const [viewDetail, setDetail] = useState<Detail>({
		id: 0,
		isOpened: false
	})
	useEffect(() => {
		const getPokemon = async () => {
			const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=20');
			setNextUrl(res.data.next);
			res.data.results.forEach(async (pokemon: Pokemon) => {
				const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
				setPokemons((pre: PokemonDetail[]) => [...pre, poke.data]);
			});
			setLoading(false)
		};
		getPokemon();
	}, []);

	const nextPage = async () => {
		setLoading(true);
		let res = await axios.get(nextUrl);
		setNextUrl(res.data.next);
		res.data.results.forEach(async (pokemon: Pokemon) => {
			const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
			setPokemons((pre: PokemonDetail[]) => [...pre, poke.data]);
		});
		setLoading(false)
	};

	return (
		<div className="App">
			<div className="container">
				<header className="pokemon-header">Pokemon</header>
				<PokemonCollection pokemons={pokemons} viewDetail={viewDetail} setDetail={setDetail} />
				{!viewDetail.isOpened ? <button onClick={nextPage} className="btn">{loading ? 'Loading...' : 'Load more'}</button> : ''}

			</div>
		</div>
	);
};

export default App;
