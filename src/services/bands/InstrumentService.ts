import { IInstrument } from '@/interfaces/bands/IInstrument'

const API_URL = '/api/'

export default {
  getInstruments (): Promise<IInstrument[]> {
    return fetch(API_URL + 'instruments/')
      .then(response => response.json())
  },
  getInstrument (id: number): Promise<IInstrument> {
    return fetch(API_URL + 'instruments/' + id + '/')
      .then(response => response.json())
  },
  createInstrument (instrument: IInstrument): Promise<IInstrument> {
    return fetch(API_URL + 'instruments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(instrument)
    }).then(response => response.json())
  },
  updateInstrument (id: number, instrument: IInstrument): Promise<IInstrument> {
    return fetch(API_URL + 'instruments/' + id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(instrument)
    }).then(response => response.json())
  },
  deleteInstrument (id: number): Promise<void> {
    return fetch(API_URL + 'instruments/' + id + '/', {
      method: 'DELETE'
    }).then(response => response.json())
  }
}
