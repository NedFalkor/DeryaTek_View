import { ILabel } from '@/interfaces/records/ILabel'

const API_URL = '/api/'

export default {
  getLabels (): Promise<ILabel[]> {
    return fetch(API_URL + 'labels/')
      .then(response => response.json())
  },
  getLabel (id: number): Promise<ILabel> {
    return fetch(API_URL + 'labels/' + id + '/')
      .then(response => response.json())
  },
  createLabel (label: ILabel): Promise<ILabel> {
    return fetch(API_URL + 'labels/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(label)
    }).then(response => response.json())
  },
  updateLabel (id: number, label: ILabel): Promise<ILabel> {
    return fetch(API_URL + 'labels/' + id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(label)
    }).then(response => response.json())
  },
  deleteLabel (id: number): Promise<void> {
    return fetch(API_URL + 'labels/' + id + '/', {
      method: 'DELETE'
    }).then(response => response.json())
  }
}
