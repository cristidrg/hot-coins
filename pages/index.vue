<template>
  <div class="fr-app">
    <HeaderBanner />

    <div class="fr-table-container">
      <WaveBG class="absolute l-0" />

      <CoinTable />
    </div>
  </div>
</template>

<script>
import { sortBy } from 'lodash'
import { mapState, mapActions, mapGetters } from 'vuex'
import CoinTable from '@/components/CoinTable'
import HeaderBanner from '@/components/HeaderBanner'
import WaveBG from '@/components/WaveBG'

export default {
  name: 'IndexPage',
  components: {
    WaveBG,
    HeaderBanner,
    CoinTable,
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
  created() {
    this.$store.dispatch('content/GET_COIN_DATA')
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

<style lang="scss">
.fr-app {
  margin: 4rem auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1000px) {
    margin: 8rem auto 0;
  }
}

.fr-table-container {
  position: relative;
  background: #aaed4a;
  width: 100%;
  padding: 0 20px;
  margin-top: 7rem;
  overflow: hidden;

  @media (min-width: 1000px) {
    width: 100vw;
    max-width: 100%;
  }
}
</style>
