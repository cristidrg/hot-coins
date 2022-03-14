<template>
  <div class="fr-table">
    <SearchBox class="fr-table__search" />
    <div class="fr-table__container bg-white border-lightgrey">
      <table class="fr-table__entity text-xs lg:text-base">
        <thead>
          <tr class="fr-table__header-row border-lightgrey font-light">
            <th
              v-for="(column, columnIdx) in columns"
              :key="columnIdx"
              @click="() => onHeadingClick(column.key)"
            >
              <div
                :class="{
                  'fr-table__header-row-cell--active': sortColumn == column.key,

                  'fr-table__header-row-cell--active-reverse':
                    sortColumn == column.key && !sortAscending,
                }"
              >
                {{ column.label }}<Caret />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <client-only>
            <template #placeholder>
              <tr
                v-for="(entry, idx) in Array.from(Array(100).keys())"
                :key="idx"
                class="fr-table__body-row fr-table__body-row--placeholder text-left font-light"
              >
                <td
                  class="w-2/12"
                  v-for="(column, columnIdx) in columns"
                  :key="columnIdx"
                />
              </tr>
            </template>
            <tr
              v-for="(coin, coinIdx) in coinsToDisplay"
              :key="coinIdx"
              class="fr-table__body-row text-left font-light"
            >
              <td class="w-2/12">{{ coin.market_cap_rank }}</td>
              <td class="w-2/12">
                <div>
                  <img
                    :srcset="`
                    https://res.cloudinary.com/dpvqe9t6l/image/fetch/f_auto,w_25,q_70/${coin.image} 1x,
                    https://res.cloudinary.com/dpvqe9t6l/image/fetch/f_auto,w_50,q_70/${coin.image} 2x
                `"
                  />{{ coin.symbol }}
                </div>
              </td>
              <td class="w-2/12">{{ coin.name }}</td>
              <td class="w-2/12">{{ formatPrice(coin.current_price) }}</td>
              <td class="w-2/12">
                ${{
                  aveta(coin.market_cap, {
                    precision: 3,
                    space: true,
                    separator: ',',
                  })
                }}
              </td>
              <td class="w-2/12 text-start">
                <HeartToggle
                  :favorited="GET_COIN_FAVORITE_STATUS(coin.id)"
                  @toggle="() => TOGGLE_FAVORITE_COIN_ID(coin.id)"
                />
              </td>
            </tr>
          </client-only>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { sortBy } from 'lodash'
import aveta from 'aveta'
import { mapState, mapActions, mapGetters } from 'vuex'
import SearchBox from '@/components/SearchBox'
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
    SearchBox,
    HeartToggle,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  computed: {
    ...mapState('content', ['coinList']),
    ...mapState('search', ['searchResults']),
    ...mapState('preferences', [
      'favoriteCoinIds',
      'sortColumn',
      'sortAscending',
    ]),
    ...mapGetters('preferences', ['GET_COIN_FAVORITE_STATUS']),
    columns() {
      return [
        {
          key: 'market_cap_rank',
          label: 'Rank',
        },
        {
          key: 'symbol',
          label: 'Symbol',
        },
        {
          key: 'name',
          label: 'Coin Name',
        },
        {
          key: 'current_price',
          label: 'Price',
        },
        {
          key: 'market_cap',
          label: 'Market Cap',
        },
        {
          key: 'favorite',
          label: 'Favorite',
        },
      ]
    },
    coinsToDisplay() {
      let result = this.coinList

      if (this.searchResults !== null && this.searchResults.length > 0) {
        result = this.searchResults.map((el) =>
          result.find((coin) => coin.id === el.ref)
        )
      }

      if (this.sortColumn) {
        let sortedList

        if (this.sortColumn === 'favorite') {
          sortedList = [
            ...this.favoriteCoinIds.map((el) =>
              result.find((entry) => entry.id === el)
            ),
          ]
        } else {
          sortedList = sortBy(result, [this.sortColumn])
        }

        if (this.sortAscending) {
          sortedList = sortedList.reverse()
        }

        return sortedList
      }

      return result
    },
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions('preferences', [
      'TOGGLE_FAVORITE_COIN_ID',
      'SET_SORT_PARAMS',
    ]),
    aveta,
    formatPrice(price) {
      const formattedPrice = format(price)

      return formattedPrice === '$0.00' ? '$' + price : formattedPrice
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
    padding: 1rem 0 0;
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

  &__search {
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
      fill: #009dff;
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

  &__body-row > td:last-child {
    padding-left: 25px;
  }
}

.fr-search {
  position: relative;
  z-index: 5;
}
</style>
