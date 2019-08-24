import axios from 'axios'

export function logout () {
  axios.post('/api/logout')
    .then(() => {
      window.location.reload()
    })
}
