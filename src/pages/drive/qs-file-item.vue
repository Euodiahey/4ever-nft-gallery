<template>
  <el-dialog v-model="showPop">
    <!-- iframe to preview <iframe src="" frameborder="0"></iframe> -->
    <q-carousel
      v-model="curIdx"
      transition-prev="jump-right"
      transition-next="jump-left"
      swipeable
      animated
      control-color="white"
      prev-icon="arrow_left"
      next-icon="arrow_right"
      navigation-icon="radio_button_unchecked"
      navigation
      padding
      arrows
      height="300px"
      class="bg-purple text-white shadow-1 rounded-borders"
    >
      <q-carousel-slide name="style" class="column no-wrap flex-center">
        <q-icon name="style" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="column no-wrap flex-center">
        <q-icon name="live_tv" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
    </q-carousel>
  </el-dialog>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      showPop: true,
      curIdx: 0,
      lorem: 'test data'
    }
  }
}
</script>