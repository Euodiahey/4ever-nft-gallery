<style>
.qs-preview .q-carousel__slide {
  padding: 0;
}
.qs-preview .q-panel {
  overflow: hidden;
}
</style>

<template>
  <!-- iframe to preview <iframe src="" frameborder="0"></iframe> -->
  <q-carousel
    class="qs-preview"
    swipeable
    animated
    transition-prev="slide-right"
    transition-next="slide-left"
    arrows
    v-model="curIdx"
    v-model:fullscreen="fullscreen"
    infinite
    height="80vh"
  >
    <!-- <q-carousel-slide name="0" class="column no-wrap flex-center bg-80">
      <q-scroll-area class="fit">
        <div class="q-pa-lg">
          <p v-for="i in 30" :key="i">{{ i }}</p>
        </div>
      </q-scroll-area>
    </q-carousel-slide> -->
    <!-- <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" /> -->
    <q-carousel-slide v-for="(it, i) in list" :key="it.Key" :name="i">
      <iframe class="wh100p" :src="getUrl(it)" frameborder="0" @load="loading = false"></iframe>
      <div class="pos-center" v-show="loading">
        <icon-loading />
      </div>
    </q-carousel-slide>

    <template v-slot:control>
      <q-carousel-control position="top-left" :offset="[20, 20]">
        <div class="pa-1 bg-black-3 white">
          <span>{{ curIdx + 1 }}/{{ list.length }}</span>
          <span v-if="curItem" class="ml-1">{{ curItem.name }}</span>
        </div>
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
  props: {
    list: Array,
    current: Number,
  },
  data() {
    return {
      curIdx: this.current,
      fullscreen: false,
      loading: true,
    }
  },
  computed: {
    curItem() {
      return this.list[this.curIdx]
    },
  },
  watch: {
    current(val) {
      this.curIdx = val
    },
    curItem() {
      console.log('loading')
      this.loading = true
    },
  },
  methods: {
    onLoad() {
      console.log('iframe loaded')
    },
    getUrl(it) {
      let pre = 'http://127.0.0.1:5174/'
      pre = 'https://preview.4everland.org/'
      let url = pre + '?src=' + it.url
      if (it.size > 1024 * 100) {
        if (/\.(js|json|txt|html)$/.test(it.name)) {
          url += '&type=download'
          // url = 'http://127.0.0.1:5173/test.html?src=' + it.url
        }
      }
      return url
    },
  },
}
</script>