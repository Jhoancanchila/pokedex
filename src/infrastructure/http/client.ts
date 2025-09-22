// Cliente HTTP para API REST usando fetch nativo
export class HttpClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Network request failed: ${error.message}`);
      }
      throw new Error('Unknown network error occurred');
    }
  }

  async getWithParams<T>(endpoint: string, params: Record<string, string | number>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });

    return this.get<T>(url.pathname + url.search);
  }
}

// Cliente HTTP configurado para PokeAPI
export const httpClient = new HttpClient('https://pokeapi.co/api/v2');
