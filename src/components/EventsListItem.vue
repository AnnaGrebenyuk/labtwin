<template>
  <b-container>
    <b-row align-v="center">
      <b-col sm lg="4">
        <img :src="event.imageUrl" :alt="event.name"/>
      </b-col>
      <b-col sm lg="2">
        <h5 class="lbl-day-month">{{date}}</h5>
        <h6>{{time}}</h6>
      </b-col>
      <b-col sm lg="5">
        <h5>{{ this.event.name }}</h5>
        <p class="lbl-subtitle">{{ subTitle }}</p>
      </b-col>
      <b-col sm lg="1">
        <b-button class="btn-favorite"
                  @click="onClickActionButton"
                  :variant="isFavorite ? 'primary' : 'secondary'">
          <b-icon-star/>
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import {
  BContainer, BRow, BCol, BButton, BIconStar,
} from 'bootstrap-vue';
import moment from 'moment';

export default {
  name: 'EventsListItem',
  components: {
    BContainer, BCol, BRow, BButton, BIconStar,
  },
  props: {
    event: {
      name: String,
      imageUrl: String,
      venues: [
        {
          name: String,
          city: String,
          country: String,
          countryCode: String,
        },
      ],
      startDate: String,
      startTime: String,
    },
    favoritesMode: Boolean,
  },
  methods: {
    ...mapMutations(['addToFavorites', 'removeFromFavorites']),
    onClickActionButton() {
      if (this.isFavorite) {
        this.removeFromFavorites(this.event);
      } else {
        this.addToFavorites(this.event);
      }
    },
  },
  computed: {
    ...mapState(['favoriteEvents']),
    subTitle() {
      return this.event.venues
        .map(venue => `${venue.name || ''}${venue.name ? ' - ' : ''}${venue.city}, ${venue.countryCode}`)
        .join(',');
    },
    isFavorite() {
      return this.favoritesMode ? true
        : this.favoriteEvents.some(favoriteEvent => favoriteEvent.id === this.event.id);
    },
    date() {
      return moment(this.event.startDate).format('MMM DD');
    },
    time() {
      return `${moment(this.event.startDate).format('ddd')} - ${moment(this.event.startTime, 'HH:mm:ss').format('HH:mm')}`;
    },
  },
};
</script>

<style scoped lang="scss">
.lbl-day-month {
  color:rgb(144, 78, 186);
}
</style>
