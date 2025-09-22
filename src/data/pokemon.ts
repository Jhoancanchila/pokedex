import type { Pokemon } from '../types/pokemon';

export const pokemonData: Pokemon[] = [
  {
    id: 1,
    name: 'Bulbasaur',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    type: ['grass', 'poison'],
    number: '#001',
    weight: 6.9,
    height: 0.7,
    abilities: ['Overgrow', 'Chlorophyll'],
    description: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45
    }
  },
  {
    id: 4,
    name: 'Charmander',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    type: ['fire'],
    number: '#004',
    weight: 8.5,
    height: 0.6,
    abilities: ['Blaze', 'Solar Power'],
    description: 'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.',
    stats: {
      hp: 39,
      attack: 52,
      defense: 43,
      specialAttack: 60,
      specialDefense: 50,
      speed: 65
    }
  },
  {
    id: 7,
    name: 'Squirtle',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
    type: ['water'],
    number: '#007',
    weight: 9.0,
    height: 0.5,
    abilities: ['Torrent', 'Rain Dish'],
    description: 'After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.',
    stats: {
      hp: 44,
      attack: 48,
      defense: 65,
      specialAttack: 50,
      specialDefense: 64,
      speed: 43
    }
  },
  {
    id: 12,
    name: 'Butterfree',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png',
    type: ['bug', 'flying'],
    number: '#012',
    weight: 32.0,
    height: 1.1,
    abilities: ['Compound Eyes', 'Tinted Lens'],
    description: 'In battle, it flaps its wings at great speed to release highly toxic dust into the air.',
    stats: {
      hp: 60,
      attack: 45,
      defense: 50,
      specialAttack: 90,
      specialDefense: 80,
      speed: 70
    }
  },
  {
    id: 25,
    name: 'Pikachu',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    type: ['electric'],
    number: '#025',
    weight: 6.0,
    height: 0.4,
    abilities: ['Static', 'Lightning Rod'],
    description: 'When several of these Pokémon gather, their electricity could build and cause lightning storms.',
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      specialAttack: 50,
      specialDefense: 50,
      speed: 90
    }
  },
  {
    id: 94,
    name: 'Gengar',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
    type: ['ghost', 'poison'],
    number: '#094',
    weight: 40.5,
    height: 1.5,
    abilities: ['Cursed Body'],
    description: 'Under a full moon, this Pokémon likes to mimic the shadows of people and laugh at their fright.',
    stats: {
      hp: 60,
      attack: 65,
      defense: 60,
      specialAttack: 130,
      specialDefense: 75,
      speed: 110
    }
  },
  {
    id: 132,
    name: 'Ditto',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png',
    type: ['normal'],
    number: '#132',
    weight: 4.0,
    height: 0.3,
    abilities: ['Limber', 'Imposter'],
    description: 'Capable of copying an enemy\'s genetic code to instantly transform itself into a duplicate of the enemy.',
    stats: {
      hp: 48,
      attack: 48,
      defense: 48,
      specialAttack: 48,
      specialDefense: 48,
      speed: 48
    }
  },
  {
    id: 151,
    name: 'Mew',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png',
    type: ['psychic'],
    number: '#151',
    weight: 4.0,
    height: 0.4,
    abilities: ['Synchronize'],
    description: 'When viewed through a microscope, this Pokémon\'s short, fine, delicate hair can be seen.',
    stats: {
      hp: 100,
      attack: 100,
      defense: 100,
      specialAttack: 100,
      specialDefense: 100,
      speed: 100
    }
  },
  {
    id: 448,
    name: 'Lucario',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png',
    type: ['fighting', 'steel'],
    number: '#448',
    weight: 54.0,
    height: 1.2,
    abilities: ['Steadfast', 'Inner Focus'],
    description: 'It has the ability to sense the auras of all things. It understands human speech.',
    stats: {
      hp: 70,
      attack: 110,
      defense: 70,
      specialAttack: 115,
      specialDefense: 70,
      speed: 90
    }
  }
];
