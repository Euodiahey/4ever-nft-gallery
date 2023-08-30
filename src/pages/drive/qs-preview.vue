<template>
  <!-- iframe to preview <iframe src="" frameborder="0"></iframe> -->
  <q-carousel
    swipeable
    animated
    arrows
    v-model="slide"
    v-model:fullscreen="fullscreen"
    navigation
    infinite
    height="70vh"
  >
    <q-carousel-slide name="style" class="column no-wrap flex-center bg-black white">
      <q-icon name="style" size="56px" />
      <div class="q-mt-md text-center">
        {{ lorem }}
      </div>
    </q-carousel-slide>
    <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
    <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
    <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
    <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
    <template v-slot:control>
      <q-carousel-control position="bottom-right" :offset="[18, 18]">
        <q-btn
          push
          round
          dense
          color="white"
          text-color="primary"
          :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="fullscreen = !fullscreen"
        />
      </q-carousel-control>
    </template>
  </q-carousel>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      slide: 1,
      fullscreen: false,
      lorem: 'test data'
    }
  }
}
</script>