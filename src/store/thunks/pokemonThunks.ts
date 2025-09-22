/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../types';
import { pokemonRepository } from '../../infrastructure/repositories/RestPokemonRepository';
import { PokemonRepositoryError } from '../../domain/repositories/PokemonRepository';

// Thunk to fetch Pokemon list with pagination
export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchPokemonList',
  async (
    params: { limit: number; offset: number },
    { rejectWithValue }: { rejectWithValue: (value: string) => any }
  ) => {
    try {
      const paginatedResponse = await pokemonRepository.getPokemonList(
        params.limit, 
        params.offset
      );
      return paginatedResponse;
    } catch (error) {
      if (error instanceof PokemonRepositoryError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch Pokemon list');
    }
  }
);

// Thunk to fetch more Pokemon (for pagination)
export const fetchMorePokemon = createAsyncThunk(
  'pokemon/fetchMorePokemon',
  async (
    params: { limit: number; offset: number },
    { rejectWithValue }: { rejectWithValue: (value: string) => any }
  ) => {
    try {
      const pokemon = await pokemonRepository.getPokemonList(
        params.limit, 
        params.offset
      );
      return pokemon;
    } catch (error) {
      if (error instanceof PokemonRepositoryError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch more Pokemon');
    }
  }
);

// Thunk to fetch Pokemon by ID
export const fetchPokemonById = createAsyncThunk(
  'pokemon/fetchPokemonById',
  async (id: number, { rejectWithValue }: { rejectWithValue: (value: string) => any }) => {
    try {
      const pokemon = await pokemonRepository.getPokemonById(id);
      if (!pokemon) {
        return rejectWithValue(`Pokemon with ID ${id} not found`);
      }
      return pokemon;
    } catch (error) {
      if (error instanceof PokemonRepositoryError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(`Failed to fetch Pokemon with ID ${id}`);
    }
  }
);

// Thunk for async search
export const searchPokemonAsync = createAsyncThunk(
  'pokemon/searchPokemonAsync',
  async (searchTerm: string, { rejectWithValue }: { rejectWithValue: (value: string) => any }) => {
    try {
      if (!searchTerm.trim()) {
        return [];
      }
      
      const pokemon = await pokemonRepository.searchPokemon(searchTerm);
      return pokemon;
    } catch (error) {
      if (error instanceof PokemonRepositoryError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to search Pokemon');
    }
  }
);

// Thunk to fetch Pokemon by type
export const fetchPokemonByType = createAsyncThunk(
  'pokemon/fetchPokemonByType',
  async (typeName: string, { rejectWithValue }: { rejectWithValue: (value: string) => any }) => {
    try {
      const pokemon = await pokemonRepository.getPokemonByType(typeName);
      return pokemon;
    } catch (error) {
      if (error instanceof PokemonRepositoryError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(`Failed to fetch Pokemon of type ${typeName}`);
    }
  }
);

// Thunk to fetch Pokemon types
export const fetchPokemonTypes = createAsyncThunk(
  'pokemon/fetchPokemonTypes',
  async (_: void, { rejectWithValue }: { rejectWithValue: (value: string) => any }) => {
    try {
      const types = await pokemonRepository.getPokemonTypes();
      return types;
    } catch (error) {
      if (error instanceof PokemonRepositoryError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch Pokemon types');
    }
  }
);

// Thunk to refresh Pokemon data
export const refreshPokemonData = createAsyncThunk(
  'pokemon/refreshPokemonData',
  async (_: void, { rejectWithValue }: { rejectWithValue: (value: string) => any }) => {
    try {
      const pokemon = await pokemonRepository.refreshPokemonData();
      return pokemon;
    } catch (error) {
      if (error instanceof PokemonRepositoryError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to refresh Pokemon data');
    }
  }
);

// Thunk to go to next page
export const goToNextPage = createAsyncThunk(
  'pokemon/goToNextPage',
  async (_: void, { getState, rejectWithValue }: { getState: () => RootState; rejectWithValue: (value: string) => any }) => {
    try {
      const state = getState() as any;
      const { currentPage, itemsPerPage, hasNextPage } = state.pokemon;
      
      if (!hasNextPage) {
        return rejectWithValue('No more pages available');
      }
      
      const nextPage = currentPage + 1;
      const offset = (nextPage - 1) * itemsPerPage;
      
      const paginatedResponse = await pokemonRepository.getPokemonList(
        itemsPerPage,
        offset
      );
      return paginatedResponse;
    } catch (error) {
      if (error instanceof PokemonRepositoryError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch next page');
    }
  }
);

// Thunk to go to previous page
export const goToPreviousPage = createAsyncThunk(
  'pokemon/goToPreviousPage',
  async (_: void, { getState, rejectWithValue }: { getState: () => RootState; rejectWithValue: (value: string) => any }) => {
    try {
      const state = getState() as any;
      const { currentPage, itemsPerPage, hasPreviousPage } = state.pokemon;
      
      if (!hasPreviousPage) {
        return rejectWithValue('No previous pages available');
      }
      
      const previousPage = currentPage - 1;
      const offset = (previousPage - 1) * itemsPerPage;
      
      const paginatedResponse = await pokemonRepository.getPokemonList(
        itemsPerPage,
        offset
      );
      return paginatedResponse;
    } catch (error) {
      if (error instanceof PokemonRepositoryError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to fetch previous page');
    }
  }
);

