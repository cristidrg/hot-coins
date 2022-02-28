<template>
  <div class="fr-heading">
    <h1 class="fr-heading__text text-4xl font-bold">
      The hottest 100 coins on the crypto market
    </h1>
    <p class="fr-heading__kicker text-base font-medium text-grey">powered by</p>
    <div class="fr-heading__logos">
      <img src="../assets/images/coingecko-logo.webp" />
      <img src="../assets/images/fractional-logo.svg" />
      <img src="../assets/images/cristiansoft-logo.svg" />
    </div>
  </div>
</template>

<style lang="scss">
.fr-heading {
  display: flex;
  flex-direction: column;
  align-items: center;

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

  &__kicker {
    margin-top: 2rem;
  }

  &__logos {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin-top: 1.5rem;
  }

  &__logos > img {
    opacity: 0.8;
    filter: grayscale(1);
    height: 45px;
    width: auto;
  }
}
</style>
