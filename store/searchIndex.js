import lunr from 'lunr'

export const state = () => ({
  searchIndex: null,
})

export const mutations = {
  SET_SEARCH_INDEX(state, payload) {
    state.searchIndex = payload
  },
}

export const actions = {
  INIT_SEARCH_INDEX({ rootState, commit }) {
    return commit(
      'SET_SEARCH_INDEX',
      lunr((config) => {
        config.ref('id')
        config.field('name')
        config.field('symbol', { boost: true })

        rootState.content.coinList.forEach(({ id, name, symbol }) =>
          config.add({ id, name, symbol })
        )
      })
    )
  },
  async SEARCH({ state, dispatch }, payload) {
    if (!payload) {
      return dispatch('search/SET_SEARCH_RESULTS', [])
    }

    if (state.searchIndex) {
      return dispatch(
        'search/SET_SEARCH_RESULTS',
        state.searchIndex.search(payload + '~1'),
        {
          root: true,
        }
      )
    } else {
      await dispatch('INIT_SEARCH_INDEX')
      return dispatch('SEARCH', payload)
    }
  },
}
