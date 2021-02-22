<template>
  <base-card>
    <h2>Find your coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="setFilter" />Frontend
      <label for="frontend"></label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="setFilter" />Backend
      <label for="backend"></label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="setFilter" />Career
      <label for="career"></label>
    </span>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      }
    };
  },
  methods: {
    setFilter({ target }) {
      const inputId = target.id
      const isActive = target.checked
      const updatedFilters = {
        ...this.filters, // using spread operator to copy the `filters` data property here to make changes
        [inputId]: isActive
      }
      this.filters = updatedFilters
      this.$emit('change-filter', updatedFilters);
    }
  },
  emits: ['change-filter']
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>