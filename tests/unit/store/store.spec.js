
import {
  mutations, actions,
} from '../../../src/store';

const {
  setGeolocation,
  removeFromFavorites,
  addToFavorites,
} = mutations;

const {
  getEventsData,
  getGeolocation,
} = actions;

describe('mutations', () => {
  let state;
  it('setGeolocation mutation changes latitude and longitude properties correctly', () => {
    state = {};
    const position = {
      coords: {
        latitude: 'lat',
        longitude: 'long',
      },
    };
    setGeolocation(state, position);

    expect(state.latitude).toBe('lat');
    expect(state.longitude).toBe('long');
  });

  it('addToFavorites mutation adds item to favoriteEvents', () => {
    state = {
      favoriteEvents: [],
    };
    addToFavorites(state, { id: 1 });
    expect(state.favoriteEvents[0]).toEqual({
      id: 1,
    });

    expect(state.favoriteEvents.length).toEqual(1);

    addToFavorites(state, { id: 2 });
    expect(state.favoriteEvents[1]).toEqual({
      id: 2,
    });
  });

  it('addToFavorites mutation doesn\'t add item with duplicated id', () => {
    addToFavorites(state, { id: 1 });

    expect(state.favoriteEvents.length).toEqual(2);
  });

  it('removeFromFavorites deletes event from favoriteEvents', () => {
    removeFromFavorites(state, {
      id: 1,
    });

    expect(state.favoriteEvents.length).toEqual(1);
    expect(state.favoriteEvents[0]).toEqual({
      id: 2,
    });
  });
});

describe('actions', () => {
  it('getGeolocation resolves with default position', async () => {
    const commit = jest.fn();
    const defaultPpostion = {
      coords: {
        latitude: '52.520008',
        longitude: '13.404954',
      },
    };

    await getGeolocation({
      commit,
    });
    expect(commit).toHaveBeenCalledWith(
      'setGeolocation', defaultPpostion,
    );
  });

  it('getEventsData sets eventsList and page information', async () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const state = {};

    await getEventsData({
      commit, dispatch, state,
    }, {});
    expect(dispatch).toHaveBeenCalledWith(
      'getGeolocation',
    );
    expect(commit.mock.calls[0][0]).toBe(
      'setEvents',
    );
    expect(commit.mock.calls[1][0]).toBe(
      'setPageInformation',
    );
  });
});
