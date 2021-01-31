import * as Location from "expo-location";
const tenMetresWithDegrees = 0.0001;

const getLocation = async (
  increment: number
): Promise<Location.LocationObject> => {
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.BestForNavigation
  });
  const {
    coords: { latitude, longitude }
  } = location;
  return {
    ...location,
    coords: {
      ...location.coords,
      latitude: latitude + increment * tenMetresWithDegrees,
      longitude: longitude + increment * tenMetresWithDegrees
    }
  };
};

let counter = 0;

setInterval(async () => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: await getLocation(counter)
  });
  counter++;
}, 3000);
