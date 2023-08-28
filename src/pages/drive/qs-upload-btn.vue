
<template>
  <div>
    <div class="e-upload">
      <q-btn-dropdown
        :loading="loading"
        rounded
        no-caps
        color="primary"
        split
        label="Upload File"
        @click="$refs.input.click()"
      >
        <q-list>
          <q-item clickable v-close-popup @click="$refs.input2.click()">
            <q-item-section>
              <q-item-label>Upload Folder</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>

    <div class="d-n">
      <input ref="input" multiple type="file" @input="onInput" />
      <input
        ref="input2"
        multiple
        webkitdirectory
        type="file"
        @input="onInput"
      />
    </div>
  </div>
</template>

<script>
export default {
  emits: ["files"],
  props: {
    allowDrop: Boolean,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    asMobile() {
      return this.$store.state.asMobile;
    },
  },
  mounted() {
    document.ondragover = (ev) => {
      ev.preventDefault();
    };
    document.ondrop = async (ev) => {
      ev.preventDefault();
      if (!this.allowDrop) return;
      const files = await this.scanFiles(ev.dataTransfer);
      this.getFiles(files);
    };
    document.onpaste = async (ev) => {
      if (!this.allowDrop) return;
      const files = await this.scanFiles(ev.clipboardData);
      this.getFiles(files);
    };
  },
  methods: {
    onInput(e) {
      // console.log(e);
      this.getFiles(e.target.files);
      const { input, input2 } = this.$refs;
      input.value = null;
      if (input2) input2.value = null;
    },
    onClick() {
      this.$refs.file.click();
    },
    async scanFiles(e) {
      const { items = [], files = [] } = e;
      const [item] = items;
      if (!item || !item.webkitGetAsEntry) return files;
      const entry = item.webkitGetAsEntry();
      if (!entry) return files;
      return entry.isFile ? files : this.getEntryDirectoryFiles(entry);
    },
    async getEntryDirectoryFiles(entry) {
      let res = [];
      var internalProces = (item, path, res) => {
        if (item.isFile) {
          return new Promise((resolve) => {
            item.file((file) => {
              file.path = path + file.name;
              var newFile = new File([file], file.path, { type: file.type });
              res.push(newFile);
              resolve(res);
            });
          });
        } else if (item.isDirectory) {
          return new Promise((resolve, reject) => {
            var dirReader = item.createReader();
            dirReader.readEntries(async (entries) => {
              for (let i = 0; i < entries.length; i++) {
                await internalProces(entries[i], path + item.name + "/", res);
              }
              resolve(res);
            }, reject);
          });
        }
      };
      await internalProces(entry, "", res);
      return res;
    },
    getFiles(files) {
      if (!files || !files.length) return;
      this.loading = true;
      const list = [];
      // console.log(files);
      [].slice.call(files).forEach((it) => {
        const name = it.webkitRelativePath || it.name;
        // if (arr[i] == ".DS_Store") continue;
        list.push({
          name,
          file: it,
        });
      });
      this.loading = false;
      this.onFiles(list);
    },
    onFiles(list) {
      console.log(list);
      this.$emit("files", list);
    },
  },
};
</script>