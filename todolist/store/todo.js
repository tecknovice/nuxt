export const state = () => ({
  todos: [],
  todo: {}
})
export const mutations = {
  inserttodos(state, payload) {
    state.todos = payload
  },
  inserttodo(state, payload) {
    state.todo = payload
    state.todos.push(payload)
  },
  updatetodo(state, payload) {
    state.todo = payload
  },
  deletetodo(state, payload) {
    state.todo = {}
    let index = state.todos.findIndex(todo => todo.id == payload.id)
    state.todos.splice(index, 1)
  }
}

export const actions = {
  async inserttodos({ commit }, todos) {
    await commit('inserttodos', todos)
  },
  async inserttodo({ commit }, todoId) {
    await commit('inserttodo', response.data)
  },
  async createtodo({ commit }, todo) {
    await commit('inserttodo', response.data)
  },
  async updatetodo({ commit }, todo) {
    commit('updatetodo', response.data)
  },
  async deletetodo({ commit }, todo) {
    commit('deletetodo', todo)
  }
}

