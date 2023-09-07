<script setup>
import UploadAct from './qs-upload-act.vue'
import TableList from './table-list.vue'
import FilePreview from './qs-preview.vue'
</script>

<template>
  <div class="q-pa-md">
    <div>
      <upload-act />
    </div>
    <div class="q-mt-lg">
      <q-breadcrumbs gutter="sm">
        <q-breadcrumbs-el label="All files" to="/drive" />
        <q-breadcrumbs-el v-for="it in breadLinks" :key="it.to" :label="it.label" :to="it.to" />
      </q-breadcrumbs>
    </div>
    <div class="q-mt-md">
      <table-list :rows="objList" :loading="objLoading" @row-click="onRow" />
    </div>
  </div>
  <q-dialog v-model="showPreview" transition-show="slide-up" transition-hide="jump-up">
    <q-card class="full-width" style="max-width: 900px">
      <file-preview :list="fileList" :current="fileIdx"></file-preview>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      bucketName: null,
      objList: [],
      objLoading: false,
      showPreview: false,
      fileIdx: -1,
    }
  },
  computed: {
    path() {
      return this.$route.path
    },
    breadLinks() {
      let arr = this.path.split('/').slice(1)
      let to = '/' + arr[0]
      arr.splice(0, 1)
      return arr.map((seg) => {
        to += '/' + seg
        console.log(to)
        return {
          label: seg,
          to,
        }
      })
    },
    fileList() {
      return this.objList.filter((it) => !it.prefix)
    },
  },
  // activated() {},
  updated() {
    // console.log('updated', this.path)
  },
  created() {
    this.initBucket()
  },
  watch: {
    path() {
      if (this.$bucket.client) this.getList()
    },
  },
  methods: {
    onRow({ row }) {
      this.fileIdx = this.fileList.findIndex((it) => it.url == row.url)
      this.showPreview = true
      console.log(this.fileIdx)
    },
    onUpload(e) {
      console.log(e)
    },
    async initBucket() {
      try {
        if (localStorage.testKey) {
          this.$bucket.setClient(localStorage.testKey, localStorage.testSecret)
          this.bucketName = '4ever-web'
          this.objLoading = true
          await this.checkBucket()
          await this.getList()
        }
      } catch (error) {
        console.log(error)
        // window.$alert(error.message)
      }
      this.objLoading = false
    },
    async getList() {
      try {
        let Prefix = this.path.split('/').slice(2).join('/')
        if (Prefix) Prefix += '/'
        this.objLoading = true
        const data = await this.$bucket.listObjects({
          Bucket: this.bucketName,
          Prefix,
        })
        this.objList = data.rows
      } catch (error) {
        console.log(error)
      }
      this.objLoading = false
    },
    async checkBucket() {
      const list = await this.$bucket.listBuckets()
      if (!list.find((it) => it.Name == this.bucketName)) {
        await this.$bucket.createBucket(this.bucketName)
      }
    },
  },
}
</script>