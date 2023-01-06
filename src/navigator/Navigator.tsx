import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../pages/MapScreen';
import PermisionsScreen from '../pages/PermisionsScreen';
import { PermissionContext } from '../context/PermissionsContext';
import LoadingScreen from '../pages/LoadingScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
    const { permissions } = useContext(PermissionContext);
    if (permissions.locationStatus === 'unavailable') {
        return <LoadingScreen />;
    }
    return (
        <Stack.Navigator
            // initialRouteName="PermisionsScreen"
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white',
                },
            }}>
            {permissions.locationStatus === 'granted' ? (
                <Stack.Screen name="MapScreen" component={MapScreen} />
            ) : (
                <Stack.Screen
                    name="PermisionsScreen"
                    component={PermisionsScreen}
                />
            )}
        </Stack.Navigator>
    );
};
