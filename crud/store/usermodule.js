import axios from 'axios'
const base_url = 'http://localhost:3001'

export const state = () => ({
  users: [],
  user: {}
})

export const mutations = {
  insertUsers(state, payload) {
    state.users = payload
  },
  insertUser(state, payload) {
    state.user = payload
  },
  updateUser(state, payload) {
    state.user = payload
  },
  deleteUser(state, payload) {
    state.user = {}
    let index = state.users.findIndex(user => user.id == payload.id)
    state.users.splice(index, 1)
  }
}

export const actions = {
  async getUsers({ commit }) {
    let response = await axios.get(`${base_url}/users`)
    await commit('insertUsers', response.data)
  },
  async getUser({ commit }, userId) {
    let response = await axios.get(`${base_url}/users/${userId}`)
    await commit('insertUser', response.data)
  },
  async createUser({ commit }, user) {
    let response = await axios.post(`${base_url}/users`, user)
    await commit('insertUser', response.data)
    // response = await axios.get(`${base_url}/users`)
    // await commit('insertUsers', response.data)
  },
  async updateUser({ commit }, user) {
    let response = await axios.put(`${base_url}/users/${user.id}`, user)
    commit('updateUser', response.data)
  },
  async deleteUser({ commit }, user) {
    let response = await axios.delete(`${base_url}/users/${user.id}`)
    commit('deleteUser', user)
  }
}
