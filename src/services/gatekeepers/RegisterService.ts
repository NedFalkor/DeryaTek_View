import { ICustomUser } from '@/interfaces/gatekeepers/ICustomUser'

const API_URL = '/api/register/'

export default {
  register (user: Partial<ICustomUser>): Promise<any> {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json())
  }
}
