<template>
  <div>
    <b-container>
      <b-row align-h="center">
        <b-pagination v-model="currentPage"
                      :total-rows="favoriteEvents.length"
                      :per-page="page.size"/>
      </b-row>
    </b-container>
    <events-list :events="displayedEvents" :favoritesMode="true" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { BContainer, BRow, BPagination } from 'bootstrap-vue';
import EventsList from '../components/EventsList.vue';

export default {
  name: 'favorites',
  components: {
    EventsList, BContainer, BRow, BPagination,
  },
  data: () => ({
    currentPage: 1,
  }),
  computed: {
    ...mapState(['favoriteEvents', 'page']),
    numberOfPages() {
      return Math.ceil(this.favoriteEvents.length / this.page.size);
    },
    displayedEvents() {
      return this.favoriteEvents.slice((this.currentPage - 1) * this.page.size,
        (this.currentPage * this.page.size) - 1);
    },
  },
  methods: {
  },
};
</script>
