import Location, { LocationObject } from "expo-location";
const tenMetresWithDegrees = 0.0001;

const getLocation = (increment: number): LocationObject => {
  return {
    timestamp: 1612105560234,
    coords: {
      accuracy: 5,
      altitude: 5,
      altitudeAccuracy: 5,
      heading: increment,
      latitude: 37.33233141 + increment * tenMetresWithDegrees,
      longitude: -122.0312186 + increment * tenMetresWithDegrees,
      speed: 10
    }
  };
};

let counter = 0;

setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter)
  });
  counter++;
}, 1000);
