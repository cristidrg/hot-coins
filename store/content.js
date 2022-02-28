import CoinGeckoAPI from '../integration/CoinGeckoAPI'

export const state = () => ({
  coinList: [],
})

export const mutations = {
  SET_COIN_LIST(state, payload) {
    state.coinList = [...payload]
  },
}

export const actions = {
  async GET_COIN_DATA({ commit }) {
    const coinList = await CoinGeckoAPI.getMarkets({
      currency: 'usd',
      perPage: 100,
    }).map(
      ({ name, current_price, market_cap, id, image, market_cap_rank }) => ({
        name,
        current_price,
        market_cap,
        id,
        image,
        market_cap_rank,
      })
    )

    return commit('SET_COIN_LIST', coinList)
  },
}
