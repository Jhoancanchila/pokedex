/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../../types/pokemon';
import type { PokemonState } from '../types';
import {
  fetchPokemonList,
  fetchMorePokemon,
  fetchPokemonById,
  searchPokemonAsync,
  fetchPokemonByType,
  refreshPokemonData,
  goToNextPage,
  goToPreviousPage,
} from '../thunks/pokemonThunks';

const initialState: PokemonState = {
  pokemon: [], // Start empty, will be populated from API
  loading: false,
  error: null,
  selectedPokemon: null,
  searchTerm: '',
  filteredPokemon: [],
  // Pagination initial state
  currentPage: 1,
  itemsPerPage: 20,
  totalItems: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  // Favorites initial state
  favorites: JSON.parse(localStorage.getItem('pokemonFavorites') || '[]'),
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    // Actions for managing Pokemon data
    setPokemon: (state: { pokemon: Pokemon[]; searchTerm: unknown; filteredPokemon: Pokemon[]; }, action: PayloadAction<Pokemon[]>) => {
      state.pokemon = action.payload;
      // Update filtered pokemon if no search term
      if (!state.searchTerm) {
        state.filteredPokemon = action.payload;
      }
    },
    
    // Actions for search functionality
    setSearchTerm: (state: { searchTerm: string; }, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      // No hacemos filtrado local aquí - lo hace searchPokemonAsync
    },
    
    clearSearch: (state: { searchTerm: string; filteredPokemon: any; pokemon: any; }) => {
      state.searchTerm = '';
      state.filteredPokemon = state.pokemon;
    },
    
    // Actions for pagination
    setCurrentPage: (state: { currentPage: number; }, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    
    updatePaginationInfo: (state: any, action: PayloadAction<{ totalItems: number; currentPage: number; itemsPerPage: number; }>) => {
      const { totalItems, currentPage, itemsPerPage } = action.payload;
      state.totalItems = totalItems;
      state.currentPage = currentPage;
      state.itemsPerPage = itemsPerPage;
      
      // Calculate pagination flags
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      state.hasNextPage = currentPage < totalPages;
      state.hasPreviousPage = currentPage > 1;
    },
    
    // Actions for favorites
    toggleFavorite: (state: { favorites: number[]; }, action: PayloadAction<number>) => {
      const pokemonId = action.payload;
      const currentFavorites = state.favorites;
      
      if (currentFavorites.includes(pokemonId)) {
        // Remove from favorites
        state.favorites = currentFavorites.filter(id => id !== pokemonId);
      } else {
        // Add to favorites
        state.favorites = [...currentFavorites, pokemonId];
      }
      
      // Save to localStorage
      localStorage.setItem('pokemonFavorites', JSON.stringify(state.favorites));
    },
    
    addToFavorites: (state: { favorites: number[]; }, action: PayloadAction<number>) => {
      const pokemonId = action.payload;
      if (!state.favorites.includes(pokemonId)) {
        state.favorites = [...state.favorites, pokemonId];
        localStorage.setItem('pokemonFavorites', JSON.stringify(state.favorites));
      }
    },
    
    removeFromFavorites: (state: { favorites: number[]; }, action: PayloadAction<number>) => {
      const pokemonId = action.payload;
      state.favorites = state.favorites.filter(id => id !== pokemonId);
      localStorage.setItem('pokemonFavorites', JSON.stringify(state.favorites));
    },
    
    clearAllFavorites: (state: { favorites: number[]; }) => {
      state.favorites = [];
      localStorage.setItem('pokemonFavorites', JSON.stringify([]));
    },
    
    // Actions for selected Pokemon (modal)
    setSelectedPokemon: (state: { selectedPokemon: Pokemon | null; }, action: PayloadAction<Pokemon | null>) => {
      state.selectedPokemon = action.payload;
    },
    
    selectPokemonById: (state: { filteredPokemon: any[]; selectedPokemon: any; }, action: PayloadAction<number>) => {
      const pokemon = state.filteredPokemon.find((p: { id: number; }) => p.id === action.payload);
      state.selectedPokemon = pokemon || null;
    },
    
    selectNextPokemon: (state: { selectedPokemon: any; filteredPokemon: any[]; }) => {
      if (!state.selectedPokemon) return;
      
      const currentIndex = state.filteredPokemon.findIndex(
        (        p: { id: any; }) => p.id === state.selectedPokemon!.id
      );
      
      if (currentIndex < state.filteredPokemon.length - 1) {
        state.selectedPokemon = state.filteredPokemon[currentIndex + 1];
      }
    },
    
    selectPreviousPokemon: (state: { selectedPokemon: any; filteredPokemon: any[]; }) => {
      if (!state.selectedPokemon) return;
      
      const currentIndex = state.filteredPokemon.findIndex(
        (        p: { id: any; }) => p.id === state.selectedPokemon!.id
      );
      
      if (currentIndex > 0) {
        state.selectedPokemon = state.filteredPokemon[currentIndex - 1];
      }
    },
    
    // Actions for loading states
    setLoading: (state: { loading: boolean; }, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    setError: (state: { error: string | null; }, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    // Reset state
    resetPokemonState: () => initialState,
  },
  extraReducers: (builder: any) => {
    // Fetch Pokemon List
    builder
      .addCase(fetchPokemonList.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state: any, action: any) => {
        state.loading = false;
        const paginatedResponse = action.payload;
        state.pokemon = paginatedResponse.pokemon;
        
        // Update pagination info
        state.totalItems = paginatedResponse.totalItems;
        state.currentPage = paginatedResponse.currentPage;
        state.itemsPerPage = paginatedResponse.itemsPerPage;
        state.hasNextPage = paginatedResponse.hasNextPage;
        state.hasPreviousPage = paginatedResponse.hasPreviousPage;
        
        // Update filtered pokemon if no search term
        if (!state.searchTerm) {
          state.filteredPokemon = paginatedResponse.pokemon;
        }
      })
      .addCase(fetchPokemonList.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Additional async reducers with simplified types
    builder
      .addCase(fetchMorePokemon.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMorePokemon.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.pokemon = [...state.pokemon, ...action.payload];
        if (!state.searchTerm) {
          state.filteredPokemon = [...state.filteredPokemon, ...action.payload];
        }
      })
      .addCase(fetchMorePokemon.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPokemonById.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonById.fulfilled, (state: any, action: any) => {
        state.loading = false;
        const index = state.pokemon.findIndex((p: any) => p.id === action.payload.id);
        if (index !== -1) {
          state.pokemon[index] = action.payload;
        } else {
          state.pokemon.push(action.payload);
        }
        if (!state.searchTerm) {
          state.filteredPokemon = state.pokemon;
        }
      })
      .addCase(fetchPokemonById.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchPokemonAsync.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPokemonAsync.fulfilled, (state: any, action: any) => {
        state.loading = false;
        // Si la búsqueda por API devuelve resultados, usarlos
        if (action.payload.length > 0) {
          state.filteredPokemon = action.payload;
        } else {
          // Si no hay resultados de API, hacer búsqueda local parcial
          const searchTerm = state.searchTerm.toLowerCase();
          state.filteredPokemon = state.pokemon.filter((pokemon: any) =>
            pokemon.name.toLowerCase().includes(searchTerm) ||
            pokemon.number.includes(state.searchTerm) ||
            pokemon.type.some((type: any) => type.toLowerCase().includes(searchTerm))
          );
        }
      })
      .addCase(searchPokemonAsync.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPokemonByType.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonByType.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.filteredPokemon = action.payload;
      })
      .addCase(fetchPokemonByType.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshPokemonData.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshPokemonData.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.pokemon = action.payload;
        if (!state.searchTerm) {
          state.filteredPokemon = action.payload;
        }
      })
      .addCase(refreshPokemonData.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(goToNextPage.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(goToNextPage.fulfilled, (state: any, action: any) => {
        state.loading = false;
        const paginatedResponse = action.payload;
        state.pokemon = paginatedResponse.pokemon;
        
        // Update pagination info
        state.totalItems = paginatedResponse.totalItems;
        state.currentPage = paginatedResponse.currentPage;
        state.itemsPerPage = paginatedResponse.itemsPerPage;
        state.hasNextPage = paginatedResponse.hasNextPage;
        state.hasPreviousPage = paginatedResponse.hasPreviousPage;
        
        // Update filtered pokemon if no search term
        if (!state.searchTerm) {
          state.filteredPokemon = paginatedResponse.pokemon;
        }
      })
      .addCase(goToNextPage.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(goToPreviousPage.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(goToPreviousPage.fulfilled, (state: any, action: any) => {
        state.loading = false;
        const paginatedResponse = action.payload;
        state.pokemon = paginatedResponse.pokemon;
        
        // Update pagination info
        state.totalItems = paginatedResponse.totalItems;
        state.currentPage = paginatedResponse.currentPage;
        state.itemsPerPage = paginatedResponse.itemsPerPage;
        state.hasNextPage = paginatedResponse.hasNextPage;
        state.hasPreviousPage = paginatedResponse.hasPreviousPage;
        
        // Update filtered pokemon if no search term
        if (!state.searchTerm) {
          state.filteredPokemon = paginatedResponse.pokemon;
        }
      })
      .addCase(goToPreviousPage.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setPokemon,
  setSearchTerm,
  clearSearch,
  setCurrentPage,
  updatePaginationInfo,
  toggleFavorite,
  addToFavorites,
  removeFromFavorites,
  clearAllFavorites,
  setSelectedPokemon,
  selectPokemonById,
  selectNextPokemon,
  selectPreviousPokemon,
  setLoading,
  setError,
  resetPokemonState,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
