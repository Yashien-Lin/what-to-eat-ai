export const getUserLocation = (): Promise<{ lat: number; lng: number }> => {
  if (!navigator.geolocation) {
    throw new Error("Geolocation not supported");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        resolve({ lat, lng });
      },
      (error) => {
        switch (error.code) {
          case 1:
            reject(new Error("PERMISSION_DENIED"));
            break;
          case 2:
            reject(new Error("POSITION_UNAVAILABLE"));
            break;
          case 3:
            reject(new Error("TIMEOUT"));
            break;
          default:
            reject(new Error("UNKNOWN_ERROR"));
        }
      },
    );
  });
};
