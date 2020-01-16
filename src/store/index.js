import Vue from 'vue';
import Vuex from 'vuex';

import api from '../api';
import { getSortValue } from '../utils/converters';
import getCurrentPosition from '../utils/helpers';

Vue.use(Vuex);

export const mutations = {
  setEvents(state, eventsList) {
    state.events = eventsList;
  },
  setPageInformation(state, page) {
    state.page = page;
  },
  setSortOption(state, sortOption) {
    state.sortOption = sortOption;
  },
  setSegment(state, segment) {
    state.segment = segment;
  },
  setGeolocation(state, position) {
    state.latitude = position.coords.latitude;
    state.longitude = position.coords.longitude;
  },
  addToFavorites(state, event) {
    if (!state.favoriteEvents.some(favoriteEvent => favoriteEvent.id === event.id)) {
      state.favoriteEvents = [...state.favoriteEvents, event];
    }
  },
  removeFromFavorites(state, event) {
    state.favoriteEvents = state.favoriteEvents.filter(favoriteEvent => (
      favoriteEvent.id !== event.id
    ));
  },
};

export const actions = {
  async getEventsData({
    commit,
    state,
    dispatch,
  }, {
    pageNumber = 0,
  }) {
    if (!(state.latitude && state.longitude)) {
      await dispatch('getGeolocation');
    }
    const eventsData = await api.getEvents({
      pageNumber,
      segment: state.segment,
      sortOption: getSortValue(state.sortOption),
      latitude: state.latitude,
      longitude: state.longitude,
    });
    commit('setEvents', eventsData.events);
    commit('setPageInformation', eventsData.page);
  },
  async getGeolocation({
    commit,
  }) {
    commit('setGeolocation', await getCurrentPosition());
  },
};

export default new Vuex.Store({
  state: {
    events: [],
    favoriteEvents: [],
    page: {},
    latitude: '',
    longitude: '',
    sortOption: 'Most Popular',
    segment: 'All',
  },
  mutations,
  actions,
});
