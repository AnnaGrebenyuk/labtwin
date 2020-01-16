import {
  createLocalVue,
  shallowMount,
} from '@vue/test-utils';
import Vuex from 'vuex';
import Favorites from '@/views/Favorites.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Favorites View', () => {
  let store;
  let state;
  let wrapper;
  beforeAll(() => {
    state = {
      favoriteEvents: new Array(16),
      page: {
        size: 15,
      },
    };
    store = new Vuex.Store({
      state,
    });
  });

  it('renders correctly', () => {
    wrapper = shallowMount(Favorites, { store, localVue });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders the correct number of pages', () => {
    expect(wrapper.vm.numberOfPages).toEqual(2);
  });
});
