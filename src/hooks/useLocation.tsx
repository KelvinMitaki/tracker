import {
  Accuracy,
  LocationObject,
  requestPermissionsAsync,
  watchPositionAsync
} from "expo-location";
import React, { useEffect, useState } from "react";

interface Props {
  addLocation: (location: LocationObject) => void;
}

const useLocation = ({
  addLocation
}: Props): (string | { [key: string]: string } | null)[] => {
  const [err, setError] = useState<{ [key: string]: string } | string | null>(
    null
  );
  useEffect(() => {
    startWatching();
  }, []);
  const startWatching = async () => {
    try {
      const response = await requestPermissionsAsync();
      if (!response.granted) {
        setError("denined");
      } else {
        err && setError(null);
        await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          location => {
            addLocation(location);
          }
        );
      }
    } catch (error) {
      setError(error);
    }
  };
  return [err];
};

export default useLocation;
