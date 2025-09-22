export interface Pokemon {
  id: number;
  name: string;
  image: string;
  type: string[];
  number: string;
  weight: number;
  height: number;
  abilities: string[];
  description: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}

export interface PokemonGridProps {
  pokemon: Pokemon[];
  onPokemonClick?: (pokemon: Pokemon) => void;
}

export interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
}

export interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export interface PokemonDetailModalProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
}
