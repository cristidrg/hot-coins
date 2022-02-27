<template>
  <div>
    <table class="ml-10">
      <tr>
        <th></th>
        <th>#</th>
        <th>Coin Name</th>
        <th>Symbol</th>
        <th>Price</th>
        <th>Market Cap</th>
      </tr>
      <tr v-for="coin in coinList" :key="coin.id">
        <th>
          <HeartToggle
            :favorited="GET_COIN_FAVORITE_STATUS(coin.id)"
            @toggle="() => TOGGLE_FAVORITE_COIN_ID(coin.id)"
          />
        </th>
        <th>{{ coin.market_cap_rank }}</th>
        <th>{{ coin.name }}</th>
        <th>{{ coin.symbol }}</th>
        <th>{{ coin.current_price }}</th>
        <th>{{ coin.market_cap }}</th>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import HeartToggle from '@/components/HeartToggle'

export default {
  name: 'IndexPage',
  components: {
    HeartToggle,
  },
  methods: {
    ...mapActions(['TOGGLE_FAVORITE_COIN_ID']),
  },
  computed: {
    ...mapState(['coinList', 'favoriteCoinIds']),
    ...mapGetters(['GET_COIN_FAVORITE_STATUS']),
  },
}
</script>
