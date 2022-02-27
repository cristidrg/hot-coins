export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('content/GET_COIN_DATA')
  },
}
