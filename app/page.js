import React from 'react';
import '../styles/globals.css';
import PokemonsList from './pokemonList';

{/* Fetch first 20 pokemons */}
async function fetchPokemons(offset = 0) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`);
    const data = await response.json();
    return data;
}

export default async function HomePage({ searchParams }) {
    const initialOffset = searchParams.offset || 0;
    const initialData = await fetchPokemons(initialOffset);

    return (
        <div>
            <PokemonsList initialPokemons={initialData.results} initialOffset={initialOffset} hasMore={!!initialData.next} />
        </div>
    );
}