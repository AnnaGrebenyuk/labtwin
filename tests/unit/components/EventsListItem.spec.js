import {
  mount,
  createLocalVue,
} from '@vue/test-utils';
import Vuex from 'vuex';
import EventsListItem from '@/components/EventsListItem.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('EventsListItem.vue', () => {
  let mutations;
  let store;
  let state;
  let wrapper;
  const removeFromFavorites = jest.fn();
  const addToFavorites = jest.fn();

  beforeAll(() => {
    state = {
      favoriteEvents: [],
    };
    mutations = {
      removeFromFavorites,
      addToFavorites,
    };
    store = new Vuex.Store({
      state,
      mutations,
    });
  });

  it('renders props.event.name when passed', () => {
    const msg = 'event name';
    wrapper = mount(EventsListItem, {
      propsData: {
        event: {
          name: msg,
          venues: [],
          imageUrl: '',
        },
        favoritesMode: true,
      },
      store,
      localVue,
    });
    expect(wrapper.text()).toMatch(msg);
    expect(wrapper.find('.btn-favorite').classes()).toContain('btn-primary');
    expect(wrapper.vm.isFavorite).toBe(true);
    expect(wrapper.find('.lbl - subtitle').text()).toBe('');
  });

  it('should call removeFromFavorites on Favorite button click in Favorites mode', async () => {
    wrapper.find('.btn-favorite').trigger('click');
    expect(removeFromFavorites).toBeCalledTimes(1);
    expect(addToFavorites).toBeCalledTimes(0);
  });

  it('should render correctly not in Favorite mode', () => {
    wrapper = mount(EventsListItem, {
      propsData: {
        event: {
          id: 'id',
          name: '',
          venues: [],
          imageUrl: '',
        },
        favoritesMode: false,
      },
      store,
      localVue,
    });

    expect(wrapper.find('.btn-favorite').classes()).toContain('btn-secondary');
    expect(wrapper.vm.isFavorite).toBe(false);
  });

  it('should call addToFavorites on Favorites button click not in Favorite mode', async () => {
    wrapper.find('.btn-favorite').trigger('click');
    expect(removeFromFavorites).toBeCalledTimes(1);
    expect(addToFavorites).toBeCalledTimes(1);
  });

  it('should be rendered correctly not in Favorite mode when favoriteEvents contain the event',
    () => {
      store = new Vuex.Store({
        state: {
          favoriteEvents: [{
            id: 'id',
          }],
        },
        mutations,
      });
      wrapper = mount(EventsListItem, {
        propsData: {
          event: {
            id: 'id',
            name: '',
            venues: [{
              name: 'venueName',
              city: 'city',
              countryCode: 'countryCode',
            }],
            imageUrl: '',
          },
          favoritesMode: false,
        },
        store,
        localVue,
      });

      expect(wrapper.find('.btn-favorite').classes()).toContain('btn-primary');
      expect(wrapper.find('.lbl - subtitle').text()).toBe('venueName - city, countryCode');
      expect(wrapper.vm.isFavorite).toBe(true);
    });
});
