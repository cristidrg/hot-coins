<template>
  <div>
    <input
      placeholder="Search"
      :value="searchTerm"
      @input="(e) => onSearch(e.target.value)"
    />
    <table class="ml-10">
      <tr>
        <th></th>
        <th @click="() => onHeadingClick('market_cap_rank')">#</th>
        <th @click="() => onHeadingClick('name')">Coin Name</th>
        <th @click="() => onHeadingClick('symbol')">Symbol</th>
        <th @click="() => onHeadingClick('current_price')">Price</th>
        <th @click="() => onHeadingClick('market_cap')">Market Cap</th>
      </tr>
      <tr v-for="coin in coinsToDisplay" :key="coin.id">
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
import { sortBy } from 'lodash'
import { mapState, mapActions, mapGetters } from 'vuex'
import HeartToggle from '@/components/HeartToggle'

export default {
  name: 'IndexPage',
  components: {
    HeartToggle,
  },
  computed: {
    ...mapState('content', ['coinList']),
    ...mapState('search', ['searchTerm', 'searchResults']),
    ...mapState('preferences', [
      'favoriteCoinIds',
      'sortColumn',
      'sortAscending',
    ]),
    ...mapGetters('preferences', ['GET_COIN_FAVORITE_STATUS']),
    coinsToDisplay() {
      let result = this.coinList

      if (this.searchResults.length > 0) {
        result = this.searchResults.map((el) =>
          result.find((coin) => coin.id === el.ref)
        )
      }

      if (this.sortColumn) {
        let sortedList = sortBy(result, [this.sortColumn])
        if (this.sortAscending) {
          sortedList = sortedList.reverse()
        }

        return sortedList
      }

      return result
    },
  },
  methods: {
    ...mapActions('preferences', [
      'TOGGLE_FAVORITE_COIN_ID',
      'SET_SORT_PARAMS',
    ]),
    ...mapActions('search', ['SEARCH', 'SET_SEARCH_TERM']),
    onSearch(query) {
      this.SET_SEARCH_TERM(query)
      this.SEARCH(query)
    },
    onHeadingClick(newSortColumn) {
      if (this.sortColumn === newSortColumn) {
        this.SET_SORT_PARAMS({
          sortColumn: newSortColumn,
          sortAscending: !this.sortAscending,
        })
      } else {
        this.SET_SORT_PARAMS({
          sortColumn: newSortColumn,
          sortAscending: true,
        })
      }
    },
  },
}
</script>
