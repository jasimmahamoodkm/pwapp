<template>
  <ion-slides :options="slideOpts">
    <ion-slide>
      <div class="slide">
        <img src="../../slider/1.jpg" />
        <h2>Welcome</h2>
      </div>
    </ion-slide>

    <ion-slide>
      <img src="../../slider/2.jpg" />
      <h2>What is Ionic?</h2>
    </ion-slide>

    <ion-slide>
      <img src="../../slider/3.jpg" />
      <h2>What is Appflow?</h2>
    </ion-slide>

    <ion-slide>
      <img src="../../slider/4.jpg" />
      <h2>Ready to Play?</h2>
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
ion-slides {
  height: 100%;
}

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
