<script setup>
import UploadAct from "./qs-upload-act.vue";
import TableList from "./table-list.vue";
</script>

<template>
  <div class="q-pa-md">
    <div>
      <upload-act />
    </div>
    <div class="q-mt-lg">
      <q-breadcrumbs gutter="sm">
        <q-breadcrumbs-el label="All files" />
        <q-breadcrumbs-el label="test" to="/drive/test" />
      </q-breadcrumbs>
    </div>
    <div class="q-mt-md">
      <table-list />
    </div>
  </div>
</template>

<script>
export default {
  data() {},
  computed: {},
  // activated() {},
  updated() {
    console.log("updated", this.$route.path);
  },
  created() {
    console.log("created");
    console.log(this.$bucket);
  },
  methods: {
    onUpload(e) {
      console.log(e);
    },
  },
};
</script>