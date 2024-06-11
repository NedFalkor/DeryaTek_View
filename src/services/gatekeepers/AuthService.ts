import { ICustomUser } from '@/interfaces/gatekeepers/ICustomUser'

const API_URL = '/api/auth/'

export default {
  login (user: Partial<ICustomUser>): Promise<any> {
    return fetch(API_URL + 'login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json())
  },
  logout (): Promise<any> {
    return fetch(API_URL + 'logout/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
  },
  deleteAccount (): Promise<any> {
    return fetch(API_URL + 'delete_account/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
  }
}
