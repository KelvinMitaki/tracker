import {
  Accuracy,
  LocationObject,
  requestPermissionsAsync,
  watchPositionAsync
} from "expo-location";
import { useEffect, useState } from "react";

type Return = [
  string | { [key: string]: string } | null | null,
  {
    remove(): void;
  } | null,
  () => Promise<void>
];

const useLocation = (
  callback: (location: LocationObject) => void,
  recording: boolean
): Return => {
  const [err, setError] = useState<{ [key: string]: string } | string | null>(
    null
  );
  const [subscriber, setSubscriber] = useState<{
    remove(): void;
  } | null>(null);
  useEffect(() => {
    startWatching();
  }, [recording]);
  const startWatching = async () => {
    try {
      const response = await requestPermissionsAsync();
      if (!response.granted) {
        setError("denined");
      } else {
        err && setError(null);
        const subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          callback
        );
        setSubscriber(subscriber);
      }
    } catch (error) {
      setError(error);
    }
  };
  return [err, subscriber, startWatching];
};

export default useLocation;
