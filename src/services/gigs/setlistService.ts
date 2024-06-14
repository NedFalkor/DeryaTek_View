import { ISetlist } from '@/interfaces/gigs/ISetlist'

const API_URL = '/api/'

export default {
  getSetlists (): Promise<ISetlist[]> {
    return fetch(API_URL + 'setlists/')
      .then(response => response.json())
  },
  getSetlist (id: number): Promise<ISetlist> {
    return fetch(`${API_URL}setlists/${id}/`)
      .then(response => response.json())
  },
  createSetlist (setlist: ISetlist): Promise<ISetlist> {
    return fetch(API_URL + 'setlists/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(setlist)
    }).then(response => response.json())
  },
  updateSetlist (id: number, setlist: ISetlist): Promise<ISetlist> {
    return fetch(`${API_URL}setlists/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(setlist)
    }).then(response => response.json())
  },
  deleteSetlist (id: number): Promise<void> {
    return fetch(`${API_URL}setlists/${id}/`, {
      method: 'DELETE'
    }).then(response => response.json())
  }
}
