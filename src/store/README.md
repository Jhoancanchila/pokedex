# Redux Store Architecture

Esta implementación de Redux sigue los principios de Clean Architecture y las mejores prácticas de Redux Toolkit.

## Estructura de Carpetas

```
src/store/
├── index.ts          # Configuración principal del store
├── hooks.ts          # Hooks personalizados type-safe
├── store.ts          # Exportaciones centralizadas
├── types/            # Tipos de TypeScript
│   └── index.ts      # Interfaces del estado global
├── slices/           # Redux slices (estado + acciones)
│   └── pokemonSlice.ts
└── selectors/        # Selectores memoizados
    └── pokemonSelectors.ts
```

## Características Implementadas

### 🏗️ **Clean Architecture**
- **Separación de responsabilidades**: Cada archivo tiene una responsabilidad específica
- **Tipos centralizados**: Todos los tipos están definidos en un lugar
- **Selectores memoizados**: Optimización de performance con `createSelector`
- **Hooks personalizados**: Type-safety garantizada con TypeScript

### 🎯 **Pokemon Slice**
- **Estado completo**: Pokemon, búsqueda, selección, carga y errores
- **Acciones optimizadas**: Filtrado automático en búsquedas
- **Navegación de carrusel**: Lógica centralizada para next/previous
- **Estado inmutable**: Usa Immer internamente para mutaciones seguras

### 🔍 **Selectores Avanzados**
- **Memoización**: Evita re-cálculos innecesarios
- **Derivación de estado**: Estados calculados como índices y navegación
- **Performance**: Selectores optimizados para componentes React

### ⚡ **Características del Estado**

#### Pokemon State
```typescript
{
  pokemon: Pokemon[],           // Lista completa de Pokemon
  filteredPokemon: Pokemon[],   // Pokemon filtrados por búsqueda
  selectedPokemon: Pokemon | null, // Pokemon seleccionado para modal
  searchTerm: string,           // Término de búsqueda actual
  loading: boolean,             // Estado de carga
  error: string | null          // Manejo de errores
}
```

#### Acciones Disponibles
- `setPokemon` - Establecer lista de Pokemon
- `setSearchTerm` - Buscar Pokemon (filtra automáticamente)
- `clearSearch` - Limpiar búsqueda
- `setSelectedPokemon` - Seleccionar Pokemon para modal
- `selectNextPokemon` - Navegar al siguiente
- `selectPreviousPokemon` - Navegar al anterior
- `setLoading` / `setError` - Estados de UI

#### Selectores Optimizados
- `selectFilteredPokemon` - Pokemon filtrados
- `selectSelectedPokemon` - Pokemon seleccionado
- `selectCanNavigateNext/Previous` - Estados de navegación
- `selectPokemonStats` - Estadísticas generales

## Uso en Componentes

### Hooks Personalizados
```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
```

### Dispatching Actions
```typescript
const dispatch = useAppDispatch();
dispatch(setSearchTerm('pikachu'));
```

### Selecting State
```typescript
const pokemon = useAppSelector(selectFilteredPokemon);
const selected = useAppSelector(selectSelectedPokemon);
```

## Beneficios de esta Arquitectura

1. **Escalabilidad**: Fácil agregar nuevos slices y funcionalidades
2. **Mantenibilidad**: Código organizado y fácil de entender
3. **Performance**: Selectores memoizados y actualizaciones optimizadas
4. **Type Safety**: TypeScript en toda la aplicación
5. **Testabilidad**: Funciones puras fáciles de testear
6. **Developer Experience**: DevTools y hot reloading

## Migración Completada

✅ **Estado local eliminado**: Todos los componentes usan Redux  
✅ **Búsqueda centralizada**: Lógica de filtrado en el store  
✅ **Navegación de modal**: Carrusel manejado por Redux  
✅ **Type Safety**: Hooks personalizados type-safe  
✅ **Performance**: Selectores memoizados implementados  

La aplicación ahora tiene un estado global robusto y escalable siguiendo las mejores prácticas de Redux Toolkit y Clean Architecture.
