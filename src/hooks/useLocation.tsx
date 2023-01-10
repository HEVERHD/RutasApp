import React, { useEffect, useState, useRef } from 'react';

import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export default function useLocation() {
    const [hasLocation, setHasLocation] = useState(false);
    const [initialPosition, setInitialPosition] = useState<Location>();
    const [userLocation, setUserLocation] = useState<Location>();
    const [rutasLineas, setRutasLineas] = useState<Location[]>([]);

    const watchId = useRef<Number>();

    useEffect(() => {
        getCurrentLocation().then(location => {
            setInitialPosition(location); //Para la posicion Initial
            setUserLocation(location); //Para la posicion Initial
            setRutasLineas([...rutasLineas, location]);
            setHasLocation(true);
        });
    }, []);

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({ coords }) => {
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                    });
                },
                err => reject({ err }),
                { enableHighAccuracy: true },
            );
        });
    };

    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({ coords }) => {
                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                };
                setUserLocation(location);

                setRutasLineas([...rutasLineas, location]);
            },
            err => console.log({ err }),
            { enableHighAccuracy: true, distanceFilter: 10 },
        );
    };

    const stopFollowLocation = () => {
        if (watchId.current) Geolocation.clearWatch(watchId.current);
    };
    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowLocation,
        rutasLineas,
    };
}
