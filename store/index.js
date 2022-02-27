import lunr from 'lunr'
import CoinGeckoAPI from '../integration/CoinGeckoAPI'

export const state = () => ({
  coinList: [],
  favoriteCoinIds: [], // by id
  activeSortIdx: null,
  searchIndex: null,
  searchResults: [],
  searchTerm: '',
  sortColumn: null,
  sortAscending: true,
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
  SET_COIN_LIST(state, payload) {
    state.coinList = [...payload]
  },
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
  SET_SEARCH_TERM({ commit }, payload) {
    commit('SET_SEARCH_TERM', payload)
  },
  SET_SEARCH_RESULTS({ commit }, payload) {
    commit('SET_SEARCH_RESULTS', payload)
  },
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
  async SEARCH({ state, dispatch, commit }, payload) {
    if (state.searchIndex) {
      commit('SET_SEARCH_RESULTS', state.searchIndex.search(payload))
    } else {
      await dispatch('INIT_SEARCH_INDEX')
      dispatch('SEARCH', payload)
    }
  },
  INIT_SEARCH_INDEX({ state, commit }) {
    return commit(
      'SET_SEARCH_INDEX',
      lunr((config) => {
        config.ref('id')
        config.field('name')
        config.field('symbol')

        state.coinList.forEach((coin) => config.add(coin))
      })
    )
  },
  async nuxtServerInit({ commit }) {
    const coinList = await CoinGeckoAPI.getMarkets({
      currency: 'usd',
      perPage: 100,
    })
    commit('SET_COIN_LIST', coinList)
  },
}

export const getters = {
  GET_COIN_FAVORITE_STATUS: (state) => (coinId) => {
    return state.favoriteCoinIds.includes(coinId)
  },
}
