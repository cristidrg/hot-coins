<template>
  <div class="fr-heading">
    <h1 class="fr-heading__text text-xl text-center lg:text-4xl font-bold">
      The hottest 100 coins on the crypto market
    </h1>
    <p class="fr-heading__kicker text-sm lg:text-base font-medium text-grey">
      powered by
    </p>
    <div class="fr-heading__logos">
      <CoinGeckoLogo />
      <FractionalLogo />
      <CristianSoftLogo />
      <NuxtLogo />
      <VercelLogo />
      <CloudinaryLogo />
    </div>
  </div>
</template>

<script>
import CoinGeckoLogo from '@/assets/images/coingecko-logo.svg?inline'
import FractionalLogo from '@/assets/images/fractional-logo.svg?inline'
import CristianSoftLogo from '@/assets/images/cristiansoft-logo.svg?inline'
import NuxtLogo from '@/assets/images/nuxt-logo.svg?inline'
import VercelLogo from '@/assets/images/vercel-logo.svg?inline'
import CloudinaryLogo from '@/assets/images/cloudinary-logo.svg?inline'

export default {
  components: {
    CoinGeckoLogo,
    FractionalLogo,
    CristianSoftLogo,
    NuxtLogo,
    VercelLogo,
    CloudinaryLogo,
  },
}
</script>

<style lang="scss">
.fr-heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 0 20px;

  @media (min-width: 1000px) {
    overflow: initial;
  }

  &__text {
    position: relative;

    &:before,
    &:after {
      display: block;
      position: absolute;
      content: '';
      animation: enter-dots 1s ease-in 1s;
      animation-fill-mode: normal;
    }

    &:before {
      width: 53px;
      height: 63px;
      background: url(/images/heading-left-dots.svg);
      top: 44px;
      left: 0;
      background-size: contain;

      @media (min-width: 1000px) {
        width: 107px;
        height: 126px;
        top: calc(50% - 62px);
        left: -200px;
      }
    }

    &:after {
      width: 51px;
      height: 52px;
      background: url('/images/heading-right-dots.svg');
      top: 43px;
      right: 3px;
      background-size: contain;

      @media (min-width: 1000px) {
        width: 122px;
        height: 124px;
        top: calc(50% - 62px);
        right: -200px;
      }
    }

    @keyframes enter-dots {
      from {
        transform: scale(0);
      }

      to {
        transform: scale(1);
      }
    }
  }

  &__kicker {
    margin-top: 4rem;

    @media (min-width: 1000px) {
      margin-top: 2rem;
    }
  }

  &__logos {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 1.5rem;
    gap: 15px;
    flex-wrap: wrap;

    @media (min-width: 1000px) {
      width: 1000px;
      flex-wrap: nowrap;
    }
  }

  &__logos > svg {
    opacity: 0.8;
    filter: grayscale(1);
    height: 30px;
    width: auto;
  }
}
</style>
