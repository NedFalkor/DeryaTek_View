import { IBand } from '@/interfaces/bands/IBand'
import { IGenre } from '@/interfaces/genres/IGenre'
import { IBandMember } from '@/interfaces/bands/IBandMember'

const API_URL = '/api/'

export default {
  getBands (): Promise<IBand[]> {
    return fetch(API_URL + 'bands/')
      .then(response => response.json())
  },
  getBand (id: number): Promise<IBand> {
    return fetch(API_URL + `bands/${id}/`)
      .then(response => response.json())
  },
  createBand (band: IBand): Promise<IBand> {
    return fetch(API_URL + 'bands/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(band)
    }).then(response => response.json())
  },
  updateBand (id: number, band: IBand): Promise<IBand> {
    return fetch(API_URL + `bands/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(band)
    }).then(response => response.json())
  },
  deleteBand (id: number): Promise<void> {
    return fetch(API_URL + `bands/${id}/`, {
      method: 'DELETE'
    }).then(response => response.json())
  },
  getGenres (): Promise<IGenre[]> {
    return fetch(API_URL + 'genres/')
      .then(response => response.json())
  },
  getBandMembers (): Promise<IBandMember[]> {
    return fetch(API_URL + 'band_members/')
      .then(response => response.json())
  }
}
