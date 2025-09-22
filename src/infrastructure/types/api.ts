// Tipos para respuestas de PokeAPI REST

// Respuesta básica de un Pokémon individual
export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    front_default: string | null;
    back_default: string | null;
    front_shiny: string | null;
    back_shiny: string | null;
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
      'home'?: {
        front_default: string | null;
      };
    };
  };
  species: {
    name: string;
    url: string;
  };
}

// Respuesta de lista de Pokémon
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

// Respuesta de especies de Pokémon (para descripciones)
export interface PokemonSpeciesResponse {
  id: number;
  name: string;
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }[];
}

// Respuesta de tipos de Pokémon
export interface PokemonTypeResponse {
  id: number;
  name: string;
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
}

// Respuesta de lista de tipos
export interface TypeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

// Helper para construir URLs de PokeAPI
export const buildApiUrl = {
  pokemon: (id: number) => `/pokemon/${id}`,
  pokemonList: (limit: number, offset: number) => `/pokemon?limit=${limit}&offset=${offset}`,
  species: (id: number) => `/pokemon-species/${id}`,
  type: (name: string) => `/type/${name}`,
  typeList: () => '/type?limit=50',
};

// Interface para datos de Pokémon procesados
export interface ProcessedPokemonData {
  basic: PokemonApiResponse;
  species?: PokemonSpeciesResponse;
}
