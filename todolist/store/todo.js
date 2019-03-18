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
    let index = state.todos.findIndex(todo => todo.id == payload.id)
    state.todos[index] = payload
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
  async createtodo({ commit }, todo) {
    await commit('inserttodo', todo)
  },
  async updatetodo({ commit }, todo) {
    commit('updatetodo', todo)
  },
  async deletetodo({ commit }, todo) {
    commit('deletetodo', todo)
  }
}

