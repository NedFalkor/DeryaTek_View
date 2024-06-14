import { IVenue } from '@/interfaces/gigs/IVenue'

const API_URL = '/api/'

export default {
  getVenues (): Promise<IVenue[]> {
    return fetch(API_URL + 'venues/')
      .then(response => response.json())
  },
  getVenue (id: number): Promise<IVenue> {
    return fetch(API_URL + 'venues/' + id + '/')
      .then(response => response.json())
  },
  createVenue (venue: IVenue): Promise<IVenue> {
    return fetch(API_URL + 'venues/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(venue)
    }).then(response => response.json())
  },
  updateVenue (id: number, venue: IVenue): Promise<IVenue> {
    return fetch(API_URL + 'venues/' + id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(venue)
    }).then(response => response.json())
  },
  deleteVenue (id: number): Promise<void> {
    return fetch(API_URL + 'venues/' + id + '/', {
      method: 'DELETE'
    }).then(response => response.json())
  }
}
