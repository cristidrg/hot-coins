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
  async asyncData({ store }) {
    await store.dispatch('content/GET_COIN_DATA')
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
