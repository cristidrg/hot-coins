<template>
  <div class="mt-32 mx-auto flex flex-col items-center">
    <div class="fr-heading flex flex-col items-center">
      <h1 class="fr-heading__text text-4xl font-bold">
        The hottest 100 coins on the crypto market
      </h1>
      <p class="fr-heading__kicker text-base font-medium mt-8 text-grey">
        powered by
      </p>
      <div class="fr-heading__logos mt-6 flex justify-evenly w-full">
        <img src="../assets/images/coingecko-logo.webp" />
        <img src="../assets/images/fractional-logo.svg" />
        <img src="../assets/images/cristiansoft-logo.svg" />
      </div>
    </div>

    <div class="fr-table-container mt-28">
      <div class="fr-bg-wave">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 246"
          fill="none"
        >
          <path
            d="M0 0L40 37.3C80 75 160 149 240 176C320 203 400 181 480 160C560 139 640 117 720 144C800 171 880 245 960 245.3C1040 245 1120 171 1200 122.7C1280 75 1360 53 1400 42.7L1440 32V0H1400C1360 0 1280 0 1200 0C1120 0 1040 0 960 0C880 0 800 0 720 0C640 0 560 0 480 0C400 0 320 0 240 0C160 0 80 0 40 0H0Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div class="fr-table mx-auto relative z-10 mb-10 flex flex-col">
        <div class="fr-table__search-holder">
          <label class="sr-only" for="coinSearch">Search</label>
          <input
            id="coinSearch"
            class="fr-table__search"
            placeholder="Search"
            :value="searchTerm"
            @input="(e) => onSearch(e.target.value)"
          />
        </div>
        <div
          class="fr-table__container border bg-white rounded-xl py-4 border-lightgrey"
        >
          <table class="fr-table__entity">
            <thead>
              <tr
                class="fr-table__header-row text-left border-b border-lightgrey font-light"
              >
                <th @click="() => onHeadingClick('market_cap_rank')">#</th>
                <th @click="() => onHeadingClick('symbol')">Symbol</th>
                <th @click="() => onHeadingClick('name')">Coin Name</th>
                <th @click="() => onHeadingClick('current_price')">Price</th>
                <th @click="() => onHeadingClick('market_cap')">Market Cap</th>
                <th class="text-center">Favorite</th>
              </tr>
            </thead>
            <tr
              v-for="coin in coinsToDisplay"
              :key="coin.id"
              class="fr-table__body-row text-left font-light"
            >
              <td>{{ coin.market_cap_rank }}</td>
              <td>{{ coin.symbol }}</td>
              <td>{{ coin.name }}</td>
              <td>{{ coin.current_price }}</td>
              <td>{{ coin.market_cap }}</td>
              <td class="text-center">
                <HeartToggle
                  :favorited="GET_COIN_FAVORITE_STATUS(coin.id)"
                  @toggle="() => TOGGLE_FAVORITE_COIN_ID(coin.id)"
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
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

<style lang="scss">
.fr-heading {
  &__text {
    position: relative;

    &:before,
    &:after {
      display: block;
      position: absolute;
      content: '';
    }
    &:before {
      width: 107px;
      height: 126px;
      background: url('/images/heading-left-dots.svg');
      top: calc(50% - 62px);
      left: -200px;
    }

    &:after {
      width: 122px;
      height: 124px;
      background: url('/images/heading-right-dots.svg');
      top: calc(50% - 62px);
      right: -200px;
    }
  }

  &__logos > img {
    opacity: 0.8;
    filter: grayscale(1);
    height: 45px;
    width: auto;
  }
}

.fr-table {
  max-width: 1000px;
  width: 100%;

  &__container {
    transition: all 250ms ease;
    box-shadow: rgba(88, 102, 126, 0.08) 0px 4px 24px,
      rgba(88, 102, 126, 0.08) 0px 1px 2px;

    &:hover {
      box-shadow: rgba(88, 102, 126, 0.28) 0px 4px 24px,
        rgba(88, 102, 126, 0.28) 0px 1px 2px;
    }
  }

  &__search {
    background: #f7f7f7;
    border: 2px solid #a9ed4a;
    border-radius: 5px;
    width: 210px;
    padding: 8px 15px 8px 42px;
    box-shadow: rgba(88, 102, 126, 0.1) 0px 4px 24px,
      rgba(88, 102, 126, 0.1) 0px 1px 2px;
  }

  &__search-holder {
    position: relative;
    display: inline-block;
    margin-left: auto;
    margin-bottom: 20px;

    &:before {
      background: url('/images/search.svg');
      content: '';
      position: absolute;
      display: block;
      left: 13px;
      top: 9px;
      height: 25px;
      font-size: 1em;
      width: 25px;
    }
  }

  &__entity {
    width: 100%;
  }

  &__header-row > th {
    background: white;
    position: sticky;
    z-index: 10;
    top: 0;
    padding-bottom: 10px;
    border-bottom: 2px solid #e1e1e1;
    height: 40px;
    font-weight: 400;

    &:first-child {
      padding-left: 25px;
    }
  }

  &__body-row > td {
    height: 80px;
    border-bottom: 1px solid #ebebeb;
  }

  &__body-row {
    background: white;
    transition: all 125ms ease;

    &:nth-child(2n + 1) {
      background: #f7f7f7;
    }

    &:hover {
      background: #efefef;
    }
  }

  &__body-row > td:first-child {
    padding-left: 25px;
  }
}

.fr-table-container {
  position: relative;
  background: #aaed4a;
  width: 100vw;
  max-width: 100%;
}

.fr-bg-wave {
  width: 100%;
  position: absolute;
  left: 0;

  > svg {
    width: 100%;
  }
}

.fr-search {
  position: relative;
  z-index: 5;
}
</style>
