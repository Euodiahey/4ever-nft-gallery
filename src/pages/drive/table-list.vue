<template>
  <div class="">
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
      @row-click="onRow"
    >
      <!-- <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template> -->
    </q-table>
    <q-drawer show-if-above v-model="showPop" side="right" bordered>
      <div>File Info</div>
    </q-drawer>
  </div>
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
          name: 'updateAt',
          align: 'left',
          label: 'Update Time',
          field: 'updatedAt',
          sortable: true
        },
        { name: 'size', label: 'Size', field: 'sizeUnit' }
      ],
      showPop: false
    }
  },
  methods: {
    onRow(_, row) {
      if (row.prefix) {
        this.$router.push(this.$route.path + '/' + row.name)
        return
      }
      this.showPop = true
    }
  }
}
</script>
