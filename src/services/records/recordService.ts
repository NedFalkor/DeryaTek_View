import { IRecord } from '@/interfaces/records/IRecord'

const API_URL = '/api/'

export default {
  getRecords (): Promise<IRecord[]> {
    return fetch(API_URL + 'records/')
      .then(response => response.json())
  },
  getRecord (id: number): Promise<IRecord> {
    return fetch(API_URL + 'records/' + id + '/')
      .then(response => response.json())
  },
  createRecord (record: IRecord): Promise<IRecord> {
    return fetch(API_URL + 'records/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)
    }).then(response => response.json())
  },
  updateRecord (id: number, record: IRecord): Promise<IRecord> {
    return fetch(API_URL + 'records/' + id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)
    }).then(response => response.json())
  },
  deleteRecord (id: number): Promise<void> {
    return fetch(API_URL + 'records/' + id + '/', {
      method: 'DELETE'
    }).then(response => response.json())
  }
}
