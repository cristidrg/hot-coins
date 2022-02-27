export default {
  getMarkets({ currency, perPage }) {
    return fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}${
        perPage ? '&per_page' + perPage : ''
      }`
    ).then((res) => res.json())
  },
}
