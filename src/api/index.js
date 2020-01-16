import axios from 'axios';
import moment from 'moment';
import convertDataToEvent from '../utils/converters';
import CONSTANTS from '../utils/constants';

const API = axios.create({
  baseURL: 'https://app.ticketmaster.com/discovery/v2',
});
const API_KEY = 'U7hn0DPVcUMuCXQ5rhEHvJtnLX6my5PV';
const SUPPORTED_SEGMENTS = ['Music', 'Sports', 'Arts & Theatre'];
const SUPPORTED_SORT_OPTIONS = ['name,asc', 'name,desc', 'date,asc', 'date,desc', 'relevance,asc',
  'relevance,desc', 'distance,asc', 'name,date,asc', 'name,date,desc', 'date,name,asc',
  'date,name,desc', 'distance,date,asc', 'onSaleStartDate,asc', 'id,asc', 'venueName,asc',
  'venueName,desc', 'random'];

export default {
  getEvents({
    pageNumber,
    segment,
    sortOption,
    latitude = CONSTANTS.defaultCoordinates.coords.latitude,
    longitude = CONSTANTS.defaultCoordinates.coords.longitude,
  }) {
    const params = {
      apikey: API_KEY,
      page: pageNumber,
      size: 15,
      latlong: `${latitude},${longitude}`,
      startDateTime: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
    };
    if (SUPPORTED_SEGMENTS.indexOf(segment) > -1) {
      params.segmentName = segment;
    }
    const sortQuery = (SUPPORTED_SORT_OPTIONS.indexOf(sortOption) > -1)
      ? `?sort=${encodeURIComponent(sortOption)}` : '';


    return API.get(`/events.json${sortQuery}`, { params })
      .then(response => ({
        // eslint-disable-next-line no-underscore-dangle
        events: response.data._embedded.events.map(event => convertDataToEvent(event)),
        page: response.data.page,
      }));
  },
};
