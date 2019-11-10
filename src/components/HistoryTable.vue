<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th> {{'HistoryTableAmount'|localize}}</th>
      <th> {{'HistoryTableDate'|localize}}</th>
      <th> {{'HistoryTableCategory'|localize}}</th>
      <th> {{'HistoryTableType'|localize}}</th>
      <th> {{'HistoryTableOpen'|localize}}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) of records" :key="record.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ record.amount | currency('UAH') }}</td>
      <td>{{ record.date | date('datetime') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span
          class="white-text badge"
          :class="[record.typeClass]"
        >
          {{ record.typeText }}
        </span>
      </td>
      <td>
        <button
          class="btn-small btn"
          @click="openRecord(record.id)"
          v-tooltip="'Посмотреть запись'"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: {
      records: {
        require: true,
        type: Array
      }
    },
    methods: {
      openRecord(id) {
        this.$router.push(`/detail-record/${id}`)
      }
    }
  }
</script>
