<template>
  <!-- iframe to preview <iframe src="" frameborder="0"></iframe> -->
  <q-carousel
    swipeable
    animated
    transition-prev="slide-right"
    transition-next="slide-left"
    arrows
    v-model="slide"
    v-model:fullscreen="fullscreen"
    infinite
    height="80vh"
  >
    <q-carousel-slide name="0" class="column no-wrap flex-center bg-80">
      <iframe
        class="wh100p"
        src="http://127.0.0.1:5174/pdf?src=https://qs3.4everland.store/test2.pdf"
        frameborder="0"
      ></iframe>
      <!-- <q-scroll-area class="fit">
        <div class="q-pa-lg">
          <p v-for="i in 30" :key="i">{{ i }}</p>
        </div>
      </q-scroll-area> -->
    </q-carousel-slide>
    <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
    <q-carousel-slide :name="2" class="column no-wrap flex-center bg-80">
      <iframe
        class="wh100p"
        src="/preview/code.html?src=https://4ever-web.4everland.store/github/markmap.html"
        frameborder="0"
      ></iframe>
    </q-carousel-slide>
    <q-carousel-slide :name="3" class="column no-wrap flex-center bg-80">
      <iframe
        class="wh100p"
        src="/preview/code.html?src=https://memory.4everland.store/bin/bucket.js"
        frameborder="0"
      ></iframe>
    </q-carousel-slide>
    <q-carousel-slide :name="4" class="column no-wrap flex-center bg-80">
      <iframe
        class="wh100p"
        src="/preview/code.html?src=https://memory.4everland.store/card.json"
        frameborder="0"
      ></iframe>
    </q-carousel-slide>
    <template v-slot:control>
      <q-carousel-control position="bottom-left" :offset="[18, 18]">
        <div class="pa-2 bg-black-3 white">{{ slide }}/{{ 5 }}</div>
      </q-carousel-control>
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