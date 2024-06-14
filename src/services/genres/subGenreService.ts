// src/services/subGenreService.ts
import { ISubGenre } from '@/interfaces/genres/ISubGenre'

const API_URL = '/api/'

export default {
  getSubGenres (): Promise<ISubGenre[]> {
    return fetch(API_URL + 'sub_genres/')
      .then(response => response.json())
  },
  getSubGenre (id: number): Promise<ISubGenre> {
    return fetch(API_URL + 'sub_genres/' + id + '/')
      .then(response => response.json())
  },
  createSubGenre (subGenre: FormData): Promise<ISubGenre> { // Change ISubGenre to FormData
    return fetch(API_URL + 'sub_genres/', {
      method: 'POST',
      body: subGenre
    }).then(response => response.json())
  },
  updateSubGenre (id: number, subGenre: ISubGenre): Promise<ISubGenre> {
    return fetch(API_URL + 'sub_genres/' + id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subGenre)
    }).then(response => response.json())
  },
  deleteSubGenre (id: number): Promise<void> {
    return fetch(API_URL + 'sub_genres/' + id + '/', {
      method: 'DELETE'
    }).then(response => response.json())
  }
}
