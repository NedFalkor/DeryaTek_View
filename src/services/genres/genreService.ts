import { IGenre } from '@/interfaces/genres/IGenre'

const API_URL = '/api/'

export default {
  getGenres (): Promise<IGenre[]> {
    return fetch(API_URL + 'genres/')
      .then(response => response.json())
  },
  getGenre (id: number): Promise<IGenre> {
    return fetch(API_URL + 'genres/' + id + '/')
      .then(response => response.json())
  },
  createGenre (genre: IGenre): Promise<IGenre> {
    return fetch(API_URL + 'genres/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(genre)
    }).then(response => response.json())
  },
  updateGenre (id: number, genre: IGenre): Promise<IGenre> {
    return fetch(API_URL + 'genres/' + id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(genre)
    }).then(response => response.json())
  },
  deleteGenre (id: number): Promise<void> {
    return fetch(API_URL + 'genres/' + id + '/', {
      method: 'DELETE'
    }).then(response => response.json())
  }
}
