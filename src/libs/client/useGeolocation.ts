import { useEffect, useState } from "react";

interface IPosition {
  latitude: number | null;
  longitude: number | null;
  isLoading: boolean;
  error: any | undefined;
}

export default function useGeolocation() {
  const [position, setPosition] = useState<IPosition>({
    latitude: null,
    longitude: null,
    isLoading: true,
    error: undefined,
  });
  useEffect(() => {
    if ("geolocation" in navigator) {
      setPosition((data) => ({ ...data, isLoading: true }));

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            isLoading: false,
            error: undefined,
          });
        },
        (positionError) =>
          setPosition((data) => ({
            ...data,
            latitude: null,
            longitude: null,
            isLoading: false,
            error: positionError,
          })),
        { enableHighAccuracy: true, timeout: 27000 },
      );
    }
  }, []);

  return {
    latitude: position.latitude,
    longitude: position.longitude,
    isLoading: position.isLoading,
    error: position.error,
  };
}
