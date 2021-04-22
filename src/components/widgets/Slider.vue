<template>
  <ion-slides :options="slideOpts">
    <ion-slide>
      <img alt="1" src="../../slider/1.jpg" />
    </ion-slide>
    <ion-slide>
      <img alt="2" src="../../slider/2.jpg" />
    </ion-slide>
    <ion-slide>
      <img alt="3" src="../../slider/3.jpg" />
    </ion-slide>
    <ion-slide>
      <img alt="4" src="../../slider/4.jpg" />
    </ion-slide>
  </ion-slides>
</template>
<script>
import { IonSlides, IonSlide } from "@ionic/vue";

export default {
  components: { IonSlides, IonSlide },
  setup() {
    const slideOpts = {
      initialSlide: 0,
      slidesPerView: 1,
      autoplay: true,
      speed: 1000,
    };
    return { slideOpts };
  },
};
</script>
<style>
.swiper-slide {
  display: block;
}

.swiper-slide h2 {
  margin-top: 2.8rem;
}

.swiper-slide img {
  max-height: 50%;
  max-width: 80%;
  margin: 60px 0 40px;
  pointer-events: none;
}

b {
  font-weight: 500;
}

p {
  padding: 0 40px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--ion-color-step-600, #60646b);
}

p b {
  color: var(--ion-text-color, #000000);
}
</style>
