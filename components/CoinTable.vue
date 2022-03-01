<template>
  <div class="fr-table">
    <div class="fr-table__search-holder">
      <p
        class="fr-table__search-status text-sm lg:text-base"
        :class="{
          'fr-table__search-status--interactable': searchResults.length > 0,
        }"
        @click="() => searchResults.length > 0 && SET_SEARCH_RESULTS(null)"
        v-if="searchResults !== null"
      >
        {{ searchResults.length === 0 ? 'No results found' : 'Clear  Results' }}
      </p>
      <label class="sr-only" for="coinSearch" @click="SEARCH(searchTerm)"
        >Search</label
      >
      <input
        id="coinSearch"
        class="fr-table__search text-sm lg:text-base"
        placeholder="Search"
        :value="searchTerm"
        @input="(e) => onSearch(e.target.value)"
        @keydown.enter="SEARCH(searchTerm)"
      />
    </div>
    <div class="fr-table__container bg-white border-lightgrey">
      <table class="fr-table__entity text-xs lg:text-base">
        <thead>
          <tr class="fr-table__header-row border-lightgrey font-light">
            <th @click="() => onHeadingClick('market_cap_rank')">
              <div
                :class="{
                  'fr-table__header-row-cell--active':
                    sortColumn == 'market_cap_rank',

                  'fr-table__header-row-cell--active-reverse':
                    sortColumn == 'market_cap_rank' && !sortAscending,
                }"
              >
                Rank<Caret />
              </div>
            </th>
            <th @click="() => onHeadingClick('symbol')">
              <div
                :class="{
                  'fr-table__header-row-cell--active': sortColumn == 'symbol',
                  'fr-table__header-row-cell--active-reverse':
                    sortColumn == 'symbol' && !sortAscending,
                }"
              >
                Symbol <Caret />
              </div>
            </th>
            <th @click="() => onHeadingClick('name')">
              <div
                :class="{
                  'fr-table__header-row-cell--active': sortColumn == 'name',
                  'fr-table__header-row-cell--active-reverse':
                    sortColumn == 'name' && !sortAscending,
                }"
              >
                Coin Name <Caret />
              </div>
            </th>
            <th @click="() => onHeadingClick('current_price')">
              <div
                :class="{
                  'fr-table__header-row-cell--active':
                    sortColumn == 'current_price',
                  'fr-table__header-row-cell--active-reverse':
                    sortColumn == 'current_price' && !sortAscending,
                }"
              >
                Price <Caret />
              </div>
            </th>
            <th @click="() => onHeadingClick('market_cap')">
              <div
                :class="{
                  'fr-table__header-row-cell--active':
                    sortColumn == 'market_cap',
                  'fr-table__header-row-cell--active-reverse':
                    sortColumn == 'market_cap' && !sortAscending,
                }"
              >
                Market Cap<Caret />
              </div>
            </th>
            <th class="text-center">Favorite</th>
          </tr>
        </thead>
        <client-only>
          <template #placeholder>
            <tbody>
              <tr
                v-for="(entry, idx) in Array.from(Array(100).keys())"
                :key="idx"
                class="fr-table__body-row fr-table__body-row--placeholder text-left font-light"
              >
                <td><span class="fr-table__placeholder" /></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </template>
          <tbody>
            <tr
              v-for="coin in coinsToDisplay"
              :key="coin.id"
              class="fr-table__body-row text-left font-light"
            >
              <td>{{ coin.market_cap_rank }}</td>
              <td>
                <div>
                  <img
                    :srcset="`
                    https://res.cloudinary.com/dpvqe9t6l/image/fetch/f_auto,w_25,q_70/${coin.image} 1x,
                    https://res.cloudinary.com/dpvqe9t6l/image/fetch/f_auto,w_50,q_70/${coin.image} 2x
                `"
                  />{{ coin.symbol }}
                </div>
              </td>
              <td>{{ coin.name }}</td>
              <td>{{ formatPrice(coin.current_price) }}</td>
              <td>
                ${{
                  aveta(coin.market_cap, {
                    precision: 3,
                    space: true,
                    separator: ',',
                  })
                }}
              </td>
              <td class="text-center">
                <HeartToggle
                  :favorited="GET_COIN_FAVORITE_STATUS(coin.id)"
                  @toggle="() => TOGGLE_FAVORITE_COIN_ID(coin.id)"
                />
              </td>
            </tr>
          </tbody>
        </client-only>
      </table>
    </div>
  </div>
</template>

<script>
import { sortBy } from 'lodash'
import aveta from 'aveta'
import { mapState, mapActions, mapGetters } from 'vuex'
import HeartToggle from '@/components/HeartToggle'
import Caret from '@/assets/images/caret.svg?inline'

const { format } = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default {
  name: 'CoinTable',
  components: {
    Caret,
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

      if (this.searchResults !== null && this.searchResults.length > 0) {
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
    ...mapActions('search', ['SET_SEARCH_TERM', 'SET_SEARCH_RESULTS']),
    ...mapActions('searchIndex', ['SEARCH']),
    aveta,
    formatPrice(price) {
      const formattedPrice = format(price)

      return formattedPrice === '$0.00' ? '$' + price : formattedPrice
    },
    onSearch(query) {
      if (this.searchResults && this.searchResults.length === 0) {
        this.SET_SEARCH_RESULTS(null)
      }
      this.SET_SEARCH_TERM(query)
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
          sortAscending: false,
        })
      }
    },
  },
}
</script>

<style lang="scss">
.fr-table {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto 2.5em;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;

  &__container {
    overflow-x: scroll;
    padding: 1rem 0;
    border-width: 1px;
    transition: all 250ms ease;
    box-shadow: rgba(88, 102, 126, 0.08) 0px 4px 24px,
      rgba(88, 102, 126, 0.08) 0px 1px 2px;

    &:hover {
      box-shadow: rgba(88, 102, 126, 0.28) 0px 4px 24px,
        rgba(88, 102, 126, 0.28) 0px 1px 2px;
    }

    @media (min-width: 1000px) {
      overflow: hidden;
      border-radius: 0.75rem;
    }
  }

  &__search {
    background: #f7f7f7;
    border: 2px solid #a9ed4a;
    border-radius: 5px;
    width: 180px;
    padding: 8px 15px 8px 42px;
    box-shadow: rgba(88, 102, 126, 0.1) 0px 4px 24px,
      rgba(88, 102, 126, 0.1) 0px 1px 2px;

    @media (min-width: 1000px) {
      width: 210px;
    }
  }

  &__search-status {
    position: absolute;
    right: 50px;
    top: 10px;
    transition: color 175ms ease;

    @media (min-width: 1000px) {
      left: -140px;
      right: initial;
    }

    &--interactable {
      cursor: pointer;

      &:hover {
        color: #a9ed4a;
      }
    }
  }

  &__body-row--placeholder > td {
    align-items: center;
    justify-content: center;

    &:after {
      display: block;
      content: ' ';
      width: 50%;
      border-radius: 10px;
      height: 20px;
      background: #e2e2e2;
    }
  }

  &__search-holder {
    position: relative;
    display: flex;
    align-items: flex-start;
    margin-left: 20px;
    margin-bottom: 20px;

    @media (min-width: 1000px) {
      display: inline-block;
      margin-left: auto;
      margin-bottom: 20px;
    }

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

  &__header-row {
    text-align: left;
    border-bottom-width: 1px;
  }

  &__header-row > th {
    background: white;
    z-index: 10;
    padding-bottom: 10px;
    border-bottom: 2px solid #e1e1e1;
    height: 40px;
    font-weight: 400;
    cursor: pointer;
    transform: color 200ms ease;

    &:first-child {
      padding-left: 25px;
    }

    &:hover {
      color: #5b5b5b;
    }

    &:last-child {
      padding-right: 20px;

      @media (min-width: 1000px) {
        padding-right: 0;
      }
    }
  }

  &__header-row div {
    display: flex;
    align-items: center;
    min-width: 100px;

    @media (min-width: 1000px) {
      min-width: auto;
    }
  }

  div.fr-table__header-row-cell {
    &--active svg {
      fill: #a9ed4a;
    }

    &--active-reverse svg {
      transform: rotate(0deg);
    }
  }

  &__header-row svg {
    height: 17px;
    margin-left: 10px;
    transform: rotate(180deg);
    transition: transform 175ms ease;
  }

  &__body-row > td {
    height: 80px;
    border-bottom: 1px solid #ebebeb;
  }

  &__body-row > td div {
    display: flex;
    align-items: center;
  }

  &__body-row > td img {
    height: 25px;
    width: 25px;
    margin-right: 10px;
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

.fr-search {
  position: relative;
  z-index: 5;
}
</style>
