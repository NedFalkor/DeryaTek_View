import { IFestival } from '@/interfaces/gigs/IFestival'

const API_URL = '/api/'

export default {
  getFestivals (): Promise<IFestival[]> {
    return fetch(API_URL + 'festivals/')
      .then(response => response.json())
  },
  getFestival (id: number): Promise<IFestival> {
    return fetch(API_URL + 'festivals/' + id + '/')
      .then(response => response.json())
  },
  createFestival (festival: IFestival): Promise<IFestival> {
    return fetch(API_URL + 'festivals/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(festival)
    }).then(response => response.json())
  },
  updateFestival (id: number, festival: IFestival): Promise<IFestival> {
    return fetch(API_URL + 'festivals/' + id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(festival)
    }).then(response => response.json())
  },
  deleteFestival (id: number): Promise<void> {
    return fetch(API_URL + 'festivals/' + id + '/', {
      method: 'DELETE'
    }).then(response => response.json())
  }
}
