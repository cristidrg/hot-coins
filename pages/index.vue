<template>
  <div class="fr-app">
    <HeaderBanner />

    <div class="fr-table-container">
      <WaveBG class="fr-table-container__wave" />
      <div class="fr-table-container__content">
        <CoinTable />
      </div>
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
  background: #f8f8f8;
  padding: 4rem 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1000px) {
    padding: 8rem 0 0;
  }
}

.fr-table-container {
  position: relative;
  background: #aaed4a;
  width: 100%;
  margin-top: 7rem;
  overflow: hidden;
  min-height: 700px;

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    content: ' ';
    z-index: 1;
    display: block;
    background-image: url('/images/cryptopattern.svg');
    background-size: 25%;
    background-repeat: repeat;
    width: 100%;
    height: 100%;
    animation: enter-bg 1.75s ease-out;
    animation-fill-mode: normal;
  }

  @media (min-width: 1000px) {
    width: 100vw;
    max-width: 100%;
  }

  &__wave {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;

    animation: enter-wave 1.75s ease-out;
    animation-fill-mode: normal;
  }

  &__content {
    margin-top: 30px;
    animation: enter-table 1.75s ease-out;
    animation-fill-mode: normal;
    position: relative;
    z-index: 3;

    @media (min-width: 1000px) {
      margin-top: 0;
    }
  }
}

@keyframes enter-bg {
  from {
    transform: scale(0);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes enter-wave {
  from {
    transform: scaleX(0) translateY(-300px);
  }

  to {
    transform: scaleX(1) translateY(0px);
  }
}

@keyframes enter-table {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
