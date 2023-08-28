<template>
  <div class="">
    <q-table
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
  </div>
</template>

<script>
const columns = [
  {
    name: "desc",
    required: true,
    label: "File Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "updateAt",
    align: "left",
    label: "Update Time",
    field: "updateAt",
    sortable: true,
  },
  { name: "size", label: "Size", field: "size" },
];

const rows = [
  {
    id: 1,
    name: "Frozen Yogurt",
    updateAt: "2022-8-22",
    size: "100mb",
  },
];

export default {
  data() {
    return {
      filter: "",
      selected: [],
      pagination: {},

      columns,
      rows,
    };
  },
};
</script>
