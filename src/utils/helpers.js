import CONSTANTS from './constants';

export default function getCurrentPosition() {
  if (navigator.geolocation) {
    return new Promise(
      resolve => navigator.geolocation.getCurrentPosition(resolve,
        resolve(CONSTANTS.defaultCoordinates)),
    );
  }
  return new Promise(resolve => resolve(CONSTANTS.defaultCoordinates));
}
