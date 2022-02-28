export const state = () => ({
  searchResults: [],
  searchTerm: '',
})

export const mutations = {
  SET_SEARCH_TERM(state, payload) {
    state.searchTerm = payload
  },
  SET_SEARCH_RESULTS(state, payload) {
    state.searchResults = [...payload]
  },
}

export const actions = {
  SET_SEARCH_TERM({ commit }, payload) {
    commit('SET_SEARCH_TERM', payload)
  },
  SET_SEARCH_RESULTS({ commit }, payload) {
    commit('SET_SEARCH_RESULTS', payload)
  },
}
