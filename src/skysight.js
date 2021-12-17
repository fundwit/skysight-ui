import axios from 'axios'
import adapter from 'axios/lib/adapters/http'

axios.defaults.adapter = adapter
axios.defaults.withCredentials = true

export class SkysightClient {
  constructor (url) {
    if (url === undefined || url === '') {
      url = process.env.API_BASE_URL
    }
    if (url === undefined) {
      url = ''
    }

    if (url.endsWith('/')) {
      url = url.substr(0, url.length - 1)
    }
    this.url = url
  }

  withPath (path) {
    if (!path.startsWith('/')) {
      path = '/' + path
    }
    return `${this.url}${path}`
  }

  async queryRepositories () {
    return axios.get(this.withPath(`/v1/repositories`), {})
      .then(r => r.data)
  }

  async detailRepository (id) {
    return axios.get(this.withPath(`/v1/repositories/${id}`), {})
      .then(r => r.data)
  }

  async createRepository (creationForm) {
    return axios.post(this.withPath('/v1/repositories'), creationForm).then(r => r.data)
  }

  async updateRepository (id, workflowChanges) {
    return axios.put(this.withPath('/v1/repositories/' + id), workflowChanges)
  }

  async deleteRepository (id) {
    return axios.delete(this.withPath('/v1/repositories/' + id), {})
  }
}

export const skysight = new SkysightClient('/api')
export default skysight
