import { IStyle } from '@/interfaces/genres/IStyle'

const API_URL = '/api/'

export default {
  getStyles (): Promise<IStyle[]> {
    return fetch(API_URL + 'styles/')
      .then(response => response.json())
  },
  getStyle (id: number): Promise<IStyle> {
    return fetch(API_URL + 'styles/' + id + '/')
      .then(response => response.json())
  },
  createStyle (style: FormData): Promise<IStyle> { // Change IStyle to FormData
    return fetch(API_URL + 'styles/', {
      method: 'POST',
      body: style // Remove Content-Type header for FormData
    }).then(response => response.json())
  },
  updateStyle (id: number, style: IStyle): Promise<IStyle> {
    return fetch(API_URL + 'styles/' + id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(style)
    }).then(response => response.json())
  },
  deleteStyle (id: number): Promise<void> {
    return fetch(API_URL + 'styles/' + id + '/', {
      method: 'DELETE'
    }).then(response => response.json())
  }
}
