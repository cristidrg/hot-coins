export const state = () => ({
  favoriteCoinIds: [], // by id
  sortColumn: null,
  sortAscending: true,
})

export const mutations = {
  SET_FAVORITE_COIN_IDS(state, payload) {
    state.favoriteCoinIds = [...payload]
  },
  SET_SORT_COLUMN(state, payload) {
    state.sortColumn = payload
  },
  SET_SORT_ASCENDING(state, payload) {
    state.sortAscending = payload
  },
}

export const actions = {
  TOGGLE_FAVORITE_COIN_ID({ commit, state, getters }, payload) {
    if (getters.GET_COIN_FAVORITE_STATUS(payload)) {
      commit(
        'SET_FAVORITE_COIN_IDS',
        state.favoriteCoinIds.filter((id) => id !== payload)
      )
    } else {
      commit('SET_FAVORITE_COIN_IDS', [payload, ...state.favoriteCoinIds])
    }
  },
  SET_SORT_PARAMS({ commit }, payload) {
    commit('SET_SORT_COLUMN', payload.sortColumn)
    commit('SET_SORT_ASCENDING', payload.sortAscending)
  },
}

export const getters = {
  GET_COIN_FAVORITE_STATUS: (state) => (coinId) => {
    return state.favoriteCoinIds.includes(coinId)
  },
}
