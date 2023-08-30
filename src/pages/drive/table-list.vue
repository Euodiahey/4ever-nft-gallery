<style lang="scss">
.q-tr {
  cursor: pointer;
  .active {
    background: rgb(174 216 231 / 8%);
  }
}
</style>

<template>
  <q-table
    :loading="loading"
    flat
    tabindex="0"
    :rows="rows"
    :columns="columns"
    row-key="name"
    selection="multiple"
    v-model:selected="selected"
    v-model:pagination="pagination"
    :filter="filter"
  >
    <template #body="scope">
      <q-tr
        :class="{
          active: activeIdx == scope.rowIndex
        }"
        :props="scope"
        @click="onRow(scope.row, scope.rowIndex)"
      >
        <q-td>
          <q-checkbox color="grey-8" v-model="scope.selected" />
        </q-td>
        <q-td key="name">
          <div class="al-c">
            <q-icon
              :color="getIcon(scope.row).color"
              :name="getIcon(scope.row).name"
              size="20px"
              class="mr-2"
              v-if="getIcon(scope.row)"
            ></q-icon>
            <span class="fz-15">{{ scope.row.name }}</span>
          </div>
        </q-td>
        <q-td key="lastModified">
          {{ scope.row.updatedAt }}
        </q-td>
        <q-td key="size">
          {{ scope.row.sizeUnit }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <!-- <q-drawer show-if-above v-model="showPop" side="right" bordered>
    <div class="pos-s top-0">
      <div>File Info</div>
      <p v-for="i in 10" :key="i">{{ i }}</p>
    </div>
  </q-drawer> -->
</template>

<script>
export default {
  props: {
    rows: Array,
    loading: Boolean
  },
  data() {
    return {
      filter: '',
      selected: [],
      pagination: {
        rowsPerPage: 30
      },
      columns: [
        {
          name: 'Key',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          // field: (row) => row.name,
          // format: (val) => `${val}`,
          sortable: true
        },
        {
          name: 'updatedAt',
          align: 'left',
          label: 'Update Time',
          field: 'lastModified',
          sortable: true
        },
        { name: 'size', align: 'left', label: 'Size', field: 'size', sortable: true }
      ],
      showPop: false,
      activeIdx: -1
    }
  },
  methods: {
    getIcon(row) {
      if (row.prefix)
        return {
          name: 'folder',
          color: 'orange'
        }
      const type = /\.(\w+)$/.exec(row.name)[1]
      let name = 'description'
      let color = 'blue'
      if (/js|htm|css|java|vue|json/.test(type)) {
        name = 'code'
      } else if (/png|jpg|jpeg|svg|gif|bmp|ico/.test(type)) {
        name = 'image'
      } else if (/mp3/.test(type)) {
        name = 'headphones'
      } else if (/mp4|avi/.test(type)) {
        name = 'videocam'
      }
      return {
        name,
        color
      }
    },
    onRow(row, idx) {
      if (row.prefix) {
        this.$router.push(this.$route.path + '/' + row.name)
        return
      }
      this.showPop = true
      // this.activeIdx = this.activeIdx == idx ? -1 : idx
    }
  }
}
</script>
