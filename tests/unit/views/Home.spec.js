import {
  createLocalVue,
  mount,
} from '@vue/test-utils';
import Vuex from 'vuex';
import Home from '@/views/Home.vue';

const localVue = createLocalVue();
localVue.use(Vuex);


describe('Home Page', () => {
  let store;
  let state;
  let wrapper;

  const getEventsData = jest.fn();
  const setSortOption = jest.fn();
  const setSegment = jest.fn();

  const $route = {
    query: {
      page: 1,
    },
  };
  beforeAll(() => {
    state = {
      page: {
      },
    };

    store = new Vuex.Store({
      state,
      actions: {
        getEventsData,
      },
      mutations: {
        setSortOption,
        setSegment,
      },
    });
  });

  it('renders correctly', () => {
    wrapper = mount(Home, {
      store,
      localVue,
      mocks: {
        $route,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('calls getEventsData on Sort option change', () => {
    wrapper.find('.select-sort').trigger('change', 'Distance');
    expect(getEventsData).toBeCalledTimes(1);
  });

  it('calls getEventsData on Segment selection', () => {
    wrapper.find('.btn-segment:nth-child(1)').trigger('click');
    expect(getEventsData).toBeCalledTimes(2);
  });

  it('calls getEventsData on route change', () => {
    $route.query.page = 2;
    expect(getEventsData).toBeCalledTimes(3);
  });

  it('generates correct links for different page numbers', () => {
    expect(wrapper.vm.getPageLink(1)).toEqual('?');
    expect(wrapper.vm.getPageLink(2)).toEqual('?page=2');
  });
});
