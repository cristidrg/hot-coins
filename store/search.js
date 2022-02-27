import lunr from 'lunr'

export const state = () => ({
  searchIndex: null,
  searchResults: [],
  searchTerm: '',
})

export const mutations = {
  SET_SEARCH_TERM(state, payload) {
    state.searchTerm = payload
  },
  SET_SEARCH_INDEX(state, payload) {
    state.searchIndex = payload
  },
  SET_SEARCH_RESULTS(state, payload) {
    state.searchResults = [...payload]
  },
}

export const actions = {
  INIT_SEARCH_INDEX({ rootState, commit }) {
    return commit(
      'SET_SEARCH_INDEX',
      lunr((config) => {
        config.ref('id')
        config.field('name')
        config.field('symbol')

        rootState.content.coinList.forEach((coin) => config.add(coin))
      })
    )
  },
  async SEARCH({ state, dispatch, commit }, payload) {
    if (state.searchIndex) {
      commit('SET_SEARCH_RESULTS', state.searchIndex.search(payload))
    } else {
      await dispatch('INIT_SEARCH_INDEX')
      dispatch('SEARCH', payload)
    }
  },
  SET_SEARCH_TERM({ commit }, payload) {
    commit('SET_SEARCH_TERM', payload)
  },
  SET_SEARCH_RESULTS({ commit }, payload) {
    commit('SET_SEARCH_RESULTS', payload)
  },
}
