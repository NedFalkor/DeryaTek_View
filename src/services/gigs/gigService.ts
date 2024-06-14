import { IGig } from '@/interfaces/gigs/IGig'

const API_URL = '/api/'

export default {
  getGigs (): Promise<IGig[]> {
    return fetch(API_URL + 'gigs/')
      .then(response => response.json())
  },
  getGig (id: number): Promise<IGig> {
    return fetch(API_URL + 'gigs/' + id + '/')
      .then(response => response.json())
  },
  createGig (gig: IGig): Promise<IGig> {
    return fetch(API_URL + 'gigs/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gig)
    }).then(response => response.json())
  },
  updateGig (id: number, gig: IGig): Promise<IGig> {
    return fetch(API_URL + 'gigs/' + id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gig)
    }).then(response => response.json())
  },
  deleteGig (id: number): Promise<void> {
    return fetch(API_URL + 'gigs/' + id + '/', {
      method: 'DELETE'
    }).then(response => response.json())
  }
}
