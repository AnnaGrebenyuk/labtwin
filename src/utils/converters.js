/* eslint-disable no-underscore-dangle */
const SORT_OPTION_MAPPING = {
  Date: 'date,asc',
  'Most Popular': 'relevance,desc',
  Distance: 'distance,asc',
  'Name: A - Z': 'name,asc',
  'Name: Z - A': 'name,desc',
};

export default function convertDataToEvent(data) {
  return {
    id: data.id,
    name: data.name,
    imageUrl: data.images.find(image => image.height === 115 && image.width === 205)?.url,
    startDate: data.dates.start.localDate,
    startTime: data.dates.start.localTime,
    venues: data._embedded?.venues?.map(venue => ({
      name: venue.name,
      city: venue.city.name,
      country: venue.country.name,
      countryCode: venue.country.countryCode,
    })),
  };
}

export function getSortValue(sortOption) {
  return sortOption ? SORT_OPTION_MAPPING[sortOption] : '';
}
