import { StyleSheet } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import Marker, { Polyline } from 'react-native-maps';
import useLocation from '../hooks/useLocation';
import LoadingScreen from '../pages/LoadingScreen';
import Fab from './Fab';

interface Props {
    markers?: Marker[];
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,

        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default function Maps({ markers }: Props) {
    const [mostrarLinea, setMostrarLinea] = useState(true);

    const siguiendo = useRef<boolean>(true);

    const {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowLocation,
        rutasLineas,
    } = useLocation();
    const mapViewRef = useRef<MapView>();

    useEffect(() => {
        followUserLocation();
        return () => {
            // cancelar el seguimiento
            stopFollowLocation();
        };
    }, []);

    useEffect(() => {
        if (!siguiendo.current) return;
        const location = userLocation;
        mapViewRef.current?.animateCamera({
            center: location,
        });
    }, [userLocation]);

    const centerPosition = async () => {
        const location = await getCurrentLocation();
        mapViewRef.current?.animateCamera({
            center: location,
        });

        siguiendo.current = true;
    };

    if (!hasLocation) {
        return <LoadingScreen />;
    }

    return (
        <>
            <MapView
                ref={el => (mapViewRef.current = el!)}
                // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                showsUserLocation
                region={{
                    latitude: initialPosition!.latitude,
                    longitude: initialPosition!.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                onTouchStart={() => (siguiendo.current = false)}>
                {mostrarLinea && (
                    <Polyline
                        coordinates={rutasLineas}
                        strokeColor="black"
                        strokeWidth={3}
                    />
                )}
                {/* <Marker
                        image={require('../assets/custom-marker.png')}
                        coordinate={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                        }}
                        title="esto es un titulo"
                        description="
                        esto es una descriptions jajaja"
                    /> */}
            </MapView>
            <Fab
                iconName="compass-outline"
                onPress={centerPosition}
                style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                }}
            />
            <Fab
                iconName="eye-outline"
                onPress={() => setMostrarLinea(!mostrarLinea)}
                style={{
                    position: 'absolute',
                    bottom: 70,
                    right: 10,
                }}
            />
        </>
    );
}
