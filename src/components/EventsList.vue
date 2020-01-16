<template>
  <b-container>
      <b-list-group>
        <b-list-group-item cols="3" v-for="event in events" :key="event.id">
          <events-list-item :event="event" :favoritesMode="favoritesMode"/>
        </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
import { BContainer, BListGroup, BListGroupItem } from 'bootstrap-vue';
import EventsListItem from './EventsListItem.vue';

export default {
  name: 'EventsList',
  components: {
    EventsListItem, BContainer, BListGroup, BListGroupItem,
  },
  props: {
    events: Array,
    favoritesMode: Boolean,
  },
};
</script>
