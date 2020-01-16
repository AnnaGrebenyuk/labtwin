import {
  shallowMount,
  createLocalVue,
} from '@vue/test-utils';
import Vuex from 'vuex';
import EventsList from '@/components/EventsList.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('EventsList', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(EventsList);
    expect(wrapper.element).toMatchSnapshot();
  });
});
