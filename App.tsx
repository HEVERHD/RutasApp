import 'react-native-gesture-handler';
import { enableLatestRenderer } from 'react-native-maps';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { PermissionProvider } from './src/context/PermissionsContext';
// import Icon from 'react-native-vector-icons/Ionicons';

enableLatestRenderer();
const AppState = ({ children }: any) => {
    return <PermissionProvider>{children}</PermissionProvider>;
};

export default function App() {
    return (
        <NavigationContainer>
            <AppState>
                <Navigator />
            </AppState>
        </NavigationContainer>
    );
}
