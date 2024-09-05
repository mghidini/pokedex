import React from 'react';

// Fetch Pokémon details from PokeAPI
async function fetchPokemonDetails(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch Pokémon details');
    }
    const data = await response.json();
    return data;
}

export default async function PokemonDetailsPage({ params }) {
    const { id } = params; // Extract Pokémon ID from URL parameters
    const pokemonID = parseInt(id, 10); // Convert ID to int

    // Fetch Pokémon details server-side
    const pokemon = await fetchPokemonDetails(id);

    const nextPokemon = pokemonID + 1;
    const previousPokemon = pokemonID > 1 ? pokemonID - 1 : null;

    return (
        <div className='flex flex-col flex-grow items-center justify-center min-h-screen'>
          
            <div className='w-full max-w-4xl p-6 bg-emerald-600 rounded-md'>
              <h1 className="text-3xl font-bold text-slate-700 p-6 text-center break-words">{pokemon.name}</h1>
              <p className='text-center'>pokedex number: {pokemon.id}</p>

              <div className="flex justify-center space-x-4 my-6">
                <img src={pokemon.sprites.front_default} alt={`${pokemon.name} front`} className="w-1/2 md:w-1/3 lg:w-1/4" />
                <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} shiny`} className="w-1/2 md:w-1/3 lg:w-1/4" />
              </div>

              <p>type: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
              <p>height: {pokemon.height}</p>
              <p>weight: {pokemon.weight}</p>
              <p>base experience: {pokemon.base_experience}</p>
              <p>abilities: {pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>

              {/* Stats section */}
              <div className="mt-4">
                {pokemon.stats.map((statInfo, index) => (
                  <p key={index} className="text-center"> {statInfo.stat.name}: {statInfo.base_stat} </p> ))}
              </div>
            </div>

            <div className='flex flex-wrap justify-center w-full max-w-4xl'>
            {previousPokemon !== null && (
                <a href={`/details/${previousPokemon}`} class='actionButton'>Previous Pokemon</a>
            )}
                <a href="/" class='actionButton'>Home</a>
                <a href={`/details/${nextPokemon}`} class='actionButton'>Next Pokemon</a>
            </div>

        </div>
    );
}