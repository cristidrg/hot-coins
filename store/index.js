import CoinGeckoAPI from '../integration/CoinGeckoAPI'

export const state = () => ({
  coinList: [],
  favoriteCoinIds: [], // by id
  activeSortIdx: null,
  sortDirection: null,
})

export const mutations = {
  SET_COIN_LIST(state, payload) {
    state.coinList = [...payload]
  },
  SET_FAVORITE_COIN_IDS(state, payload) {
    state.favoriteCoinIds = [...payload]
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
