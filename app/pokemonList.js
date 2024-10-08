"use client"; //client rendering

import React, { useState, useEffect } from 'react';

{/* Fetch Pokémon list from PokeAPI (limit=20) */}
async function fetchPokemons(offset) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    const data = await response.json();
    return data;
}

export default function PokemonsList({ initialPokemons, initialOffset, hasMore }) {
    const [pokemons, setPokemons] = useState(initialPokemons);
    const [offset, setOffset] = useState(initialOffset);
    const [loading, setLoading] = useState(false);
    const [moreAvailable, setMoreAvailable] = useState(hasMore);

    const loadMorePokemons = async () => {
        setLoading(true);
        try {
            const data = await fetchPokemons(offset +20);
            setPokemons(prevPokemons => [...prevPokemons, ...data.results]);
            setOffset(prevOffset => prevOffset + 20);

            if (!data.next) {
                setMoreAvailable(false);
            }
        } catch (error) {
            console.error('Failed to fetch more Pokémon:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='min-h-screen flex flex-col'>
            <p className='text-white text-center text-xl m-6'>Choose a Pokémon to learn more about it</p>
            
            {/* Pokemon list */}
            <ul>
                {pokemons.map((pokemon, index) => (
                    <li key={index} className="text-center mb-2 p-4 bg-emerald-600 rounded shadow-md">
                        <a href={`/details/${index + 1}`} className="text-slate-700 hover:text-white">
                            {pokemon.name}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Load More Button */}
            {moreAvailable && (
                <div className='flex justify-center'>
                    <button
                    onClick={loadMorePokemons}
                    class='actionButton'
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}

            {/* No more Pokémon available */}
            {!moreAvailable && <p className='text-white m-6'>No more Pokémon to load.</p>}
        </section>
    );
}
