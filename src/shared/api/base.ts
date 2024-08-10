import { env } from '../config'

export class ApiClient {
  private readonly baseUrl: string

  constructor(url: string) {
    this.baseUrl = url
  }

  async handleResponse<TResult>(response: Response): Promise<TResult> {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    try {
      return await response.json()
    } catch (error) {
      throw new Error('Failed to parse response')
    }
  }

  public async get<TResult = unknown>(
    endpoint: string,
    queryParams?: Record<string, string | number>,
  ): Promise<TResult> {
    const url = new URL(endpoint, this.baseUrl)

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString())
      })
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return this.handleResponse<TResult>(response)
  }

  async post<TResult = unknown, TBody = unknown>(endpoint: string, body: TBody): Promise<TResult> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    return this.handleResponse<TResult>(response)
  }
}

export const apiClient = new ApiClient(env.API_URL)
