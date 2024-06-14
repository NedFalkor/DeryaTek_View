import { IBandMember } from '@/interfaces/bands/IBandMember'

const API_URL = '/api/'

export default {
  getBandMembers (): Promise<IBandMember[]> {
    return fetch(API_URL + 'band_members/')
      .then(response => response.json())
  },
  getBandMember (id: number): Promise<IBandMember> {
    return fetch(API_URL + 'band_members/' + id + '/')
      .then(response => response.json())
  },
  createBandMember (bandMember: IBandMember): Promise<IBandMember> {
    return fetch(API_URL + 'band_members/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bandMember)
    }).then(response => response.json())
  },
  updateBandMember (id: number, bandMember: IBandMember): Promise<IBandMember> {
    return fetch(API_URL + 'band_members/' + id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bandMember)
    }).then(response => response.json())
  },
  deleteBandMember (id: number): Promise<void> {
    return fetch(API_URL + 'band_members/' + id + '/', {
      method: 'DELETE'
    }).then(response => response.json())
  }
}
