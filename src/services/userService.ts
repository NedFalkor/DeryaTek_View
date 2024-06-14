import { ICustomUser } from '@/interfaces/gatekeepers/ICustomUser'
const API_URL = '/api/'

export default {
  login (email: string, username: string, password: string): Promise<ICustomUser> {
    return fetch(`${API_URL}auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, username, password })
    }).then(response => {
      if (!response.ok) {
        throw new Error('Invalid login credentials.')
      }
      return response.json()
    })
  },

  logout (): Promise<any> {
    return fetch(`${API_URL}auth/logout/`, {
      method: 'GET'
    }).then(response => {
      if (!response.ok) {
        throw new Error('Error logging out.')
      }
      return response.json()
    })
  },

  deleteAccount (): Promise<void> {
    return fetch(`${API_URL}auth/delete_account/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error('Error deleting account.')
      }
      return response.json()
    })
  },

  register (email: string, username: string, password: string): Promise<ICustomUser> {
    return fetch(`${API_URL}register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, username, password })
    }).then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(err.error || 'Error registering user.')
        })
      }
      return response.json()
    })
  }
}
