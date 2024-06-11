import { IBand } from '@/interfaces/bands/IBand'

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
  }
}
