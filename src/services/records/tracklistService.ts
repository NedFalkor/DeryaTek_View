import { ITracklist } from '@/interfaces/records/ITracklist'

const API_URL = '/api/'

export default {
  getTracklists (): Promise<ITracklist[]> {
    return fetch(API_URL + 'tracklists/')
      .then(response => response.json())
  },
  getTracklist (id: number): Promise<ITracklist> {
    return fetch(API_URL + `tracklists/${id}/`)
      .then(response => response.json())
  },
  createTracklist (tracklist: ITracklist): Promise<ITracklist> {
    return fetch(API_URL + 'tracklists/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tracklist)
    }).then(response => response.json())
  },
  updateTracklist (id: number, tracklist: ITracklist): Promise<ITracklist> {
    return fetch(API_URL + `tracklists/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tracklist)
    }).then(response => response.json())
  },
  deleteTracklist (id: number): Promise<void> {
    return fetch(API_URL + `tracklists/${id}/`, {
      method: 'DELETE'
    }).then(response => response.json())
  }
}
