<script setup>
import UploadBtn from "./qs-upload-btn.vue";
</script>

<template>
  <div>
    <div class="al-c">
      <upload-btn @files="onFiles" :allow-drop="showPop && !uploading" />
      <q-btn
        class="ml-1"
        icon="upload"
        size="12px"
        round
        flat
        @click="showPop = true"
      >
        <div>
          <!-- <q-spinner-hourglass color="primary" size="1em" /> -->
        </div>
        <q-badge
          color="red"
          rounded
          floating
          :label="files.length"
          v-show="!isEmpty"
        />
      </q-btn>
    </div>
    <q-dialog v-model="showPop" position="top">
      <q-card class="full-width" style="max-width: 600px">
        <q-card-section class="pos-s top-0 bg-white z-10">
          <div class="text-h6">Upload</div>
        </q-card-section>

        <q-card-section>
          <div class="ta-c" v-show="isEmpty">
            <upload-icon></upload-icon>
            <p class="mt-5">Drop or Paste files to upload</p>
          </div>

          <q-item v-for="it in files" :key="it.name">
            <q-item-section avatar>
              <q-circular-progress
                :value="0"
                size="26px"
                color="orange"
                track-color="grey-3"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ it.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-card-actions
          v-show="!isEmpty"
          align="right"
          class="text-primary pos-s btm-0 bg-white"
        >
          <q-btn
            no-caps
            flat
            label="Cancel"
            v-close-popup
            @click="files = []"
          />
          <q-btn color="primary">OK</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      showPop: false,
      uploading: false,
    };
  },
  computed: {
    isEmpty() {
      return !this.files.length;
    },
  },
  methods: {
    onFiles(e) {
      console.log(e);
      this.files = e;
      this.showPop = true;
    },
    getTree() {
      // const arr = name.split("/");
      arr.unshift("");
      //  a/b.png
      let pre = "";
      for (const i in arr) {
        const val = arr[i];
        if (i == arr.length - 1) {
        } else {
          const cid = pre + "/" + val;
          if (list.filter((it) => it.cid == cid).length == 0) {
            list.push({
              cid,
              pid: pre,
              value: cid,
              label: val,
            });
          }
          pre = cid;
        }
      }
    },
  },
};
</script>