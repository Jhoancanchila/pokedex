# 🔥 Pokédex

Una aplicación moderna de Pokédex construida con React, TypeScript y Redux Toolkit que consume la [PokéAPI](https://pokeapi.co/) para mostrar información detallada de Pokémon.

![React](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.9.0-purple)
![Vite](https://img.shields.io/badge/Vite-7.1.6-yellow)

## ✨ Características

- 🎨 **Interfaz moderna** con diseño responsive y limpio
- 🔍 **Búsqueda en tiempo real** por nombre, número o tipo de Pokémon
- 📱 **Modal de detalles** con navegación entre Pokémon
- ❤️ **Sistema de favoritos** con persistencia en localStorage
- 📊 **Estadísticas visuales** con barras de progreso
- 🔄 **Paginación** optimizada para cargar Pokémon
- ⚡ **Carga optimizada** con procesamiento por lotes
- 🎯 **Arquitectura clean** con separación de responsabilidades

## 🚀 Inicio Rápido

### Prerequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]
cd pokedex

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

### Comandos Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construcción para producción
npm run preview  # Vista previa de la construcción
npm run lint     # Análisis de código
```

### Stack Tecnológico

- **Frontend**: React 19.1.1 + TypeScript 5.8.3
- **Estado**: Redux Toolkit + React Redux
- **Build Tool**: Vite 7.1.6 con SWC
- **Linting**: ESLint 9 con configuración TypeScript
- **API**: PokéAPI REST

### Estructura del Proyecto

```
src/
├── components/           # Componentes organizados por Atomic Design
│   ├── atoms/           # Componentes básicos (Button, Card, etc.)
│   ├── molecules/       # Combinaciones de atoms
│   ├── organisms/       # Secciones complejas (Header, Modal)
│   ├── templates/       # Layouts de página
│   └── pages/          # Páginas completas
├── store/              # Redux Toolkit
│   ├── slices/         # State slices
│   ├── thunks/         # Async actions
│   ├── selectors/      # Selectores memoizados
│   └── types/          # Tipos TypeScript
├── infrastructure/     # Capa de infraestructura
│   ├── http/           # Cliente HTTP
│   ├── repositories/   # Implementación de repositorios
│   └── mappers/        # Transformación de datos
├── domain/             # Lógica de dominio
│   └── repositories/   # Contratos de repositorio
└── types/              # Tipos compartidos
```

### Patrones Implementados

- **Clean Architecture**: Separación clara entre capas
- **Atomic Design**: Organización de componentes
- **Repository Pattern**: Abstracción de datos
- **Flux/Redux**: Gestión de estado unidireccional

## 🎯 Funcionalidades Principales

### Exploración de Pokémon
- Lista paginada con 20 Pokémon por página
- Tarjetas con imagen, nombre, número y tipos
- Colores dinámicos según el tipo primario

### Búsqueda Inteligente
- Búsqueda por API para coincidencias exactas
- Fallback a búsqueda local para coincidencias parciales
- Filtrado por nombre, número o tipo

### Modal de Detalles
- Información completa: estadísticas, descripción, habilidades
- Navegación con flechas o teclado (← →)
- Visualización de estadísticas con barras de progreso

### Sistema de Favoritos
- Marcar/desmarcar favoritos desde cualquier vista
- Persistencia automática en localStorage
- Indicadores visuales en tarjetas y modal

## 🔧 Configuración Avanzada

### Variables de Entorno
```bash
# Borrar el .example del archivo .env.example y agrgar a la variable la url api pokémon 
VITE_POKEMON_API_BASE_URL=https://pokeapi.co/api/v2
```

### Optimizaciones Implementadas

- **Lazy Loading**: Imágenes con carga diferida
- **Batch Processing**: Procesamiento por lotes para la API
- **Memoización**: Selectores Redux optimizados
- **Code Splitting**: División automática del código

### Linting y Formatting
```bash
npm run lint                    # Verificar código
npm run lint -- --fix         # Corregir automáticamente
```

### Configuración TypeScript
- Modo estricto habilitado
- Verificación exhaustiva de tipos
- Importaciones optimizadas

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.
