import React, { useState, useEffect } from 'react';

import { createContext } from 'react';
import {
    PermissionStatus,
    PERMISSIONS,
    request,
    check,
    openSettings,
} from 'react-native-permissions';
import { AppState, Platform } from 'react-native';

export interface PermissionsState {
    locationStatus: PermissionStatus;
}

export const permissionInitialState: PermissionsState = {
    locationStatus: 'unavailable',
};

type PermisionsContextProps = {
    permissions: PermissionsState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
};

export const PermissionContext = createContext({
    // Definir lo que voy a exportar
} as PermisionsContextProps);

export const PermissionProvider = ({ children }: any) => {
    const [permissions, setPermissions] = useState(permissionInitialState);

    useEffect(() => {
        AppState.addEventListener('change', state => {
            if (state !== 'active') return;
            checkLocationPermission();
        });
    }, []);

    const askLocationPermission = async () => {
        let permissionStatus: PermissionStatus;

        if (Platform.OS === 'ios') {
            permissionStatus = await request(
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            );
        } else {
            permissionStatus = await request(
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            );
        }

        if (permissionStatus === 'blocked') {
            openSettings();
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus,
        });
    };
    const checkLocationPermission = async () => {
        let permissionStatus: PermissionStatus;

        if (Platform.OS === 'ios') {
            permissionStatus = await check(
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            );
        } else {
            permissionStatus = await check(
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            );
        }
        setPermissions({
            ...permissions,
            locationStatus: permissionStatus,
        });
    };

    return (
        <PermissionContext.Provider
            value={{
                permissions,
                askLocationPermission,
                checkLocationPermission,
            }}>
            {children}
        </PermissionContext.Provider>
    );
};
