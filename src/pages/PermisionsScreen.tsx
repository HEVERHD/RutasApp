import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { PermissionContext } from '../context/PermissionsContext';
import BottonBlack from '../components/BottonBlack';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PermisionsScreen() {
    const { permissions, askLocationPermission } =
        useContext(PermissionContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Es necesario el uso del GPS</Text>
            <Text style={styles.subTitle}>Para el uso de esta app.</Text>

            <BottonBlack onPress={askLocationPermission} title="Permiso" />
            {/* <Text>{JSON.stringify(permissions, null, 5)}</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        width: 400,
        textAlign: 'center',
    },
    subTitle: {
        justifyContent: 'center',

        marginBottom: 10,
        fontSize: 15,
    },
});
