<template>
  <div>
    <b-container>
      <b-row>
        <b-col sm md lg="6">
          <b-form-group label-cols="2" label="Sort by:">
            <b-form-select class="select-sort"
                      :value="sortOption"
                      :options="sortingOptions"
                      value-field="text"
                      @change="changeSortOption"/>
          </b-form-group>
        </b-col>
        <b-col sm md lg="6">
          <b-button class="btn-segment"
          v-for="s in segments"
          :key="s"
          @click="setSegment(s)"
          :variant="s === segment ? 'primary' : 'secondary'"
          >
            {{ s }}
          </b-button>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col lg="4" sm="4" md="4">
          <b-pagination-nav :link-gen="getPageLink" :number-of-pages="page.totalPages" use-router />
        </b-col>
      </b-row>
    </b-container>
    <events-list :events="events" :favoritesMode="false"/>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import {
  BContainer, BRow, BCol, BFormGroup, BFormSelect, BButton, BPaginationNav,
} from 'bootstrap-vue';
import EventsList from '../components/EventsList.vue';

export default {
  name: 'home',
  components: {
    EventsList, BContainer, BRow, BCol, BFormGroup, BFormSelect, BButton, BPaginationNav,
  },
  data: () => ({
    segments: ['Sports', 'Music', 'Arts & Theatre', 'All'],
    sortingOptions: [
      {
        text: 'Most Popular',
      },
      {
        text: 'Distance',
      },
      {
        text: 'Name: A - Z',
      },
      {
        text: 'Name: Z - A',
      },
      {
        text: 'Date',
      },
    ],
  }),
  computed: mapState(['events', 'page', 'sortOption', 'segment']),
  methods: {
    ...mapActions(['getEventsData', 'getGeolocation']),
    ...mapMutations(['addToFavorites', 'setSortOption', 'setSegment']),
    getPageLink(pageNumber) {
      return pageNumber === 1 ? '?' : `?page=${pageNumber}`;
    },
    changeSortOption(option) {
      this.setSortOption(option);
      this.getEventsData({
        pageNumber: this.$route.query.page,
        segment: this.selectedSegment,
        sortOption: option,
      });
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    '$route.query.page': function (pageNumber) {
      this.getEventsData({
        pageNumber,
        segment: this.selectedSegment,
        sortOption: this.selectedSortOption,
      });
    },
    segment(segment) {
      this.getEventsData({ pageNumber: this.$route.query.page, segment });
    },
  },
  created() {
    this.getEventsData({
      pageNumber: this.$route.query.page,
      segment: this.selectedSegment,
      sortOption: this.selectedSortOption,
    });
  },
};
</script>
