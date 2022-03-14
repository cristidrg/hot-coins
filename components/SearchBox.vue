<template>
  <div class="fr-searchbox">
    <label class="sr-only" for="coinSearch">Search</label>
    <SearchIcon class="fr-searchbox__search-icon" />
    <input
      id="coinSearch"
      class="fr-searchbox__search-input text-sm lg:text-base"
      placeholder="Search"
      :value="searchTerm"
      @input="(e) => onSearch(e.target.value)"
    />
  </div>
</template>

<script>
import { throttle } from 'lodash'
import { mapState, mapActions } from 'vuex'
import SearchIcon from '@/assets/images/search.svg?inline'

export default {
  components: {
    SearchIcon,
  },
  computed: {
    ...mapState('search', ['searchTerm']),
  },

  methods: {
    ...mapActions('search', ['SET_SEARCH_TERM', 'SET_SEARCH_RESULTS']),
    onSearch(inputValue) {
      if (inputValue === '') {
        this.SET_SEARCH_RESULTS(null)
      }
      this.SET_SEARCH_TERM(inputValue)
      this.throttledSearch(inputValue)
    },
    throttledSearch: throttle(function (searchQuery) {
      this.$store.dispatch('searchIndex/SEARCH', searchQuery)
    }, 300),
  },
}
</script>

<style lang="scss">
.fr-searchbox {
  &__search-icon {
    cursor: pointer;
    position: absolute;
    display: block;
    left: 13px;
    top: 9px;
    height: 25px;
    font-size: 1em;
    width: 25px;
  }

  &__search-input {
    background: #f7f7f7;
    border: 2px solid #025d96;
    border-radius: 5px;
    width: 180px;
    padding: 8px 15px 8px 42px;
    box-shadow: rgba(88, 102, 126, 0.1) 0px 4px 24px,
      rgba(88, 102, 126, 0.1) 0px 1px 2px;

    @media (min-width: 1000px) {
      width: 210px;
    }
  }
}
</style>
